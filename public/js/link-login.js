define("oauth/sina", ["base", "tools"], function($, T) {
    function OAuthSina(options) {
        this.init(options)
    }
    OAuthSina.prototype = {
        data: {
            type: 3
        },
        init: function(options) {
            var _this = this,
                opts = options || {};
            _this.btnId = opts.btnId || "";
            if (window.WB2 && opts.btnId) {
                _this.$cont = $("#" + _this.btnId);
                _this.$cont.html(_this.$cont.data("value") || "");
                if (WB2.checkLogin()) {
                    _this.$cont.on("click", function(e) {
                        _this.trigger("success", _this.data)
                    });
                    _this.checkLogin(T.getRequest("?" + (T.cookie("weibojs_2422438855") || "")))
                } else _this.bindLogin()
            }
        },
        checkLogin: function(opts) {
            var _this = this;
            opts && opts.uid ? WB2.anyWhere(function(W) {
                W.parseCMD("/users/show.json", function(o, bStatus) {
                    try {
                        _this.data.openid = String(o.id);
                        _this.data.nickname = null == o.screen_name ? "" : o.screen_name;
                        _this.data.portrait = null == o.profile_image_url ? "" : o.profile_image_url
                    } catch (e) {
                        _this.bindLogin()
                    }
                    _this.$cont.html(_this.$cont.data("value") || "")
                }, {
                    uid: opts.uid
                }, {
                    method: "get"
                })
            }) : _this.bindLogin()
        },
        bindLogin: function() {
            var _this = this;
            WB2.anyWhere(function(W) {
                W.widget.connectButton({
                    id: _this.btnId,
                    type: "3,2",
                    callback: {
                        login: function(o) {
                            _this.data.openid = String(o.id);
                            _this.data.nickname = null == o.screen_name ? "" : o.screen_name;
                            _this.data.portrait = null == o.profile_image_url ? "" : o.profile_image_url;
                            _this.$cont.html(_this.$cont.data("value") || "");
                            _this.trigger("success", _this.data)
                        },
                        logout: function() {
                            T.cookie("sid", "", {
                                expires: -1,
                                path: "/",
                                domain: T.DOMAIN.DOMAIN
                            });
                            window.reload()
                        }
                    }
                })
            })
        }
    };
    T.Mediator.installTo(OAuthSina.prototype);
    return function(options) {
        return new OAuthSina(options)
    }
});
define("oauth/login", ["base", "tools"], function($, T) {
    function OAuthLogin(options) {}
    OAuthLogin.prototype = {
        params: T.getRequest(),
        typeMap: {
            1: "QQ",
            2: "微信",
            3: "新浪微博",
            4: "人人网",
            5: "豆瓣"
        },
        init: function(options, callback) {
            var _this = this;
            T._LOGED && 0 == _this.params.redirect_uri.indexOf(T.DOMAIN.MEMBER + "union.html") ? _this.bind(options, callback) : _this.login(options, callback)
        },
        login: function(opts, callback) {
            var _this = this;
            T.POST({
                action: "in_user/link_login",
                params: {
                    link_type: opts.type,
                    link_key: opts.openid
                },
                success: function(data, params) {
                    T.SetCookie(data, params);
                    T.getRequest();
                    location.replace(opts.redirect_uri || _this.params.redirect_uri || T.DOMAIN.WWW);
                    _this.trigger("success", _this.data);
                    callback && callback(_this.data)
                },
                failure: function(data, params) {
                    if (2 == data.result) T.alt("被授权登录账户已冻结", function(_o) {
                        location.replace(T.DOMAIN.WWW)
                    }, function(_o) {
                        location.replace(T.DOMAIN.WWW)
                    });
                    else {
                        var param = {
                            type: T.Base64.encode(encodeURIComponent(opts.type || "")),
                            openid: T.Base64.encode(encodeURIComponent(opts.openid || "")),
                            nickname: T.Base64.encode(encodeURIComponent(opts.nickname || "")),
                            portrait: T.Base64.encode(encodeURIComponent(opts.portrait || "")),
                            redirect_uri: opts.redirect_uri || _this.params.redirect_uri || ""
                        };
                        param.token = T.MD5(param.type + param.openid + param.nickname + param.portrait);
                        location.replace(T.DOMAIN.PASSPORT + "openuser.html?" + T.Transfer.encodeHashString(param))
                    }
                }
            })
        },
        bind: function(opts, callback) {
            this.check(opts, callback)
        },
        check: function(opts, callback) {
            var _this = this;
            T.POST({
                action: "in_user/link_check",
                params: {
                    link_type: opts.type,
                    link_key: opts.openid
                },
                success: function(data, params) {
                    _this.insert(opts, callback)
                },
                failure: function(data, params) {
                    var popup = new T.Popup({
                        fixed: !0,
                        title: "温馨提示",
                        width: 480,
                        content: '<dl class="popbox vertical_middle warning"><dt class="vm_left "></dt><dd class="vm_right">您的' + _this.typeMap[opts.type] + "已绑定其他云印账号，继续操作，将解绑原有的云印账号，并绑定该云印账号！</dd></dl>",
                        ok: "继续绑定",
                        no: "暂不绑定"
                    });
                    popup.on("ok", function() {
                        _this.insert(opts, callback)
                    });
                    popup.on("no", function() {
                        _this.trigger("failure", data);
                        callback && callback(_this.data)
                    })
                }
            })
        },
        insert: function(opts, callback) {
            var _this = this;
            T.POST({
                action: "in_user/link_insert",
                params: {
                    login_flag: "1",
                    link_type: opts.type,
                    link_key: opts.openid
                },
                success: function(data, params) {
                    _this.trigger("success", data);
                    callback && callback(_this.data)
                }
            })
        }
    };
    T.Mediator.installTo(OAuthLogin.prototype);
    return function(options) {
        return new OAuthLogin(options)
    }
});
require(["base", "tools", "oauth/sina", "oauth/login"], function($, T, OAuthSina, OAuthLogin) {
    var oauthLogin, UnionLogin = {
        init: function() {
            oauthLogin = OAuthLogin();
            var oauthSina = OAuthSina({
                btnId: "sina_login_btn"
            });
            oauthSina.on("success", function(data) {
                data && data.openid && oauthLogin.login(data)
            })
        }
    };
    T.Loader(function() {
        UnionLogin.init()
    })
});
define("link-login", function() {});