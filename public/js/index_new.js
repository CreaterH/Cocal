define("widgets/navpos", ["base", "tools"], function($, T) {
    function NavPos(options) {
        var _this = this,
            opts = options || {};
        _this.opts = opts;
        opts.$nav.addClass("hide");
        opts.headerFixed = opts.headerFixed || "#header_fixed";
        opts.$nav.off("click." + opts.namespace).on("click." + opts.namespace, opts.navItem, function(e) {
            var $this = $(this),
                navIdx = $this.data("nav_idx"),
                topHeight = $(opts.headerFixed).outerHeight(),
                $item = $(opts.floorItem + "[data-nav_idx='" + navIdx + "']", opts.$cont);
            $("html, body").stop(!0, !0).animate({
                scrollTop: $item.offset().top - topHeight
            }, 300)
        });
        $(window).off("scroll." + opts.namespace + " resize." + opts.namespace).on("scroll." + opts.namespace + " resize." + opts.namespace, function(e) {
            _this.setPosition(opts)
        });
        setTimeout(function() {
            _this.setPosition(opts)
        }, 100);
        _this.setPosition(opts)
    }
    NavPos.prototype = {
        setPosition: function(opts) {
            opts = opts || this.opts;
            var $win = $(window),
                winTop = $win.scrollTop(),
                winHeight = $win.height(),
                height = opts.$nav.outerHeight(),
                contHeight = opts.$cont.outerHeight(),
                contTop = (opts.$cont.offset().top, opts.$cont.offset().top);
            if (winTop + winHeight > contTop) {
                var curTop = (Math.min(winTop, contTop), Math.min(contTop + contHeight, winTop + winHeight), Math.max(contTop, winTop + (winHeight - height) / 2));
                curTop = Math.min(contTop + contHeight - height, curTop);
                opts.$nav.css("top", curTop - winTop);
                opts.$nav.removeClass("hide")
            } else opts.$nav.addClass("hide");
            var $item = null;
            $(opts.floorItem, opts.$cont).each(function(i, el) {
                var $el = $(el),
                    minTop = winTop,
                    maxTop = winTop + winHeight,
                    startTop = $el.offset().top,
                    endTop = startTop + $el.outerHeight();
                if (minTop >= startTop && endTop >= minTop) {
                    if (endTop - minTop >= winHeight / 2) {
                        $item = $el;
                        return !1
                    }
                } else if (maxTop >= startTop && endTop >= maxTop) {
                    if (winHeight / 2 >= startTop - minTop) {
                        $item = $el;
                        return !1
                    }
                } else if (startTop >= minTop && maxTop >= endTop) {
                    $item = $el;
                    return !1
                }
            });
            var navIdx = $($item).data("nav_idx");
            navIdx && $(opts.navItem + "[data-nav_idx='" + navIdx + "']", opts.$nav).addClass("sel").siblings(opts.navItem).removeClass("sel")
        }
    };
    return function(options) {
        return new NavPos(options)
    }
});
define("modules/floor", ["base", "tools", "widgets/navpos"], function($, T, NavPos) {
    function Floor(options, isEvent) {
        this.init(options || {}, isEvent)
    }
    var config = {
        tempCombList: [{
            tempCombId: 11,
            tempList: [101, 201]
        }, {
            tempCombId: 12,
            tempList: [102, 201]
        }, {
            tempCombId: 13,
            tempList: [103, 201]
        }, {
            tempCombId: 14,
            tempList: [104, 202]
        }, {
            tempCombId: 15,
            tempList: [105, 203]
        }, {
            tempCombId: 16,
            tempList: [106, 204]
        }, {
            tempCombId: 17,
            tempList: [107, 205]
        }, {
            tempCombId: 21,
            tempList: [301, 201]
        }, {
            tempCombId: 22,
            tempList: [302, 201]
        }, {
            tempCombId: 23,
            tempList: [303, 201]
        }, {
            tempCombId: 24,
            tempList: [304, 202]
        }, {
            tempCombId: 25,
            tempList: [305, 203]
        }, {
            tempCombId: 26,
            tempList: [306, 204]
        }, {
            tempCombId: 27,
            tempList: [307, 205]
        }],
        tempList: [{
            tempId: 101,
            itemList: [2002, 2003, 1001, 1001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 201,
            itemList: [1001, 1001, 1001, 1001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 102,
            itemList: [2002, 2003, 1001, 1001, 1001, 1001, 2003]
        }, {
            tempId: 103,
            itemList: [2002, 1001, 1001, 1001, 1001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 104,
            itemList: [2003, 1001, 1001, 2002, 1001, 1001, 1001, 1001]
        }, {
            tempId: 202,
            itemList: [1001, 1001, 1001, 1001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 105,
            itemList: [2004, 2003, 1001, 1001, 1001, 1001]
        }, {
            tempId: 203,
            itemList: [1001, 1001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 106,
            itemList: [2003, 1001, 1001, 1001]
        }, {
            tempId: 204,
            itemList: [1001, 1001, 1001]
        }, {
            tempId: 107,
            itemList: [2001, 1001, 1001, 1001, 1001]
        }, {
            tempId: 205,
            itemList: [1001, 1001, 1001, 1001]
        }, {
            tempId: 301,
            itemList: [2002, 2003, 2001, 2001, 2001, 2001, 2001, 2001]
        }, {
            tempId: 302,
            itemList: [2002, 2003, 2001, 2001, 2001, 2001, 2003]
        }, {
            tempId: 303,
            itemList: [2002, 2001, 2001, 2001, 2001, 2001, 2001, 2001, 2001]
        }, {
            tempId: 304,
            itemList: [2003, 2001, 2001, 2002, 2001, 2001, 2001, 2001]
        }, {
            tempId: 305,
            itemList: [2004, 2003, 2001, 2001, 2001, 2001]
        }, {
            tempId: 306,
            itemList: [2003, 2001, 2001, 2001]
        }, {
            tempId: 307,
            itemList: [2001, 2001, 2001, 2001, 2001]
        }],
        itemList: [{
            itemCode: 1001,
            width: 236,
            height: 236
        }, {
            itemCode: 2001,
            width: 236,
            height: 310,
            carouselInterval: 800,
            residenceTime: 1500
        }, {
            itemCode: 2002,
            width: 236,
            height: 630,
            carouselInterval: 800,
            residenceTime: 1500
        }, {
            itemCode: 2003,
            width: 482,
            height: 310,
            carouselInterval: 800,
            residenceTime: 1500
        }, {
            itemCode: 2004,
            width: 482,
            height: 630,
            carouselInterval: 800,
            residenceTime: 1500
        }],
        data: null,
        tempComb: {},
        temp: {},
        item: {}
    };
    T.Each(config.itemList, function(i, item) {
        config.item[item.itemCode] = $.extend(!0, {}, item, {
            data: [config.data]
        })
    });
    T.Each(config.tempList, function(i, temp) {
        var itemList = [];
        T.Each(temp.itemList, function(k, itemCode) {
            itemList.push($.extend(!0, {}, config.item[itemCode], {
                sort: k
            }))
        });
        config.temp[temp.tempId] = $.extend(!0, {}, temp, {
            sort: i,
            pageName: "页签名称",
            itemList: itemList
        })
    });
    T.Each(config.tempCombList, function(i, tempComb) {
        var pageList = [];
        T.Each(tempComb.tempList, function(k, tempId) {
            pageList.push($.extend(!0, {}, config.temp[tempId], {
                sort: k
            }))
        });
        config.tempComb[tempComb.tempCombId] = $.extend(!0, {}, tempComb, {
            floorName: "楼层名称",
            pageList: pageList
        })
    });
    Floor.prototype = {
        data: {
            floorList: []
        },
        params: {
            floorType: "0"
        },
        $cont: $("#template-floor_list-view"),
        $nav: $("#template-floor_nav-view"),
        init: function(options, isEvent) {
            var _this = this;
            options.params = options.params || {};
            _this.params.floorType = options.params.floorType || "0";
            isEvent && _this.events()
        },
        loadFloorList: function(callback) {
            var _this = this;
            T.GET({
                action: "in_product_new/floor/floor_list_web_query",
                params: _this.params,
                success: function(data) {
                    _this.data.floorList = data.floorList || [];
                    var floorIds = [];
                    T.Each(data.floorList, function(i, floor) {
                        floor.pageList && floor.pageList.length > 1 && floorIds.push(floor.floorId);
                        T.Each(floor.pageList, function(j, page) {
                            var itemList = $.extend(!0, {}, config.temp[page.tempId]).itemList;
                            T.Each(page.itemList, function(k, item) {
                                if (item.data && item.data[0]) {
                                    var contentDesc = item.data[0].contentDesc || "",
                                        productName = item.data[0].productName || "";
                                    item.data[0].contentDescEllipsis = T.GetEllipsis(contentDesc, productName, 58)
                                }
                                itemList[item.sort] = $.extend(!0, {}, item)
                            });
                            page.itemList = itemList
                        })
                    });
                    T.Template("floor_list", _this.data, !0);
                    T.Template("floor_nav", _this.data, !0);
                    NavPos({
                        $cont: _this.$cont,
                        $nav: _this.$nav,
                        namespace: "floor",
                        navItem: ".nav-item",
                        floorItem: ".floor-item"
                    });
                    callback && callback.call(_this, data);
                    _this.loadPageListOfFloor(floorIds.join(","), callback);
                    setTimeout(function() {
                        _this.render()
                    }, 10)
                },
                failure: function(data, params) {
                    T.Template("floor_list", _this.data, !0);
                    T.Template("floor_nav", _this.data, !0)
                },
                error: function(data, params) {}
            }, function(data) {}, function(data) {})
        },
        loadPageListOfFloor: function(floorIds, callback) {
            var _this = this;
            floorIds && T.GET({
                action: "in_product_new/floor/floor_web_query",
                params: {
                    floorIds: floorIds
                },
                success: function(data) {
                    data.floorList = data.floorList || [];
                    T.Each(data.floorList, function(i, floor) {
                        T.Each(floor.pageList, function(j, page) {
                            var itemList = $.extend(!0, {}, config.temp[page.tempId]).itemList;
                            T.Each(page.itemList, function(k, item) {
                                if (item.data && item.data[0]) {
                                    var contentDesc = item.data[0].contentDesc || "",
                                        productName = item.data[0].productName || "";
                                    item.data[0].contentDescEllipsis = T.GetEllipsis(contentDesc, productName, 58)
                                }
                                itemList[item.sort] = $.extend(!0, {}, item)
                            });
                            page.itemList = itemList
                        })
                    });
                    T.Each(data.floorList, function(i, floor) {
                        floor.pageList = floor.pageList || [];
                        var $floor = $(".floor-item[data-nav_idx='" + floor.floorId + "']", _this.$cont),
                            $cont = $(".floor-content:first-child", $floor);
                        $cont.nextAll(".floor-content").remove();
                        $cont.after(T.Compiler.template("floor_page_list", floor))
                    });
                    _this.data.floorList = data.floorList;
                    callback && callback.call(_this, data);
                    setTimeout(function() {
                        _this.render()
                    }, 10)
                },
                failure: function(data, params) {
                    T.Template("floor_list", _this.data, !0);
                    T.Template("floor_nav", _this.data, !0)
                },
                error: function(data, params) {}
            }, function(data) {}, function(data) {})
        },
        render: function() {
            var _this = this;
            $(".slide-panel", _this.$cont).each(function(i, el) {
                var $el = $(el);
                T.Slider({
                    cont: el,
                    duration: $el.data("duration"),
                    interval: $el.data("interval"),
                    direction: "lr",
                    autoplay: !0
                })
            })
        },
        events: function() {
            var _this = this;
            _this.$cont.off("mouseenter.floor").on("mouseenter.floor", ".floor-tab", function(e) {
                var $this = $(this),
                    $tab = $this.closest(".floor-tab"),
                    $tabs = $this.closest(".floor-tabs"),
                    $floor = $this.closest(".floor-item");
                $("a", $tabs).removeClass("sel");
                $("a", $this).addClass("sel");
                var pageId = $tab.data("page_id"),
                    $content = ($floor.data("nav_idx"), $(".floor-content[data-page_id='" + pageId + "']", $floor));
                if ($content && $content.length) {
                    $(".floor-content", $floor).hide();
                    $(".floor-content[data-page_id='" + pageId + "']", $floor).show()
                }
            })
        }
    };
    return function(options, isEvent) {
        return new Floor(options, isEvent)
    }
});
require(["base", "tools", "modules/floor"], function($, T, Floor) {
    var Home = T.Module({
        init: function() {
            var _this = this;
            T.Slider({
                cont: "#partner",
                direction: "lr",
                autoplay: !0
            });
            Floor(null, !0).loadFloorList(function() {
                $("#slider_list_bhp5").length || $(".floor-item:eq(2)", this.$cont).after('<div id="slider_list_bhp5" class="floor-item banner-md"></div>');
                T.Advert({
                    areaCode: "bhp5"
                })
            });
            T._LOGED && _this.getOrderNum()
        },
        getOrderNum: function() {
            T.GET({
                action: COM_API.order_mun,
                success: function(data) {
                    data.common.notpay > 0 && $("#nopay_order").removeClass("hide").html(data.common.notpay)
                },
                failure: function(data, params) {},
                error: function(data, params) {}
            }, function(data) {}, function(data) {})
        }
    });
    T.Loader(function() {
        if (T.REQUEST.backurl) {
            var backurl = /http\:\/\//.test(T.REQUEST.backurl) ? T.REQUEST.backurl : decodeURIComponent(T.REQUEST.backurl);
            0 != backurl.indexOf(T.DOMAIN.WWW.replace(/\/$/, "")) && 0 != backurl.indexOf(T.DOMAIN.WWW + "index.html") && (T._LOGED && !T._STORE ? window.location = backurl : T._STORE || (window.location = T.DOMAIN.PASSPORT + "index.html#backurl=" + encodeURIComponent(T.REQUEST.backurl)))
        }
        new Home
    });
    var slideMenu = function() {
        var sp, st, t, m, sa, l, w, gw, ot;
        return {
            destruct: function() {
                if (m) {
                    clearInterval(m.htimer);
                    clearInterval(m.timer)
                }
            },
            build: function(sm, sw, mt, s, sl, h) {
                sp = s;
                st = sw;
                t = mt;
                m = document.getElementById(sm);
                sa = m.getElementsByTagName("li");
                l = sa.length;
                w = m.offsetWidth;
                gw = w / l;
                ot = Math.floor((w - st) / (l - 1));
                var i = 0;
                for (i; l > i; i++) {
                    s = sa[i];
                    s.style.width = gw + "px";
                    this.timer(s)
                }
                null != sl && (m.timer = setInterval(function() {
                    slideMenu.slide(sa[sl - 1])
                }, t))
            },
            timer: function(s) {
                s.onmouseover = function() {
                    clearInterval(m.htimer);
                    clearInterval(m.timer);
                    m.timer = setInterval(function() {
                        slideMenu.slide(s)
                    }, t);
                    $(this).find(".title_wrap").hide();
                    $(this).find(".mask_b").hide()
                };
                s.onmouseout = function() {
                    clearInterval(m.timer);
                    clearInterval(m.htimer);
                    m.htimer = setInterval(function() {
                        slideMenu.slide(s, !0)
                    }, t);
                    $(this).find(".title_wrap").show();
                    $(this).find(".mask_b").show()
                }
            },
            slide: function(s, c) {
                var cw = parseInt(s.style.width);
                if (st > cw && !c || cw > gw && c) {
                    var owt = 0,
                        i = 0;
                    for (i; l > i; i++)
                        if (sa[i] != s) {
                            var o, ow, oi = 0;
                            o = sa[i];
                            ow = parseInt(o.style.width);
                            if (gw > ow && c) {
                                oi = Math.floor((gw - ow) / sp);
                                oi = oi > 0 ? oi : 1;
                                o.style.width = ow + oi + "px"
                            } else if (ow > ot && !c) {
                                oi = Math.floor((ow - ot) / sp);
                                oi = oi > 0 ? oi : 1;
                                o.style.width = ow - oi + "px"
                            }
                            owt += c ? ow + oi : ow - oi
                        }
                    s.style.width = w - owt + "px"
                } else {
                    m.htimer && clearInterval(m.htimer);
                    m.timer && clearInterval(m.timer)
                }
            }
        }
    }();
    slideMenu.build("solutions", 400, 10, 10, 1)
});
define("index_new", function() {});