define("oauth/qrcode", ["base", "tools"], function($, T) {
    function OAuthQRCode(options) {
        this.init()
    }
    OAuthQRCode.prototype = {
        expire: 3e5,
        startTime: 0,
        params: T.getRequest(),
        $quick: $(".qrcode-login-btn"),
        init: function(options) {
            var _this = this;
            _this.events()
        },
        qrCode: function($cont) {
            var _this = this,
                $qrcode = $(".qr-code", $cont);
            $qrcode.html("");
            T.GET({
                action: "in_user/create_qr_code",
                success: function(data, params) {
                    if (data.code) {
                        $qrcode.qrcode({
                            width: 150,
                            height: 150,
                            background: "#fff",
                            foreground: "#000",
                            render: T.IS.CVS ? "canvas" : "table",
                            text: "http://m.ininin.com/app/download.html#" + data.code
                        });
                        $(".qr-msg", $cont).show();
                        $(".qr-err", $cont).hide();
                        _this.startTime = (new Date).getTime();
                        _this.timing($cont, data.code)
                    }
                }
            })
        },
        checkLogin: function($cont, code) {
            var _this = this;
            T.POST({
                action: "in_user/scan_code_login",
                params: {
                    code: code
                },
                success: function(data, params) {
                    T.SetCookie(data, params);
                    _this.timeObj && clearTimeout(_this.timeObj);
                    setTimeout(function() {
                        location.replace(_this.params.backurl || T.DOMAIN.WWW)
                    }, 100)
                },
                failure: function(data, params) {
                    if (0 === Number(data.scanFlag)) {
                        $cont.hide();
                        $cont.siblings(".qrcode-suc").show()
                    }
                }
            })
        },
        timing: function($cont, code) {
            var _this = this;
            if ((new Date).getTime() - _this.startTime > _this.expire) {
                $(".qr-msg", $cont).hide();
                $(".qr-err", $cont).show();
                _this.timeObj && clearTimeout(_this.timeObj)
            } else {
                _this.checkLogin($cont, code);
                _this.timeObj = setTimeout(function() {
                    _this.timing($cont, code)
                }, 3e3)
            }
        },
        events: function() {
            var _this = this;
            _this.$quick.toggle(function(e) {
                var $this = $(this).addClass("off"),
                    $cont = $this.siblings(".qrcode-login").show();
                _this.qrCode($cont);
                return !1
            }, function(e) {
                var $this = $(this).removeClass("off");
                $this.siblings(".qrcode-login").hide();
                _this.timeObj && clearTimeout(_this.timeObj);
                return !1
            });
            $(".qr-refresh").on("click", function(e) {
                _this.qrCode($(this).closest(".qrcode-login"));
                return !1
            })
        }
    };
    T.Mediator.installTo(OAuthQRCode.prototype);
    return function(options) {
        return new OAuthQRCode(options)
    }
});
require(["base", "tools", "oauth/qrcode", "location"], function($, T, OAuthQRCode, PCD) {
    T.Loader(function() {
        window.T = T || {};
        OAuthQRCode();
        var $ulinks = $("#ulinks"),
            $olinks = $("#olinks"),
            $ulink = $ulinks.closest("li"),
            $olink = $olinks.closest("li");
        $ulinks.length && $ulinks.css("right", 1220 - ($ulink.position().left + $ulink.outerWidth()));
        $olinks.length && $olinks.css("left", $olink.position().left + 10);
        T.initAddress = function() {
            if ($("#delivery_region").geoLocation) {
                T.Template("delivery_region", {
                    _address: T.cookie("_address") || CFG_DB.DEF_PCD
                });
                var isFirst = T.cookie("_address");
                $("#delivery_region").geoLocation({
                    eventType: "mouseover",
                    callback: function(value, province, city, district) {
                        $("#delivery_address").geoLocation("setValue", value)
                    }
                });
                isFirst || T.POST({
                    action: "in_common/ip_info/default_address_query",
                    params: {},
                    success: function(data) {
                        if (data && data.useraddress) {
                            data.useraddress = T.JSON.parse(data.useraddress) || {};
                            data.useraddress.region && data.useraddress.city && $("#delivery_region").geoLocation("setValue", data.useraddress.region + "^" + data.useraddress.city + "^")
                        }
                    }
                })
            }
        };
        T.initAddress();
        T.SetSearchKeywords = function() {
            function pushCZC(keyword) {
                var localhref = location.href.replace(location.search, "").replace(location.hash, "");
                _czc.push(["_trackEvent", localhref, "搜索", keyword])
            }
            var $searchbar = $("#head_searchbar"),
                $keywordInput = $("input[name=keyword]", $searchbar);
            if ($searchbar && $searchbar.length) {
                T.GET({
                    action: "in_product_new/search/find_key_word",
                    success: function(data) {
                        if (data.restultList && data.restultList.length) {
                            var str = "";
                            T.Each(data.restultList, function(index, v) {
                                0 == index && T.FORM().placeholder($keywordInput[0], v.srKeyWord);
                                15 > index && (str += '<a data-url="' + T.DOMAIN.WWW + "search.html#keyword=" + v.srKeyWord + '&type=2" href="javascript:;">' + v.srKeyWord + "</a>")
                            });
                            $searchbar.find(".commend-keys").html(str)
                        }
                    },
                    failure: function(data, params) {},
                    error: function(data, params) {}
                }, function(data) {}, function(data) {});
                var keywords = [],
                    value = "";
                $searchbar.on("click", ".submit", function() {
                    var keyword = $.trim($keywordInput.val()),
                        flag = !1;
                    T.Each(keywords, function(index, v) {
                        if (v.keyword.toUpperCase() == keyword.toUpperCase()) {
                            var a = $("#shelper a")[index];
                            $(a).trigger("click");
                            flag = !0
                        }
                    });
                    if (!flag)
                        if (keyword) {
                            pushCZC(keyword);
                            window.location = T.DOMAIN.WWW + "search.html#keyword=" + keyword + "&type=1";
                            $(document).trigger("dosearch")
                        } else {
                            var a = $(".commend-keys a", $searchbar)[0];
                            if (a) {
                                pushCZC($(a).text());
                                window.location = a.href;
                                $(a).click()
                            }
                        }
                }).on("keyup", "input[name=keyword]", function(e) {
                    var keycode = e.keyCode || e.which;
                    if (13 == keycode) $(".submit", $searchbar).trigger("click");
                    else if (38 == keycode || 40 == keycode) {
                        var l = $("#shelper a").length;
                        if (1 == l) {
                            $("#shelper a").addClass("sel");
                            $keywordInput.val($("#shelper a")[0].innerText)
                        } else if (l > 1) {
                            var $a = $("#shelper a.sel");
                            if ($a.length) {
                                $a.removeClass("sel");
                                if (40 == keycode) {
                                    var $aNext = $a.closest("li").next("li").find("a"),
                                        $a1 = $aNext.length ? $aNext : $("#shelper a").first();
                                    $a1.addClass("sel");
                                    $keywordInput.val($a1[0].innerText)
                                }
                                if (38 == keycode) {
                                    var $aPrev = $a.closest("li").prev("li").find("a"),
                                        $a2 = $aPrev.length ? $aPrev : $("#shelper a").last();
                                    $a2.addClass("sel");
                                    $keywordInput.val($a2[0].innerText)
                                }
                            } else {
                                if (40 == keycode) {
                                    $("#shelper a").first().addClass("sel");
                                    $keywordInput.val($("#shelper a").first()[0].innerText)
                                }
                                if (38 == keycode) {
                                    $("#shelper a").last().addClass("sel");
                                    $keywordInput.val($("#shelper a").last()[0].innerText)
                                }
                            }
                        }
                    } else {
                        var keyVal = $.trim($keywordInput.val());
                        if (keyVal) keyVal.toUpperCase() != value.toUpperCase() && T.GET({
                            action: "in_search/product/smart_search",
                            params: {
                                keyword: keyVal
                            },
                            success: function(data) {
                                value = keyVal;
                                var str = "",
                                    url = "";
                                keywords = data.data || [];
                                T.Each(data.data, function(index, v) {
                                    url = v.productId ? T.DOMAIN.WWW + "product/" + v.productId + ".html" : T.DOMAIN.WWW + "search.html#keyword=" + v.keyword + "&type=3";
                                    str += '<li><a data-url="' + url + '" href="javascript:;">' + v.keyword + "</a></li>"
                                });
                                str ? $("#shelper").html(str).show() : $("#shelper").html(str).hide()
                            }
                        });
                        else {
                            keywords = [];
                            value = "";
                            $("#shelper").html("");
                            $("#shelper").hide()
                        }
                    }
                });
                $("body").on("click", function() {
                    $("#shelper").hide()
                });
                $("#shelper").on("click", "li>a", function(e) {
                    var $this = $(this);
                    pushCZC($this.text());
                    window.location = $this.data("url");
                    $(document).trigger("dosearch")
                });
                $(".commend-keys", $searchbar).on("click", "a", function() {
                    var $this = $(this);
                    pushCZC($this.text());
                    window.location = $this.data("url");
                    $(document).trigger("dosearch")
                })
            }
        };
        T.SetSearchKeywords();
        T.SetNumber = function(id, num, bool) {
            var dom = T.DOM.byId(id);
            num = parseInt(num, 10) || 0;
            if (dom && "number" == typeof num)
                if (num > 0)
                    if (/^car_/.test(id)) dom.innerHTML = "购物车（" + num + "）";
                    else {
                        dom.style.display = "inline-block";
                        bool || (dom.innerHTML = num)
                    }
            else /^car_/.test(id) ? dom.innerHTML = "购物车" : dom.style.display = "none"
        };
        T.SetMessageStatus = function() {
            T.GET({
                action: CFG_DS.message.get,
                params: {
                    offmsg: 1,
                    detail: 0
                },
                success: function(data) {
                    T.SetNumber("sysmsg_number", data.count, !0);
                    T.SetNumber("message_count_number", data.count > 99 ? data.count + "+" : data.count);
                    $ulinks.css("right", 1220 - ($ulink.position().left + $ulink.outerWidth()));
                    $olinks.css("left", $olink.position().left + 10)
                },
                failure: function(data, params) {},
                error: function(data, params) {}
            }, function(data) {}, function(data) {})
        };
        T.SetOrderStatus = function() {
            T.GET({
                action: COM_API.order_mun,
                success: function(data) {
                    var _status = {
                            common_count: data.common.pay + data.common.notpay,
                            design_count: data.design.pay + data.design.notpay,
                            plan_count: data.plan.pay + data.plan.notpay,
                            dist_count: data.dist.notpay
                        },
                        toUrl = "";
                    data.common.notpay > 0 ? toUrl = T.DOMAIN.ORDER + "index.html" : data.design.notpay > 0 ? toUrl = T.DOMAIN.ORDER + "design.html" : data.plan.notpay > 0 ? toUrl = T.DOMAIN.ORDER + "package.html" : data.dist.notpay > 0 && (toUrl = T.DOMAIN.ORDER + "distribute.html");
                    if (1 != T.cookie("ORDER_NOTPAY") && toUrl) {
                        T.cookie("ORDER_NOTPAY", "1");
                        T.cfm('<span class="red order_notpay">亲，您有订单未支付，是否现在去处理？</span>', function(_o) {
                            window.location = toUrl;
                            _o.remove()
                        }, function(_o) {
                            _o.remove()
                        }, "温馨提示", "立即处理", "暂不处理")
                    }
                    T.BindData("data", _status)
                },
                failure: function(data, params) {},
                error: function(data, params) {}
            }, function(data) {}, function(data) {});
            T.GET({
                action: "in_product/query_not_read_quotation",
                success: function(data) {
                    T.BindData("data", {
                        new_count: data.num || 0
                    })
                },
                failure: function(data, params) {},
                error: function(data, params) {}
            }, function(data) {}, function(data) {})
        };
        var Cart = T.Module({
            data: {
                cartList: []
            },
            events: {
                "click a.del": "remove"
            },
            $cont: $("#template_cart_snap_view"),
            reload: function(params, isFirst) {
                var _this = this;
                if (!isFirst || !$("#template_cart_list_view").length)
                    if (T.CartReload) T.CartReload();
                    else if (T._LOGED) {
                    params = params || {
                        type: "0"
                    };
                    params.to_index = 3;
                    params.address = (T.cookie("_address") || CFG_DB.DEF_PCD).replace(/\^+$/g, "");
                    T.GET({
                        action: CFG_DS.mycart.get,
                        params: params,
                        success: function(data, params) {
                            _this.data.cartList = data.cartList || [];
                            _this.data.cartNum = data.cartNum || 0;
                            _this.data.totalProductPrice = T.RMB(data.totalProductPrice);
                            _this.render()
                        },
                        failure: function(data, params) {},
                        error: function(data, params) {}
                    }, function(data) {}, function(data) {})
                } else _this.render()
            },
            render: function(data) {
                T.Template("cart_snap", data);
                T.Template("cart_list", data);
                T.BindData("data", data);
                T.SetNumber("car_number", data.cartNum || 0)
            },
            remove: function($this, e) {
                var _this = this,
                    $item = $this.closest("li"),
                    cid = $item.data("cart_id");
                cid && T.POST({
                    action: CFG_DS.mycart.del,
                    params: {
                        cart_ids: cid
                    },
                    success: function(data) {
                        T.msg("删除成功");
                        _this.reload()
                    },
                    failure: function(data, params) {},
                    error: function(data, params) {}
                })
            }
        });
        T.Cart = new Cart;
        T.SetStatus = function() {
            T.Cart.reload(null, !0);
            T.SetMessageStatus();
            T.SetOrderStatus()
        };
        var $nav_category = $("#nav_category");
        $nav_category && $nav_category.length && T.GET({
            action: CFG_DS.product.get_category_multi,
            params: {
                position: "home",
                category_ids: CFG_DB.PCFG.VNAV
            },
            success: function(data) {
                T.Template("nav_category_list", data, !0)
            },
            failure: function(data, params) {},
            error: function(data, params) {}
        }, function(data) {}, function(data) {});
        var $design_category = $("#template-design_category_list-view");
        $design_category && $design_category.length && T.GET({
            action: "in_product_new/web_design/web_design_category_query",
            params: {},
            success: function(data) {
                data.categoryList = data.categoryList || [];
                T.Each(data.categoryList, function(i, item) {
                    T.Each(item.designCategoryList, function(k, design) {
                        design.categoryNameEllipsis = T.GetEllipsis(design.categoryName, 20)
                    })
                });
                T.Template("design_category_list", data, !0)
            },
            failure: function(data, params) {},
            error: function(data, params) {}
        }, function(data) {}, function(data) {});
        $(".slide-panel").each(function(i, el) {
            var $el = $(el);
            T.Slider({
                cont: el,
                duration: $el.data("duration"),
                interval: $el.data("interval"),
                direction: "lr",
                autoplay: !0
            })
        });
        T._LOGED && T.SetStatus()
    })
});
define("loaded", function() {});