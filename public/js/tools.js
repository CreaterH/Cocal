/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*!
 * jquery.base64.js 0.1 - https://github.com/yckart/jquery.base64.js
 * Makes Base64 en & -decoding simpler as it is.
 *
 * Based upon: https://gist.github.com/Yaffle/1284012
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

function QR8bitByte(a) {
     this.mode = QRMode.MODE_8BIT_BYTE;
     this.data = a
}

function QRCode(a, c) {
     this.typeNumber = a;
     this.errorCorrectLevel = c;
     this.modules = null;
     this.moduleCount = 0;
     this.dataCache = null;
     this.dataList = []
}

function QRPolynomial(a, c) {
     if (void 0 == a.length) throw Error(a.length + "/" + c);
     for (var d = 0; d < a.length && 0 == a[d];) d++;
     this.num = Array(a.length - d + c);
     for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d]
}

function QRRSBlock(a, c) {
     this.totalCount = a;
     this.dataCount = c
}

function QRBitBuffer() {
     this.buffer = [];
     this.length = 0
}
define("utils/base", [], function(require, exports, module) {
     var _TOSTRING = {}.toString,
          _SLICE = [].slice,
          _HOSTNAME = location.hostname,
          _DOMAIN = _HOSTNAME.slice(parseInt(_HOSTNAME.lastIndexOf(".") - 6)),
          _NODE = document.createElement("div");
     _NODE.style.cssText = "position:fixed;";
     var classToType = {
          "[object HTMLDocument]": "Document",
          "[object HTMLCollection]": "NodeList",
          "[object StaticNodeList]": "NodeList",
          "[object DOMWindow]": "Window",
          "[object global]": "Window",
          "null": "Null",
          NaN: "NaN",
          undefined: "Undefined"
     };
     "Boolean,Number,String,Function,Array,Date,RegExp,Window,Document,Arguments,NodeList".replace(/[a-z]+/gi, function(name) {
          return classToType["[object " + name + "]"] = name
     });
     return {
          _NODE: _NODE,
          _SLICE: _SLICE,
          _DOMAIN: _DOMAIN,
          _HOSTNAME: _HOSTNAME,
          _TOSTRING: _TOSTRING,
          Browser: function(ua) {
               var ret = {},
                    webkit = ua.match(/WebKit\/([\d.]+)/),
                    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
                    ie = ua.match(/MSIE\s([\d\.]+)/) || ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                    firefox = ua.match(/Firefox\/([\d.]+)/),
                    safari = ua.match(/Safari\/([\d.]+)/),
                    opera = ua.match(/OPR\/([\d.]+)/);
               webkit && (ret.webkit = parseFloat(webkit[1]));
               chrome && (ret.chrome = parseFloat(chrome[1]));
               ie && (ret.ie = parseFloat(ie[1]));
               firefox && (ret.firefox = parseFloat(firefox[1]));
               safari && (ret.safari = parseFloat(safari[1]));
               opera && (ret.opera = parseFloat(opera[1]));
               return ret
          }(navigator.userAgent),
          OS: function(ua) {
               var ret = {},
                    android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/i),
                    ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/i),
                    weChat = ua.match(/MicroMessenger\/([\d.]+)/i);
               android && (ret.android = parseFloat(android[1]));
               ios && (ret.ios = parseFloat(ios[1].replace(/_/g, ".")));
               weChat && (ret.weChat = parseFloat(weChat[1].replace(/_/g, ".")));
               return ret
          }(navigator.userAgent),
          IS: {
               fixed: "fixed" === _NODE.style.position,
               AXO: "ActiveXObject" in window,
               CVS: !!document.createElement("canvas").getContext,
               XHR: "undefined" != typeof XMLHttpRequest,
               FD: "undefined" != typeof FormData,
               FR: "undefined" != typeof FileReader,
               EL: "undefined" != typeof addEventListener,
               DM: document.documentMode
          },
          uuid: function() {
               var _timestamp = 0;
               return function(len) {
                    var timestamp = (new Date).getTime() || 0,
                         chars = "abcdefghijklmnopqrstuvwxyz",
                         uuid = "";
                    _timestamp = _timestamp == timestamp ? timestamp + 1 : timestamp;
                    timestamp = "" + _timestamp;
                    len = len || 16;
                    for (var i = 0; len > i; i++) {
                         var k = timestamp.charAt(i);
                         "" === k && (k = Math.floor(26 * Math.random()));
                         uuid += chars.charAt(k) || "x"
                    }
                    return uuid
               }
          }(),
          guid: function() {
               var counter = 0;
               return function(prefix) {
                    for (var guid = (+new Date).toString(32), i = 0; 5 > i; i++) guid += Math.floor(65535 * Math.random()).toString(32);
                    return (prefix || "guid_") + guid + (counter++).toString(32)
               }
          }(),
          randomString: function(len, readable) {
               len = len || 6;
               for (var chars = readable ? "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", count = chars.length, str = "", i = len; i > 0; i--) str += chars.charAt(Math.floor(Math.random() * count));
               return str
          },
          type: function(obj, str) {
               var result = classToType[null == obj || obj !== obj ? obj : classToType.toString.call(obj)] || obj.nodeName || "#";
               "#" === result.charAt(0) && (result = obj == obj.document && obj.document != obj ? "Window" : 9 === obj.nodeType ? "Document" : obj.callee ? "Arguments" : isFinite(obj.length) && obj.item ? "NodeList" : classToType.toString.call(obj).slice(8, -1));
               return str ? "string" == typeof str ? str === result : str.test(result) : result
          },
          each: function(obj, callback) {
               if (!obj) return obj;
               if (!this.type(callback, "Function")) return obj;
               var type = this.type(obj);
               if (/^Array|NodeList$/.test(type))
                    for (var l = obj.length, i = 0; l > i && callback(i, obj[i]) !== !1; i++);
               else if ("Object" === type)
                    for (var o in obj)
                         if ("" !== o && obj.hasOwnProperty && obj.hasOwnProperty(o) && callback(o, obj[o]) === !1) break;
               return obj
          },
          extend: function(source, target, depth) {
               var _this = this;
               source || (source = {});
               var sourceType = this.type(source),
                    targetType = this.type(target);
               "Object" !== sourceType && "Object" === targetType ? source = {} : "Array" !== sourceType && "Array" === targetType && (source = []);
               _this.each(target, function(k, v) {
                    depth ? _this.extend(source[k], v) : source[k] = v
               });
               return source
          }
     }
});
define("libs/md5", [], function(require, exports, module) {
     function hex_md5(s) {
          return binl2hex(core_md5(str2binl(s), s.length * chrsz))
     }

     function b64_md5(s) {
          return binl2b64(core_md5(str2binl(s), s.length * chrsz))
     }

     function str_md5(s) {
          return binl2str(core_md5(str2binl(s), s.length * chrsz))
     }

     function hex_hmac_md5(key, data) {
          return binl2hex(core_hmac_md5(key, data))
     }

     function b64_hmac_md5(key, data) {
          return binl2b64(core_hmac_md5(key, data))
     }

     function str_hmac_md5(key, data) {
          return binl2str(core_hmac_md5(key, data))
     }

     function core_md5(x, len) {
          x[len >> 5] |= 128 << len % 32;
          x[(len + 64 >>> 9 << 4) + 14] = len;
          for (var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
               var olda = a,
                    oldb = b,
                    oldc = c,
                    oldd = d;
               a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
               d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
               c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
               b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
               a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
               d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
               c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
               b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
               a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
               d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
               c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
               b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
               a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
               d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
               c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
               b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
               a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
               d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
               c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
               b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
               a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
               d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
               c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
               b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
               a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
               d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
               c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
               b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
               a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
               d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
               c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
               b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
               a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
               d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
               c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
               b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
               a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
               d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
               c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
               b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
               a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
               d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
               c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
               b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
               a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
               d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
               c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
               b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
               a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
               d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
               c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
               b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
               a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
               d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
               c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
               b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
               a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
               d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
               c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
               b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
               a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
               d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
               c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
               b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
               a = safe_add(a, olda);
               b = safe_add(b, oldb);
               c = safe_add(c, oldc);
               d = safe_add(d, oldd)
          }
          return Array(a, b, c, d)
     }

     function md5_cmn(q, a, b, x, s, t) {
          return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
     }

     function md5_ff(a, b, c, d, x, s, t) {
          return md5_cmn(b & c | ~b & d, a, b, x, s, t)
     }

     function md5_gg(a, b, c, d, x, s, t) {
          return md5_cmn(b & d | c & ~d, a, b, x, s, t)
     }

     function md5_hh(a, b, c, d, x, s, t) {
          return md5_cmn(b ^ c ^ d, a, b, x, s, t)
     }

     function md5_ii(a, b, c, d, x, s, t) {
          return md5_cmn(c ^ (b | ~d), a, b, x, s, t)
     }

     function core_hmac_md5(key, data) {
          var bkey = str2binl(key);
          bkey.length > 16 && (bkey = core_md5(bkey, key.length * chrsz));
          for (var ipad = Array(16), opad = Array(16), i = 0; 16 > i; i++) {
               ipad[i] = 909522486 ^ bkey[i];
               opad[i] = 1549556828 ^ bkey[i]
          }
          var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
          return core_md5(opad.concat(hash), 640)
     }

     function safe_add(x, y) {
          var lsw = (65535 & x) + (65535 & y),
               msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return msw << 16 | 65535 & lsw
     }

     function bit_rol(num, cnt) {
          return num << cnt | num >>> 32 - cnt
     }

     function str2binl(str) {
          for (var bin = Array(), mask = (1 << chrsz) - 1, i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
          return bin
     }

     function binl2str(bin) {
          for (var str = "", mask = (1 << chrsz) - 1, i = 0; i < 32 * bin.length; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
          return str
     }

     function binl2hex(binarray) {
          for (var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", str = "", i = 0; i < 4 * binarray.length; i++) str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
          return str
     }

     function binl2b64(binarray) {
          for (var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", str = "", i = 0; i < 4 * binarray.length; i += 3)
               for (var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 255, j = 0; 4 > j; j++) str += 8 * i + 6 * j > 32 * binarray.length ? b64pad : tab.charAt(triplet >> 6 * (3 - j) & 63);
          return str
     }

     function md5(s) {
          return hex_md5(s)
     }
     var hexcase = 0,
          b64pad = "",
          chrsz = 8;
     md5.b64_md5 = b64_md5;
     md5.str_md5 = str_md5;
     md5.hex_hmac_md5 = hex_hmac_md5;
     md5.b64_hmac_md5 = b64_hmac_md5;
     md5.str_hmac_md5 = str_hmac_md5;
     return md5
});
define("libs/base64", [], function(require, exports, module) {
     function code(s, discard, alpha, beta, w1, w2) {
          s = String(s);
          for (var buffer = 0, i = 0, length = s.length, result = "", bitsInBuffer = 0; length > i;) {
               var c = s.charCodeAt(i);
               c = 256 > c ? alpha[c] : -1;
               buffer = (buffer << w1) + c;
               bitsInBuffer += w1;
               for (; bitsInBuffer >= w2;) {
                    bitsInBuffer -= w2;
                    var tmp = buffer >> bitsInBuffer;
                    result += beta.charAt(tmp);
                    buffer ^= tmp << bitsInBuffer
               }++i
          }!discard && bitsInBuffer > 0 && (result += beta.charAt(buffer << w2 - bitsInBuffer));
          return result
     }
     for (var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a256 = "", r64 = [256], r256 = [256], i = 0, UTF8 = {
               encode: function(strUni) {
                    var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) {
                         var cc = c.charCodeAt(0);
                         return String.fromCharCode(192 | cc >> 6, 128 | 63 & cc)
                    }).replace(/[\u0800-\uffff]/g, function(c) {
                         var cc = c.charCodeAt(0);
                         return String.fromCharCode(224 | cc >> 12, 128 | cc >> 6 & 63, 128 | 63 & cc)
                    });
                    return strUtf
               },
               decode: function(strUtf) {
                    var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
                         var cc = (15 & c.charCodeAt(0)) << 12 | (63 & c.charCodeAt(1)) << 6 | 63 & c.charCodeAt(2);
                         return String.fromCharCode(cc)
                    }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
                         var cc = (31 & c.charCodeAt(0)) << 6 | 63 & c.charCodeAt(1);
                         return String.fromCharCode(cc)
                    });
                    return strUni
               }
          }; 256 > i;) {
          var c = String.fromCharCode(i);
          a256 += c;
          r256[i] = i;
          r64[i] = b64.indexOf(c);
          ++i
     }
     var Plugin = function(dir, input, encode) {
          return input ? Plugin[dir](input, encode) : dir ? null : this
     };
     Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
          plain = Plugin.raw === !1 || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
          plain = code(plain, !1, r256, b64, 8, 6);
          return plain + "====".slice(plain.length % 4 || 4)
     };
     Plugin.atob = Plugin.decode = function(coded, utf8decode) {
          coded = String(coded).split("=");
          var i = coded.length;
          do {
               --i;
               coded[i] = code(coded[i], !0, r64, a256, 6, 8)
          } while (i > 0);
          coded = coded.join("");
          return Plugin.raw === !1 || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded
     };
     Plugin.URLSafeEncode = function(v) {
          return Plugin.encode(v).replace(/\//g, "_").replace(/\+/g, "-")
     };
     window.btoa || (window.btoa = Plugin.btoa);
     window.atob || (window.atob = Plugin.atob);
     return Plugin
});
define("utils/mediator", ["utils/base"], function(Base) {
     function findHandlers(events, name, callback, context) {
          var ret = [];
          Base.each(events, function(i, evt) {
               !evt || name && evt.name !== name || callback && evt.callback !== callback || context && evt.context !== context || ret.push(evt)
          });
          return ret
     }

     function triggerHandlers(events, args) {
          for (var handler, stoped = !1, i = -1, len = events.length; ++i < len;) {
               handler = events[i];
               if (handler.callback.apply(handler.context, args) === !1) {
                    stoped = !0;
                    break
               }
          }
          return !stoped
     }
     var slice = [].slice,
          separator = /\s+/,
          protos = {
               on: function(name, callback, context) {
                    var events = this._events || (this._events = []);
                    if ("string" == typeof name && "function" == typeof callback) {
                         var names = name.split(separator);
                         names.length;
                         Base.each(names, function(i, evt) {
                              evt && events.push({
                                   id: events.length,
                                   name: evt,
                                   callback: callback,
                                   context: context || this
                              })
                         })
                    }
                    return this
               },
               off: function(name, callback, context) {
                    var events = this._events;
                    if (!events) return this;
                    if (!name && !callback && !context) {
                         this._events = [];
                         return this
                    }
                    Base.each(name.split(separator), function(i, name) {
                         Base.each(findHandlers(events, name, callback, context), function(i, evt) {
                              delete events[evt.id]
                         })
                    });
                    return this
               },
               trigger: function(name) {
                    if (name) {
                         var args = slice.call(arguments, 1),
                              events = findHandlers(this._events, name),
                              allEvents = findHandlers(this._events, "all");
                         return triggerHandlers(events, args) && triggerHandlers(allEvents, arguments)
                    }
               }
          };
     return Base.extend({
          installTo: function(obj) {
               return Base.extend(obj, protos)
          }
     }, protos)
});
define("utils/transfer", [], function(require, exports, module) {
     return {
          toDBC: function(str) {
               str = String(null == str ? "" : str);
               for (var result = "", i = 0; i < str.length; i++) result += 12288 == str.charCodeAt(i) ? String.fromCharCode(str.charCodeAt(i) - 12256) : str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375 ? String.fromCharCode(str.charCodeAt(i) - 65248) : String.fromCharCode(str.charCodeAt(i));
               return result
          },
          toSBC: function(str) {
               str = String(null == str ? "" : str);
               for (var result = "", i = 0; i < str.length; i++) result += 32 == str.charCodeAt(i) ? String.fromCharCode(12288) : str.charCodeAt(i) < 127 ? String.fromCharCode(str.charCodeAt(i) + 65248) : String.fromCharCode(str.charCodeAt(i));
               return result
          },
          decodeHashString: function(str, sign, flag) {
               for (var arr = str ? str.split(null == sign ? "&" : sign) : [], hashs = {}, reg = new RegExp("(^|" + (sign || "&") + ")([^" + (flag || "=") + "]*)" + (flag || "=") + "([^" + (sign || "&") + "]*)(" + (sign || "&") + "|$)", "i"), i = 0, l = arr.length; l > i; i++) {
                    var parts = arr[i].match(reg) || [];
                    null != parts[2] && "" !== parts[2] && (hashs[parts[2]] = decodeURIComponent(null == parts[3] ? "" : parts[3]))
               }
               return hashs
          },
          encodeHashString: function(hashs, sign, flag) {
               var arr = [];
               for (var key in hashs) hashs.hasOwnProperty && hashs.hasOwnProperty(key) && arr.push(key + (null == flag ? "=" : flag) + encodeURIComponent(decodeURIComponent(null == hashs[key] ? "" : hashs[key])));
               return arr.join(null == sign ? "&" : sign)
          }
     }
});
define("utils/format", [], function(require, exports, module) {
     return {
          fileSize: function(size, pointLength, units) {
               var unit;
               units = units || ["B", "K", "M", "G", "TB"];
               for (;
                    (unit = units.shift()) && size > 1024;) size /= 1024;
               return ("B" === unit ? size : size.toFixed(pointLength || 2)) + unit
          },
          dateTime: function(date, fmt) {
               fmt = fmt || "yyyy-mm-dd";
               var o = {
                    "m+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "i+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "l+": date.getMilliseconds()
               };
               /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)));
               for (var k in o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
               return fmt
          }
     }
});
define("utils/date", ["utils/base"], function(Base) {
     return {
          dayMillisecond: 864e5,
          format: function(date, fmt) {
               date = date || new Date;
               fmt = fmt || "yyyy-mm-dd";
               var o = {
                    "m+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "i+": date.getMinutes(),
                    "s+": date.getSeconds()
               };
               /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)));
               for (var k in o) new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
               return fmt
          },
          getMonthDays: function(month, year) {
               var _this = this;
               year = year || (new Date).getFullYear();
               var monthStartDate = new Date(year, month - 1, 1),
                    monthEndDate = new Date(year, month, 1);
               return Math.floor((monthEndDate - monthStartDate) / _this.dayMillisecond)
          },
          getDateRange: function(num, mode, oneDay) {
               var _this = this;
               num = parseFloat(num) || 0, mode = mode || "day";
               var date = new Date,
                    dateTime = date.getTime(),
                    startDate = dateTime,
                    endDate = dateTime;
               if ("week" == mode) {
                    num = 7 * num;
                    var weekTime = dateTime + num * _this.dayMillisecond,
                         week = date.getDay() || 7;
                    startDate = weekTime - (week - 1) * _this.dayMillisecond;
                    endDate = startDate + 6 * _this.dayMillisecond
               } else if ("month" == mode) {
                    var monthDate = new Date(date.getFullYear(), date.getMonth() + num, 1);
                    startDate = monthDate.getTime();
                    monthDate.setDate(_this.getMonthDays(monthDate.getMonth() + 1, monthDate.getFullYear()));
                    endDate = monthDate.getTime()
               } else if (0 > num) {
                    num++;
                    startDate = dateTime + num * _this.dayMillisecond;
                    endDate = oneDay ? startDate : dateTime
               } else if (num > 0) {
                    num--;
                    endDate = dateTime + num * _this.dayMillisecond;
                    startDate = oneDay ? endDate : dateTime
               }
               return {
                    startDate: _this.format(new Date(startDate)),
                    endDate: _this.format(new Date(endDate)),
                    today: _this.format(new Date(dateTime))
               }
          }
     }
});
define("utils/array", ["utils/base"], function(Base) {
     return {
          add: function(arr, value, redo, key) {
               if (redo) {
                    arr.push(value);
                    return arr
               }
               var bool = !1,
                    isKey = "undefined" == typeof key || "" === key;
               Utils.each(arr, function(k, v) {
                    (isKey && v == value || !isKey && v[key] == value[key]) && (bool = !0)
               });
               bool || arr.push(value);
               return arr
          },
          get: function(arr, value, key, isAll) {
               var ret = null;
               if ("undefined" == typeof value || "undefined" == typeof key || "" === key) return ret;
               Utils.each(arr, function(k, v) {
                    if (v[key] == value) {
                         ret = v;
                         if (!isAll) return !1
                    }
               });
               return ret
          },
          set: function(arr, value, key) {
               if (!arr || "undefined" == typeof value || "undefined" == typeof key || "" === key) return arr;
               Utils.each(arr, function(k, v) {
                    v[key] == value[key] && (arr[k] = value)
               });
               return arr
          },
          indexOf: function(arr, value, key) {
               var ret = -1,
                    bool = "undefined" == typeof key || "" === key;
               Utils.each(arr, function(k, v) {
                    if (bool ? v == value : v[key] == value) {
                         ret = k;
                         return !1
                    }
               });
               return ret
          },
          remove: function(arr, value, key) {
               var bool = "undefined" == typeof key || "" === key,
                    ret = [];
               Utils.each(arr, function(k, v) {
                    (bool ? v != value : v[key] != value) && ret.push(v)
               });
               return ret
          },
          check: function(arr, values, key, def) {
               if (!Utils.type(arr, "Array") || "undefined" == typeof values || "undefined" == typeof key || "" === key) return values || [];
               Utils.type(values, "Array") && (values = values.join(";"));
               var count = 0,
                    _values = "";
               Utils.each(arr, function(i, v) {
                    if ((";" + values + ";").indexOf(";" + v[key] + ";") >= 0) {
                         arr[i].CHECKED = 1;
                         _values += ";" + v[key];
                         count++
                    } else arr[i].CHECKED = 0
               });
               if (0 === count && def && arr[0]) {
                    arr[0].CHECKED = 1;
                    _values += ";" + arr[0][key]
               }
               return (_values ? _values.substring(1) : "").split(";")
          }
     }
});
define("utils/number", ["utils/base"], function(Base) {
     return {
          calculator: function(args, sign) {
               var arg1 = args[0],
                    arg2 = args[1];
               if (args.length < 2) return arg1;
               arg1 = parseFloat(arg1) || 0;
               arg2 = parseFloat(arg2) || 0;
               var m, num1, num2, result, arr1 = arg1.toString().split("."),
                    arr2 = arg2.toString().split("."),
                    r1 = null == arr1[1] ? 0 : arr1[1].length,
                    r2 = null == arr2[1] ? 0 : arr2[1].length,
                    x1 = parseInt(arr1[0] || 0, 10),
                    x2 = parseInt(arr1[1] || 0, 10),
                    y1 = parseInt(arr2[0] || 0, 10),
                    y2 = parseInt(arr2[1] || 0, 10),
                    m1 = Math.pow(10, r1),
                    m2 = Math.pow(10, r2);
               if ("*" === sign) {
                    num1 = x1 * m1 + x2;
                    num2 = y1 * m2 + y2
               } else {
                    m = Math.pow(10, Math.max(r1, r2));
                    num1 = x1 * m + x2 * m / m1;
                    num2 = y1 * m + y2 * m / m2
               }
               result = "-" === sign ? (num1 - num2) / m : "*" === sign ? num1 * num2 / (m1 * m2) : "/" === sign ? num1 / num2 : (num1 + num2) / m;
               args = args.slice(2);
               args.unshift(result);
               return this.calculator(args, sign)
          },
          add: function() {
               return this.calculator(Base._SLICE.call(arguments, 0), "+")
          },
          sub: function() {
               return this.calculator(Base._SLICE.call(arguments, 0), "-")
          },
          mul: function() {
               return this.calculator(Base._SLICE.call(arguments, 0), "*")
          },
          div: function() {
               return this.calculator(Base._SLICE.call(arguments, 0), "/")
          }
     }
});
define("utils/json", ["utils/base"], function(Base) {
     return {
          format: function(value) {
               return (value + "").replace(/(['"\\])/g, "\\$1")
          },
          parse: function(str) {
               return new Function("return " + str)()
          },
          objectToString: function(obj) {
               var _this = this,
                    jsonString = [];
               for (var o in obj)
                    if ("" !== o && obj.hasOwnProperty && obj.hasOwnProperty(o)) {
                         var item = obj[o],
                              type = Base.type(item);
                         "Array" === type ? jsonString.push('"' + o + '":' + _this.arrayToString(item)) : "Object" === type ? jsonString.push('"' + o + '":' + _this.objectToString(item)) : jsonString.push('"' + o + '":"' + _this.format(item) + '"')
                    }
               return "{" + jsonString.join(",") + "}"
          },
          arrayToString: function(arr) {
               for (var _this = this, jsonString = [], i = 0; i < arr.length; i++) {
                    var item = arr[i],
                         type = Base.type(item);
                    "Array" === type ? jsonString.push(_this.arrayToString(item)) : "Object" === type ? jsonString.push(_this.objectToString(item)) : jsonString.push('"' + _this.format(item) + '"')
               }
               return "[" + jsonString.join(",") + "]"
          },
          stringify: function(json) {
               var _this = this,
                    jsonString = "",
                    type = Base.type(json);
               jsonString = "Array" === type ? _this.arrayToString(json) : "Object" === type ? _this.objectToString(json) : json;
               return jsonString
          }
     }
});
define("utils/cookie", ["utils/base", "utils/transfer"], function(Base, Transfer) {
     return {
          get: function(key) {
               var result = Transfer.decodeHashString(document.cookie, "; ");
               return key ? result[key] : result
          },
          set: function(key, value, options) {
               if (key) {
                    options = options || {};
                    if (null === value || "undefined" == typeof value) {
                         value = "";
                         options.expires = options.expires || -1
                    }
                    if ("number" == typeof options.expires) {
                         var days = options.expires;
                         options.expires = new Date;
                         options.expires.setTime(options.expires.getTime() + 864e5 * days)
                    }
                    document.cookie = [key, "=", encodeURIComponent(decodeURIComponent(value)), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
               }
          }
     }
});
define("utils/dom", ["utils/base"], function(Base) {
     return {
          byId: function(name) {
               return name ? document.getElementById(name) : null
          },
          byName: function(name) {
               return document.getElementsByName(name)
          },
          byTagName: function(o, name) {
               o = o ? o : document;
               var els = o.getElementsByTagName(name);
               return els ? els : []
          },
          closest: function(o, str) {
               function _parent(o) {
                    var tn = o.tagName.toUpperCase();
                    return "HTML" === tn ? null : (n ? n !== tn : 0) || (cn ? !_this.hasClass(o, cn) : 0) ? _parent(o.parentNode) : o
               }
               var _this = this,
                    idx = str.indexOf("."),
                    n = str,
                    cn = "";
               if (idx >= 0) {
                    cn = str.substring(idx + 1);
                    n = str.substring(0, idx)
               }
               n = n.toUpperCase();
               return o && o.tagName ? _parent(o) : null
          },
          find: function(o, str) {
               var _this = this,
                    idx = str.indexOf("."),
                    n = str,
                    cn = "";
               if (idx >= 0) {
                    cn = str.substring(idx + 1);
                    n = str.substring(0, idx)
               }
               n = n.toUpperCase();
               for (var tags = o.getElementsByTagName("*"), nodes = [], i = 0; i < tags.length; i++) {
                    var tag = tags[i],
                         tn = tag.tagName.toUpperCase();
                    (n ? n !== tn : 0) || (cn ? !_this.hasClass(tag, cn) : 0) || nodes.push(tag)
               }
               return nodes
          },
          attr: function(o, n, v) {
               o && n && v && o.setAttribute && o.setAttribute(n, v);
               return o && n && o.getAttribute ? o.getAttribute(n) : ""
          },
          removeAttr: function(o, n) {
               return o && n && o.removeAttribute ? o.removeAttribute(n) : ""
          },
          hasClass: function(node, className) {
               if (node && node.nodeType) {
                    for (var classNames = (node.className + "").split(/\s+/), i = 0; i < classNames.length; i++)
                         if (classNames[i] == className) return !0;
                    return !1
               }
          },
          addClass: function(obj, className) {
               if (obj && obj.nodeType) {
                    for (var classNames = (obj.className + "").split(" "), newClassNames = "", i = 0; i < classNames.length; i++) classNames[i] && classNames[i] !== className && (newClassNames += " " + classNames[i]);
                    newClassNames += " " + className;
                    obj.className = newClassNames.substring(1);
                    return obj
               }
          },
          removeClass: function(obj, className) {
               if (obj && obj.nodeType) {
                    for (var classNames = (obj.className + "").split(" "), newClassNames = "", i = 0; i < classNames.length; i++) classNames[i] && classNames[i] !== className && (newClassNames += " " + classNames[i]);
                    obj.className = newClassNames.substring(1);
                    return obj
               }
          },
          bind: function(obj, type, handler) {
               obj && (obj.nodeType || 1 == obj.nodeType || 9 == obj.nodeType || obj.top === window.top) && (obj.addEventListener ? obj.addEventListener(type, handler, !1) : obj.attachEvent ? obj.attachEvent("on" + type, handler) : obj["on" + type] = handler)
          },
          unbind: function(obj, type, handler) {
               obj && (obj.nodeType || 1 == obj.nodeType || 9 == obj.nodeType || obj.top === window) && (obj.removeEventListener ? obj.removeEventListener(type, handler, !1) : obj.detachEvent ? obj.detachEvent("on" + type, handler) : obj["on" + type] = null)
          },
          preventDefault: function(e) {
               e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1
          },
          stopPropagation: function(e) {
               e && e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = !0
          },
          getEvent: function() {
               if (window.event) return window.event;
               for (var func = arguments.caller; null != func;) {
                    var e = func.arguments[0];
                    if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent || "object" == typeof e && e.preventDefault && e.stopPropagation)) return e;
                    func = func.caller
               }
               return null
          },
          offset: function(obj) {
               function getPos(obj) {
                    if (obj) {
                         pos.top += obj.offsetTop;
                         pos.left += obj.offsetLeft;
                         getPos(obj.offsetParent)
                    }
               }
               var pos = {
                    top: 0,
                    left: 0
               };
               getPos(obj);
               return pos
          },
          getSize: function(o) {
               return o ? {
                    w: o.clientWidth || o.offsetWidth,
                    h: o.clientHeight || o.offsetHeight
               } : {
                    w: document.documentElement.clientWidth || document.body.offsetWidth,
                    h: document.documentElement.clientHeight || document.body.offsetHeight
               }
          },
          getZIndex: function() {
               var tags = document.getElementsByTagName("*"),
                    zIndex = 0;
               Base.each(tags, function(i, tag) {
                    zIndex = Math.max(tag.style.zIndex || 0, zIndex)
               })
          },
          getMousePos: function(e) {
               var ret = {};
               e = e || this.getEvent();
               if (isNaN(e.pageX) || isNaN(e.pageY))
                    if (!document.documentElement || isNaN(e.clientX) || isNaN(document.documentElement.scrollTop)) {
                         if (document.body && !isNaN(e.clientX) && !isNaN(document.body.scrollLeft)) {
                              ret.x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
                              ret.y = e.clientY + document.body.scrollTop - document.body.clientTop
                         }
                    } else {
                         ret.x = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
                         ret.y = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
                    }
               else {
                    ret.x = e.pageX;
                    ret.y = e.pageY
               }
               return ret
          },
          getScrollPos: function() {
               var ret = {
                    x: document.body.scrollLeft - document.body.clientLeft,
                    y: document.body.scrollTop - document.body.clientTop
               };
               if (document.documentElement) {
                    ret.x = Math.max(document.documentElement.scrollLeft - document.documentElement.clientLeft, ret.x);
                    ret.y = Math.max(document.documentElement.scrollTop - document.documentElement.clientTop, ret.y)
               }
               return ret
          },
          setOpacity: function(node, value) {
               node.setCapture ? node.style.filter = "alpha(opacity=" + value + ")" : node.style.opacity = value / 100
          },
          create: function(tag, attrs) {
               var _this = this;
               tag = tag || "div";
               attrs = attrs || {};
               var node = document.createElement(tag);
               Base.each(attrs, function(k, v) {
                    "class" == k ? node.className = v : "id" == k ? node.id = v : "name" == k ? node.name = v : "style" == k ? node.style.cssText = v : _this.attr(node, k, v)
               });
               return node
          },
          insertAfter: function(newElement, targetElement) {
               var parent = targetElement.parentNode;
               parent.lastChild == targetElement ? parent.appendChild(newElement, targetElement) : parent.insertBefore(newElement, targetElement.nextSibling)
          },
          setSelectOptions: function(obj, options) {
               var option = null;
               if (obj && options && options.data) {
                    obj.length = options.len || 0;
                    Base.each(options.data, function(o, item) {
                         if (options.key && options.val) {
                              option = new Option(item[options.val], item[options.key]);
                              item[options.key] === options.value && (option.selected = "selected")
                         } else {
                              option = new Option(item || o, o);
                              (item || o) === options.value && (option.selected = "selected")
                         }
                         obj.options.add(option)
                    })
               }
          }
     }
});
define("utils/drag", ["utils/base", "utils/dom", "utils/mediator"], function(Base, DOM, Mediator) {
     function Drag(options) {
          var _this = this;
          options = options || {};
          "string" == typeof options.trigger && (options.trigger = DOM.byId(options.trigger));
          if (options.trigger) {
               "string" == typeof options.target && (options.target = DOM.byId(options.target));
               if (options.target) {
                    options.opacity = parseInt(options.opacity, 10) || 100;
                    options.keepOrigin && (options.opacity = 50);
                    var originDragDiv = null,
                         tmpX = 0,
                         tmpY = 0,
                         moveable = !1;
                    options.trigger.onmousedown = function(e) {
                         e = e || DOM.getEvent();
                         if (!e || "object" == typeof options.target.setCapture && 1 != e.button || "object" != typeof options.target.setCapture && 0 != e.button) return !1;
                         _this.trigger("mousedown.before", options.target, options.trigger);
                         var wh = DOM.getSize();
                         if (options.keepOrigin) {
                              options.minLeft = parseInt(options.left, 10) || 0;
                              options.maxLeft = parseInt(wh.w - options.right, 10) || wh.w - options.target.offsetWidth;
                              options.minTop = parseInt(options.top, 10) || 0;
                              options.maxTop = parseInt(wh.h - options.bottom, 10) || wh.h - options.target.offsetHeight
                         } else {
                              var posDiv = options.target.offsetParent || options.target.parentNode,
                                   posW = posDiv.clientWidth || posDiv.offsetWidth,
                                   posH = posDiv.clientHeight || posDiv.offsetHeight;
                              options.minLeft = parseInt(options.left - options.target.offsetWidth, 10) || 0;
                              options.maxLeft = parseInt(posW - options.right, 10) || parseInt(posW - options.target.offsetWidth);
                              options.minTop = parseInt(options.top - options.target.offsetHeight, 10) || 0;
                              options.maxTop = parseInt(posH - options.bottom, 10) || parseInt(posH - options.target.offsetHeight)
                         }
                         if (options.keepOrigin) {
                              originDragDiv = document.createElement("div");
                              originDragDiv.style.cssText = options.target.style.cssText;
                              originDragDiv.style.width = options.target.offsetWidth;
                              originDragDiv.style.height = options.target.offsetHeight;
                              originDragDiv.innerHTML = options.target.innerHTML;
                              options.target.parentNode && options.target.parentNode.insertBefore(originDragDiv, options.target);
                              options.target.style.zIndex = DOM.getZIndex() + 1
                         }
                         moveable = !0;
                         var downPos = DOM.getMousePos(e);
                         tmpX = downPos.x - options.target.offsetLeft;
                         tmpY = downPos.y - options.target.offsetTop;
                         options.trigger.style.cursor = "move";
                         options.target.setCapture ? options.target.setCapture() : window.captureEvents(Event.MOUSEMOVE);
                         DOM.stopPropagation(e);
                         DOM.preventDefault(e);
                         _this.trigger("mousedown.after", options.target, options.trigger);
                         document.onmousemove = function(e) {
                              if (moveable) {
                                   var e = e || DOM.getEvent();
                                   document.all && (e.returnValue = !1);
                                   var movePos = DOM.getMousePos(e),
                                        _left = Math.max(Math.min(movePos.x - tmpX, options.maxLeft), options.minLeft),
                                        _top = Math.max(Math.min(movePos.y - tmpY, options.maxTop), options.minTop);
                                   if (options.percent) {
                                        var posDiv = options.target.offsetParent || options.target.parentNode,
                                             posW = posDiv.clientWidth || posDiv.offsetWidth,
                                             posH = posDiv.clientHeight || posDiv.offsetHeight;
                                        _left = _left / posW * 100 + "%";
                                        _top = _top / posH * 100 + "%"
                                   } else {
                                        _left += "px";
                                        _top += "px"
                                   }
                                   options.target.style.left = _left;
                                   options.target.style.top = _top
                              }
                              _this.trigger("moving", options.target, options.trigger)
                         };
                         document.onmouseup = function() {
                              _this.trigger("mouseup.before", options.target, options.trigger);
                              document.onmousemove = null;
                              document.onmouseup = null;
                              options.keepOrigin && options.target.setCapture && (originDragDiv.outerHTML = "");
                              if (moveable) {
                                   options.target.setCapture ? options.target.releaseCapture() : window.releaseEvents(Event.MOUSEMOVE);
                                   options.trigger.style.cursor = "default";
                                   moveable = !1;
                                   tmpX = 0;
                                   tmpY = 0
                              }
                              _this.trigger("mouseup.after", options.target, options.trigger);
                              _this.trigger("moved", options.target, options.trigger)
                         }
                    }
               }
          }
     }
     Mediator.installTo(Drag.prototype);
     return Drag
});
define("utils/popover", ["utils/base", "utils/dom", "utils/drag", "utils/mediator"], function(Base, DOM, Drag, Mediator) {
     function Popover(params) {
          function getUUID() {
               var str = Base.randomString(32) + (new Date).getTime();
               return Popover.uuid[str] ? getUUID() : str
          }
          var _this = this;
          params = params || {};
          var options = {
               target: "",
               id: "",
               type: "html",
               modal: !0,
               fixed: !1,
               style: "",
               zIndex: 1010,
               width: "auto",
               height: "auto",
               title: "",
               content: "",
               close: !0,
               ok: "",
               no: "",
               okFn: null,
               noFn: null,
               closeFn: null,
               data: null,
               success: null,
               failure: null,
               callback: null,
               isPosition: !0,
               otherClose: !1
          };
          options = Base.extend(options, params);
          Popover.uuid = Popover.uuid || [];
          var container = document.body || document.documentElement;
          if (container) {
               "string" == typeof options.trigger && (options.trigger = DOM.byId(options.trigger));
               if (options.trigger && 1 == options.trigger.nodeType) {
                    var clicked = DOM.attr("clicked");
                    if ("clicked" == clicked) return;
                    DOM.attr("clicked", "clicked")
               }
               if (!options.id || !Popover.uuid[options.id]) {
                    var UUID = options.id || getUUID();
                    Popover.uuid.push(UUID);
                    Popover.uuid[UUID] = _this;
                    var cw = options.width + (isNaN(options.width) ? "" : "px"),
                         ch = options.height + (isNaN(options.height) ? "" : "px"),
                         sTop = options.modal ? 0 : Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                         filter = null,
                         layer = null,
                         content = null,
                         panel = null,
                         iframe = null,
                         headline = null;
                    if (options.modal) {
                         filter = DOM.create("div", {
                              id: UUID + "_filter",
                              "class": "popup_filter popup_loading",
                              style: "z-index:" + options.zIndex
                         });
                         Base.IS.fixed || (filter.innerHTML = '<div class="popup_opacity"><iframe frameborder="0" scrolling="no"></iframe></div>');
                         container.appendChild(filter)
                    }
                    layer = DOM.create("div", {
                         id: UUID + "_layer",
                         "class": "popup_layer popup_hide" + (options.fixed ? " fixed" : "") + (options.style ? " " + options.style : ""),
                         style: "z-index:" + (options.zIndex + 10) + ";width:" + cw + ";height:" + ch + ";top:" + sTop + "px;"
                    });
                    Base.IS.fixed || (layer.innerHTML = '<div class="popup_opacity"><iframe frameborder="0" scrolling="no"></iframe></div>');
                    panel = DOM.create("div", {
                         id: UUID + "_panel",
                         "class": "popup_panel"
                    });
                    layer.appendChild(panel);
                    var btns = "" == options.ok ? "" : '<a id="' + UUID + '_ok" class="ok btn-primary" href="javascript:;">' + options.ok + "</a>";
                    btns += "" == options.no ? "" : '<a id="' + UUID + '_no" class="no btn-default" href="javascript:;">' + options.no + "</a>";
                    var btn = options.close ? '<a id="' + UUID + '_close" class="close" href="javascript:;" title="关闭"></a>' : "",
                         html = "" == options.title ? btn : '<div id="' + UUID + '_head" class="popup_head">' + btn + '<h3 id="' + UUID + '_headline">' + options.title + "</h3></div>",
                         ctt = "iframe" == options.type ? '<iframe id="' + UUID + '_iframe" src="" frameborder="0" allowtransparency="true" scrolling="auto"></iframe>' : "";
                    ctt = "html" == options.type ? options.content : ctt;
                    html += '<div id="' + UUID + '_main" class="popup_main">' + ctt + "</div>";
                    html += "" == btns ? "" : '<div id="' + UUID + '_foot" class="popup_foot">' + btns + "</div>";
                    panel.innerHTML = html;
                    container.appendChild(layer);
                    content = document.getElementById(UUID + "_main");
                    iframe = document.getElementById(UUID + "_iframe");
                    headline = document.getElementById(UUID + "_headline");
                    var closeBtn = document.getElementById(UUID + "_close"),
                         noBtn = document.getElementById(UUID + "_no"),
                         okBtn = document.getElementById(UUID + "_ok");
                    options.close && closeBtn && DOM.bind(closeBtn, "click", function(e) {
                         _this.trigger("close", _this) && _this.trigger("no", _this);
                         _this.remove()
                    });
                    "" != options.no && noBtn && DOM.bind(noBtn, "click", function(e) {
                         _this.trigger("no", _this) && _this.remove()
                    });
                    "" != options.ok && okBtn && DOM.bind(okBtn, "click", function(e) {
                         _this.trigger("ok", _this) && _this.remove()
                    });
                    options.otherClose && DOM.bind(filter, "click", function(e) {
                         e = e || event;
                         var target = e.target || e.srcElement;
                         if (DOM.hasClass(target, "popup_filter")) {
                              _this.remove();
                              _this.trigger("no", _this)
                         }
                    });
                    _this.remove = function() {
                         options.parentPopup && options.parentPopup.setPosition && options.parentPopup.setPosition();
                         DOM.unbind(document, "keydown", _this.keydown);
                         if (filter) {
                              container.removeChild(filter);
                              filter = null
                         }
                         if (layer) {
                              container.removeChild(layer);
                              layer = null
                         }
                         Popover.uuid[UUID] && delete Popover.uuid[UUID];
                         options.trigger && DOM.removeAttr(options.trigger, "clicked")
                    };
                    _this.hide = function() {
                         filter && DOM.addClass(filter, "popup_hide");
                         layer && DOM.addClass(layer, "popup_hide")
                    };
                    _this.show = function() {
                         options.parentPopup && options.parentPopup.hide && options.parentPopup.hide();
                         if (filter) {
                              DOM.removeClass(filter, "popup_hide");
                              DOM.removeClass(filter, "popup_loading")
                         }
                         layer && DOM.removeClass(layer, "popup_hide")
                    };
                    _this.setPosition = function() {
                         if (layer) {
                              if (options.isPosition) {
                                   var wh = DOM.getSize(),
                                        sp = DOM.getScrollPos();
                                   "function" == typeof options.setSize && options.setSize.call(_this, layer, panel, wh);
                                   var top = (wh.h - panel.offsetHeight) / 2,
                                        left = (wh.w - panel.offsetWidth) / 2;
                                   top = Math.max(0, top);
                                   top = Math.min(wh.h, top);
                                   var sTop = options.fixed ? 0 : sp.y,
                                        sLeft = options.fixed ? 0 : sp.x;
                                   layer.style.height = "auto";
                                   layer.style.top = sTop + top + "px";
                                   layer.style.left = sLeft + left + "px"
                              } else {
                                   layer.style.top = 0;
                                   layer.style.left = 0
                              }
                              "function" == typeof _this.show && _this.show()
                         }
                    };
                    _this.keydown = function(e) {
                         e = e || window.event;
                         var keycode = e.keyCode || e.which;
                         if (27 == keycode) {
                              _this.remove();
                              _this.trigger("close", _this) && _this.trigger("no", _this)
                         }
                    };
                    _this.setFocus = function() {
                         if (closeBtn) {
                              closeBtn.focus();
                              closeBtn.blur()
                         }
                         noBtn && noBtn.focus();
                         okBtn && okBtn.focus()
                    };
                    _this.loaded = function() {
                         "function" == typeof options.callback && options.callback.call(_this, _this, layer);
                         _this.setPosition();
                         _this.setFocus();
                         DOM.bind(window, "resize", _this.setPosition)
                    };
                    var _top = sTop - panel.offsetHeight;
                    layer.style.top = _top + "px";
                    if ("iframe" == options.type) {
                         if (iframe) {
                              var isFirst = !0,
                                   autoIframe = function() {
                                        var _height = .8 * document.documentElement.clientHeight,
                                             height = _height - (layer.offsetHeight - content.clientHeight),
                                             pageWidth = iframe.contentWindow.document.body.offsetWidth,
                                             pageHeight = iframe.contentWindow.document.body.offsetHeight,
                                             width = pageWidth + (pageHeight > height ? 17 : 0) + "px";
                                        iframe.style.width = width;
                                        iframe.style.height = height + "px";
                                        pageWidth = pageHeight > _height ? pageWidth + 15 : pageWidth;
                                        layer.style.width = width;
                                        null != options.callback && "function" == typeof options.callback && options.callback.call(_this, _this);
                                        isFirst && _this.loaded();
                                        isFirst = !1
                                   };
                              iframe.callback = autoIframe;
                              iframe.src = options.content
                         }
                    } else if ("object" == options.type) {
                         if (options.content && 1 == options.content.nodeType) {
                              content.appendChild(options.content);
                              _this.loaded();
                              if (options.content.offsetWidth) {
                                   layer.style.width = options.content.offsetWidth;
                                   _this.setPosition()
                              }
                         }
                    } else {
                         content.innerHTML = options.content;
                         _this.loaded()
                    }
                    _this.dom = layer;
                    new Drag({
                         trigger: headline,
                         target: layer,
                         keepOrigin: !1
                    });
                    DOM.bind(document, "keydown", _this.keydown)
               }
          }
     }
     Mediator.installTo(Popover.prototype);
     return function(options) {
          return new Popover(options)
     }
});
! function() {
     function a(a) {
          return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
     }

     function b(a) {
          return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
     }

     function c(c, d) {
          function e(a) {
               return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
          }

          function f(b) {
               var c = m;
               if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
                         return m++, "$line=" + m + ";"
                    })), 0 === b.indexOf("=")) {
                    var e = l && !/^=[=#]/.test(b);
                    if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                         var f = b.replace(/\s*\([^\)]+\)/, "");
                         n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                    } else b = "$string(" + b + ")";
                    b = s[1] + b + s[2]
               }
               return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
                    if (a && !p[a]) {
                         var b;
                         b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                    }
               }), b + "\n"
          }
          var g = d.debug,
               h = d.openTag,
               i = d.closeTag,
               j = d.parser,
               k = d.compress,
               l = d.escape,
               m = 1,
               p = {
                    $data: 1,
                    $filename: 1,
                    $utils: 1,
                    $helpers: 1,
                    $out: 1,
                    $line: 1
               },
               q = "".trim,
               s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
               t = q ? "$out+=text;return $out;" : "$out.push(text);",
               u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
               v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
               w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
               x = s[0],
               y = "return new String(" + s[3] + ");";
          r(c.split(h), function(a) {
               a = a.split(i);
               var b = a[0],
                    c = a[1];
               1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
          });
          var z = w + x + y;
          g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
          try {
               var A = new Function("$data", "$filename", z);
               return A.prototype = n, A
          } catch (B) {
               throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
          }
     }
     var d = function(a, b) {
          return "string" == typeof b ? q(b, {
               filename: a
          }) : g(a, b)
     };
     d.version = "3.0.0", d.config = function(a, b) {
          e[a] = b
     };
     var e = d.defaults = {
               openTag: "<%",
               closeTag: "%>",
               escape: !0,
               cache: !0,
               compress: !1,
               parser: null
          },
          f = d.cache = {};
     d.render = function(a, b) {
          return q(a, b)
     };
     var g = d.renderFile = function(a, b) {
          var c = d.get(a) || p({
               filename: a,
               name: "Render Error",
               message: "Template not found"
          });
          return b ? c(b) : c
     };
     d.get = function(a) {
          var b;
          if (f[a]) b = f[a];
          else if ("object" == typeof document) {
               var c = document.getElementById(a);
               if (c) {
                    var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                    b = q(d, {
                         filename: a
                    })
               }
          }
          return b
     };
     var h = function(a, b) {
               return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
          },
          i = {
               "<": "&#60;",
               ">": "&#62;",
               '"': "&#34;",
               "'": "&#39;",
               "&": "&#38;"
          },
          j = function(a) {
               return i[a]
          },
          k = function(a) {
               return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
          },
          l = Array.isArray || function(a) {
               return "[object Array]" === {}.toString.call(a)
          },
          m = function(a, b) {
               var c, d;
               if (l(a))
                    for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
               else
                    for (c in a) b.call(a, a[c], c)
          },
          n = d.utils = {
               $helpers: {},
               $include: g,
               $string: h,
               $escape: k,
               $each: m
          };
     d.helper = function(a, b) {
          o[a] = b
     };
     var o = d.helpers = n.$helpers;
     d.onerror = function(a) {
          var b = "Template Error\n\n";
          for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
          "object" == typeof console && void 0
     };
     var p = function(a) {
               return d.onerror(a),
                    function() {
                         return "{Template Error}"
                    }
          },
          q = d.compile = function(a, b) {
               function d(c) {
                    try {
                         return new i(c, h) + ""
                    } catch (d) {
                         return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
                    }
               }
               b = b || {};
               for (var g in e) void 0 === b[g] && (b[g] = e[g]);
               var h = b.filename;
               try {
                    var i = c(a, b)
               } catch (j) {
                    return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
               }
               return d.prototype = i.prototype, d.toString = function() {
                    return i.toString()
               }, h && b.cache && (f[h] = d), d
          },
          r = n.$each,
          s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
          t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
          u = /[^\w$]+/g,
          v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
          w = /^\d[^,]*|,\d[^,]*/g,
          x = /^,+|,+$/g,
          y = /^$|,+/;
     e.openTag = "{{", e.closeTag = "}}";
     var z = function(a, b) {
          var c = b.split(":"),
               d = c.shift(),
               e = c.join(":") || "";
          return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
     };
     e.parser = function(a) {
          a = a.replace(/^\s/, "");
          var b = a.split(" "),
               c = b.shift(),
               e = b.join(" ");
          switch (c) {
               case "if":
                    a = "if(" + e + "){";
                    break;
               case "else":
                    b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
                    break;
               case "/if":
                    a = "}";
                    break;
               case "each":
                    var f = b[0] || "$data",
                         g = b[1] || "as",
                         h = b[2] || "$value",
                         i = b[3] || "$index",
                         j = h + "," + i;
                    "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
                    break;
               case "/each":
                    a = "});";
                    break;
               case "echo":
                    a = "print(" + e + ");";
                    break;
               case "print":
               case "include":
                    a = c + "(" + b.join(",") + ");";
                    break;
               default:
                    if (/^\s*\|\s*[\w\$]/.test(e)) {
                         var k = !0;
                         0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                         for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
                         a = (k ? "=" : "=#") + o
                    } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
          }
          return a
     }, "function" == typeof define ? define("libs/template", [], function() {
          return d
     }) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();
! function() {
     function a(a) {
          return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
     }

     function b(a) {
          return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
     }

     function c(c, d) {
          function e(a) {
               return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
          }

          function f(b) {
               var c = m;
               if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
                         return m++, "$line=" + m + ";"
                    })), 0 === b.indexOf("=")) {
                    var e = l && !/^=[=#]/.test(b);
                    if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                         var f = b.replace(/\s*\([^\)]+\)/, "");
                         n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                    } else b = "$string(" + b + ")";
                    b = s[1] + b + s[2]
               }
               return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
                    if (a && !p[a]) {
                         var b;
                         b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                    }
               }), b + "\n"
          }
          var g = d.debug,
               h = d.openTag,
               i = d.closeTag,
               j = d.parser,
               k = d.compress,
               l = d.escape,
               m = 1,
               p = {
                    $data: 1,
                    $filename: 1,
                    $utils: 1,
                    $helpers: 1,
                    $out: 1,
                    $line: 1
               },
               q = "".trim,
               s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
               t = q ? "$out+=text;return $out;" : "$out.push(text);",
               u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
               v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
               w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
               x = s[0],
               y = "return new String(" + s[3] + ");";
          r(c.split(h), function(a) {
               a = a.split(i);
               var b = a[0],
                    c = a[1];
               1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
          });
          var z = w + x + y;
          g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
          try {
               var A = new Function("$data", "$filename", z);
               return A.prototype = n, A
          } catch (B) {
               throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
          }
     }
     var d = function(a, b) {
          return "string" == typeof b ? q(b, {
               filename: a
          }) : g(a, b)
     };
     d.version = "3.0.0", d.config = function(a, b) {
          e[a] = b
     };
     var e = d.defaults = {
               openTag: "<%",
               closeTag: "%>",
               escape: !0,
               cache: !0,
               compress: !1,
               parser: null
          },
          f = d.cache = {};
     d.render = function(a, b) {
          return q(a, b)
     };
     var g = d.renderFile = function(a, b) {
          var c = d.get(a) || p({
               filename: a,
               name: "Render Error",
               message: "Template not found"
          });
          return b ? c(b) : c
     };
     d.get = function(a) {
          var b;
          if (f[a]) b = f[a];
          else if ("object" == typeof document) {
               var c = document.getElementById(a);
               if (c) {
                    var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                    b = q(d, {
                         filename: a
                    })
               }
          }
          return b
     };
     var h = function(a, b) {
               return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
          },
          i = {
               "<": "&#60;",
               ">": "&#62;",
               '"': "&#34;",
               "'": "&#39;",
               "&": "&#38;"
          },
          j = function(a) {
               return i[a]
          },
          k = function(a) {
               return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
          },
          l = Array.isArray || function(a) {
               return "[object Array]" === {}.toString.call(a)
          },
          m = function(a, b) {
               var c, d;
               if (l(a))
                    for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
               else
                    for (c in a) b.call(a, a[c], c)
          },
          n = d.utils = {
               $helpers: {},
               $include: g,
               $string: h,
               $escape: k,
               $each: m
          };
     d.helper = function(a, b) {
          o[a] = b
     };
     var o = d.helpers = n.$helpers;
     d.onerror = function(a) {
          var b = "Template Error\n\n";
          for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
          "object" == typeof console && void 0
     };
     var p = function(a) {
               return d.onerror(a),
                    function() {
                         return "{Template Error}"
                    }
          },
          q = d.compile = function(a, b) {
               function d(c) {
                    try {
                         return new i(c, h) + ""
                    } catch (d) {
                         return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
                    }
               }
               b = b || {};
               for (var g in e) void 0 === b[g] && (b[g] = e[g]);
               var h = b.filename;
               try {
                    var i = c(a, b)
               } catch (j) {
                    return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
               }
               return d.prototype = i.prototype, d.toString = function() {
                    return i.toString()
               }, h && b.cache && (f[h] = d), d
          },
          r = n.$each,
          s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
          t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
          u = /[^\w$]+/g,
          v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
          w = /^\d[^,]*|,\d[^,]*/g,
          x = /^,+|,+$/g,
          y = /^$|,+/;
     "function" == typeof define ? define("libs/template-native", [], function() {
          return d
     }) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();
define("utils/compiler", ["utils/base", "utils/dom", "libs/template", "libs/template-native"], function(Base, DOM, Template, TemplateNative) {
     return {
          template: Template,
          templateNative: TemplateNative,
          bindData: function(k, data) {
               var _this = this;
               k = k ? k + "-" : "";
               Base.each(data, function(key, value) {
                    if (Base.type(value, /^array|Object$/)) _this.bindData(k + key, value);
                    else {
                         var obj = DOM.byId(k + key);
                         if (obj) {
                              var tn = ("" + obj.tagName).toLowerCase();
                              value = "undefined" == typeof value ? "" : value;
                              value = /price/i.test(key) ? T.RMB(value) : value;
                              if (/input|textarea/.test(tn)) obj.value = value;
                              else if (/img/.test(tn)) obj.src = value;
                              else if (/select/.test(tn)) {
                                   obj.src = value;
                                   for (var options = obj.options, o = 0; o < options.length; o++) options[o].value.Trim() == value && (options[o].selected = !0)
                              } else obj.innerHTML = value
                         }
                    }
               })
          }
     }
});
define("utils/storage", ["utils/base", "utils/cookie"], function(Base, Cookie) {
     function Storage(opts) {
          opts = opts || {};
          opts.key = opts.key || "ininin_storage";
          var hasLocalStorage = window.localStorage && window.localStorage.setItem;
          return {
               add: function(value) {
                    var _this = this,
                         ret = _this.get();
                    if (!_this.has(value)) {
                         ret += (ret ? "|" : "") + value;
                         _this.set(ret)
                    }
                    return ret
               },
               get: function() {
                    var ret = "";
                    ret = hasLocalStorage ? localStorage.getItem(opts.key) || "" : Cookie.get(opts.key) || "";
                    return ret
               },
               set: function(values) {
                    hasLocalStorage ? localStorage.setItem(opts.key, values) : Cookie.set(opts.key, values, {
                         expires: 36500,
                         path: "/",
                         domain: Base._DOMAIN
                    });
                    return values
               },
               remove: function(value) {
                    for (var _this = this, ret = _this.get(), parts = ret.split("|"), data = [], i = 0; i < parts.length; i++) parts[i] != value && data.push(parts[i]);
                    ret = data.join("|");
                    _this.set(ret);
                    return ret
               },
               has: function(value) {
                    for (var _this = this, ret = _this.get(), parts = ret.split("|"), bool = !1, i = 0; i < parts.length; i++) parts[i] == value && (bool = !0);
                    return bool
               }
          }
     }
     return function(options) {
          return new Storage(options)
     }
});
QR8bitByte.prototype = {
     getLength: function(a) {
          return this.data.length
     },
     write: function(a) {
          for (var c = 0; c < this.data.length; c++) a.put(this.data.charCodeAt(c), 8)
     }
};
QRCode.prototype = {
     addData: function(a) {
          a = new QR8bitByte(a);
          this.dataList.push(a);
          this.dataCache = null
     },
     isDark: function(a, c) {
          if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c) throw Error(a + "," + c);
          return this.modules[a][c]
     },
     getModuleCount: function() {
          return this.moduleCount
     },
     make: function() {
          if (1 > this.typeNumber) {
               for (var a = 1, a = 1; 40 > a; a++) {
                    for (var c = QRRSBlock.getRSBlocks(a, this.errorCorrectLevel), d = new QRBitBuffer, b = 0, e = 0; e < c.length; e++) b += c[e].dataCount;
                    for (e = 0; e < this.dataList.length; e++) c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), QRUtil.getLengthInBits(c.mode, a)), c.write(d);
                    if (d.getLengthInBits() <= 8 * b) break
               }
               this.typeNumber = a
          }
          this.makeImpl(!1, this.getBestMaskPattern())
     },
     makeImpl: function(a, c) {
          this.moduleCount = 4 * this.typeNumber + 17;
          this.modules = Array(this.moduleCount);
          for (var d = 0; d < this.moduleCount; d++) {
               this.modules[d] = Array(this.moduleCount);
               for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null
          }
          this.setupPositionProbePattern(0, 0);
          this.setupPositionProbePattern(this.moduleCount - 7, 0);
          this.setupPositionProbePattern(0, this.moduleCount - 7);
          this.setupPositionAdjustPattern();
          this.setupTimingPattern();
          this.setupTypeInfo(a, c);
          7 <= this.typeNumber && this.setupTypeNumber(a);
          null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
          this.mapData(this.dataCache, c)
     },
     setupPositionProbePattern: function(a, c) {
          for (var d = -1; 7 >= d; d++)
               if (!(-1 >= a + d || this.moduleCount <= a + d))
                    for (var b = -1; 7 >= b; b++) - 1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] = d >= 0 && 6 >= d && (0 == b || 6 == b) || b >= 0 && 6 >= b && (0 == d || 6 == d) || d >= 2 && 4 >= d && b >= 2 && 4 >= b ? !0 : !1)
     },
     getBestMaskPattern: function() {
          for (var a = 0, c = 0, d = 0; 8 > d; d++) {
               this.makeImpl(!0, d);
               var b = QRUtil.getLostPoint(this);
               (0 == d || a > b) && (a = b, c = d)
          }
          return c
     },
     createMovieClip: function(a, c, d) {
          a = a.createEmptyMovieClip(c, d);
          this.make();
          for (c = 0; c < this.modules.length; c++) {
               d = 1 * c;
               for (var b = 0; b < this.modules[c].length; b++) {
                    var e = 1 * b;
                    this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
               }
          }
          return a
     },
     setupTimingPattern: function() {
          for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
          for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
     },
     setupPositionAdjustPattern: function() {
          for (var a = QRUtil.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++)
               for (var d = 0; d < a.length; d++) {
                    var b = a[c],
                         e = a[d];
                    if (null == this.modules[b][e])
                         for (var f = -2; 2 >= f; f++)
                              for (var k = -2; 2 >= k; k++) this.modules[b + f][e + k] = -2 == f || 2 == f || -2 == k || 2 == k || 0 == f && 0 == k ? !0 : !1
               }
     },
     setupTypeNumber: function(a) {
          for (var c = QRUtil.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
               var b = !a && 1 == (c >> d & 1);
               this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
          }
          for (d = 0; 18 > d; d++) b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
     },
     setupTypeInfo: function(a, c) {
          for (var d = QRUtil.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
               var e = !a && 1 == (d >> b & 1);
               6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
          }
          for (b = 0; 15 > b; b++) e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount - b - 1] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e;
          this.modules[this.moduleCount - 8][8] = !a
     },
     mapData: function(a, c) {
          for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, k = this.moduleCount - 1; k > 0; k -= 2)
               for (6 == k && k--;;) {
                    for (var g = 0; 2 > g; g++)
                         if (null == this.modules[b][k - g]) {
                              var l = !1;
                              f < a.length && (l = 1 == (a[f] >>> e & 1));
                              QRUtil.getMask(c, b, k - g) && (l = !l);
                              this.modules[b][k - g] = l;
                              e--; - 1 == e && (f++, e = 7)
                         }
                    b += d;
                    if (0 > b || this.moduleCount <= b) {
                         b -= d;
                         d = -d;
                         break
                    }
               }
     }
};
QRCode.PAD0 = 236;
QRCode.PAD1 = 17;
QRCode.createData = function(a, c, d) {
     c = QRRSBlock.getRSBlocks(a, c);
     for (var b = new QRBitBuffer, e = 0; e < d.length; e++) {
          var f = d[e];
          b.put(f.mode, 4);
          b.put(f.getLength(), QRUtil.getLengthInBits(f.mode, a));
          f.write(b)
     }
     for (e = a = 0; e < c.length; e++) a += c[e].dataCount;
     if (b.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
     for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;) b.putBit(!1);
     for (; !(b.getLengthInBits() >= 8 * a);) {
          b.put(QRCode.PAD0, 8);
          if (b.getLengthInBits() >= 8 * a) break;
          b.put(QRCode.PAD1, 8)
     }
     return QRCode.createBytes(b, c)
};
QRCode.createBytes = function(a, c) {
     for (var d = 0, b = 0, e = 0, f = Array(c.length), k = Array(c.length), g = 0; g < c.length; g++) {
          var l = c[g].dataCount,
               m = c[g].totalCount - l,
               b = Math.max(b, l),
               e = Math.max(e, m);
          f[g] = Array(l);
          for (var h = 0; h < f[g].length; h++) f[g][h] = 255 & a.buffer[h + d];
          d += l;
          h = QRUtil.getErrorCorrectPolynomial(m);
          l = new QRPolynomial(f[g], h.getLength() - 1).mod(h);
          k[g] = Array(h.getLength() - 1);
          for (h = 0; h < k[g].length; h++) m = h + l.getLength() - k[g].length, k[g][h] = m >= 0 ? l.get(m) : 0
     }
     for (h = g = 0; h < c.length; h++) g += c[h].totalCount;
     d = Array(g);
     for (h = l = 0; b > h; h++)
          for (g = 0; g < c.length; g++) h < f[g].length && (d[l++] = f[g][h]);
     for (h = 0; e > h; h++)
          for (g = 0; g < c.length; g++) h < k[g].length && (d[l++] = k[g][h]);
     return d
};
for (var QRMode = {
          MODE_NUMBER: 1,
          MODE_ALPHA_NUM: 2,
          MODE_8BIT_BYTE: 4,
          MODE_KANJI: 8
     }, QRErrorCorrectLevel = {
          L: 1,
          M: 0,
          Q: 3,
          H: 2
     }, QRMaskPattern = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
     }, QRUtil = {
          PATTERN_POSITION_TABLE: [
               [],
               [6, 18],
               [6, 22],
               [6, 26],
               [6, 30],
               [6, 34],
               [6, 22, 38],
               [6, 24, 42],
               [6, 26, 46],
               [6, 28, 50],
               [6, 30, 54],
               [6, 32, 58],
               [6, 34, 62],
               [6, 26, 46, 66],
               [6, 26, 48, 70],
               [6, 26, 50, 74],
               [6, 30, 54, 78],
               [6, 30, 56, 82],
               [6, 30, 58, 86],
               [6, 34, 62, 90],
               [6, 28, 50, 72, 94],
               [6, 26, 50, 74, 98],
               [6, 30, 54, 78, 102],
               [6, 28, 54, 80, 106],
               [6, 32, 58, 84, 110],
               [6, 30, 58, 86, 114],
               [6, 34, 62, 90, 118],
               [6, 26, 50, 74, 98, 122],
               [6, 30, 54, 78, 102, 126],
               [6, 26, 52, 78, 104, 130],
               [6, 30, 56, 82, 108, 134],
               [6, 34, 60, 86, 112, 138],
               [6, 30, 58, 86, 114, 142],
               [6, 34, 62, 90, 118, 146],
               [6, 30, 54, 78, 102, 126, 150],
               [6, 24, 50, 76, 102, 128, 154],
               [6, 28, 54, 80, 106, 132, 158],
               [6, 32, 58, 84, 110, 136, 162],
               [6, 26, 54, 82, 110, 138, 166],
               [6, 30, 58, 86, 114, 142, 170]
          ],
          G15: 1335,
          G18: 7973,
          G15_MASK: 21522,
          getBCHTypeInfo: function(a) {
               for (var c = a << 10; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);) c ^= QRUtil.G15 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);
               return (a << 10 | c) ^ QRUtil.G15_MASK
          },
          getBCHTypeNumber: function(a) {
               for (var c = a << 12; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);) c ^= QRUtil.G18 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);
               return a << 12 | c
          },
          getBCHDigit: function(a) {
               for (var c = 0; 0 != a;) c++, a >>>= 1;
               return c
          },
          getPatternPosition: function(a) {
               return QRUtil.PATTERN_POSITION_TABLE[a - 1]
          },
          getMask: function(a, c, d) {
               switch (a) {
                    case QRMaskPattern.PATTERN000:
                         return 0 == (c + d) % 2;
                    case QRMaskPattern.PATTERN001:
                         return 0 == c % 2;
                    case QRMaskPattern.PATTERN010:
                         return 0 == d % 3;
                    case QRMaskPattern.PATTERN011:
                         return 0 == (c + d) % 3;
                    case QRMaskPattern.PATTERN100:
                         return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                    case QRMaskPattern.PATTERN101:
                         return 0 == c * d % 2 + c * d % 3;
                    case QRMaskPattern.PATTERN110:
                         return 0 == (c * d % 2 + c * d % 3) % 2;
                    case QRMaskPattern.PATTERN111:
                         return 0 == (c * d % 3 + (c + d) % 2) % 2;
                    default:
                         throw Error("bad maskPattern:" + a)
               }
          },
          getErrorCorrectPolynomial: function(a) {
               for (var c = new QRPolynomial([1], 0), d = 0; a > d; d++) c = c.multiply(new QRPolynomial([1, QRMath.gexp(d)], 0));
               return c
          },
          getLengthInBits: function(a, c) {
               if (c >= 1 && 10 > c) switch (a) {
                    case QRMode.MODE_NUMBER:
                         return 10;
                    case QRMode.MODE_ALPHA_NUM:
                         return 9;
                    case QRMode.MODE_8BIT_BYTE:
                         return 8;
                    case QRMode.MODE_KANJI:
                         return 8;
                    default:
                         throw Error("mode:" + a)
               } else if (27 > c) switch (a) {
                    case QRMode.MODE_NUMBER:
                         return 12;
                    case QRMode.MODE_ALPHA_NUM:
                         return 11;
                    case QRMode.MODE_8BIT_BYTE:
                         return 16;
                    case QRMode.MODE_KANJI:
                         return 10;
                    default:
                         throw Error("mode:" + a)
               } else {
                    if (!(41 > c)) throw Error("type:" + c);
                    switch (a) {
                         case QRMode.MODE_NUMBER:
                              return 14;
                         case QRMode.MODE_ALPHA_NUM:
                              return 13;
                         case QRMode.MODE_8BIT_BYTE:
                              return 16;
                         case QRMode.MODE_KANJI:
                              return 12;
                         default:
                              throw Error("mode:" + a)
                    }
               }
          },
          getLostPoint: function(a) {
               for (var c = a.getModuleCount(), d = 0, b = 0; c > b; b++)
                    for (var e = 0; c > e; e++) {
                         for (var f = 0, k = a.isDark(b, e), g = -1; 1 >= g; g++)
                              if (!(0 > b + g || b + g >= c))
                                   for (var l = -1; 1 >= l; l++) 0 > e + l || e + l >= c || 0 == g && 0 == l || k != a.isDark(b + g, e + l) || f++;
                         f > 5 && (d += 3 + f - 5)
                    }
               for (b = 0; c - 1 > b; b++)
                    for (e = 0; c - 1 > e; e++)(f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) && (d += 3);
               for (b = 0; c > b; b++)
                    for (e = 0; c - 6 > e; e++) a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e + 2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40);
               for (e = 0; c > e; e++)
                    for (b = 0; c - 6 > b; b++) a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40);
               for (e = f = 0; c > e; e++)
                    for (b = 0; c > b; b++) a.isDark(b, e) && f++;
               a = Math.abs(100 * f / c / c - 50) / 5;
               return d + 10 * a
          }
     }, QRMath = {
          glog: function(a) {
               if (1 > a) throw Error("glog(" + a + ")");
               return QRMath.LOG_TABLE[a]
          },
          gexp: function(a) {
               for (; 0 > a;) a += 255;
               for (; a >= 256;) a -= 255;
               return QRMath.EXP_TABLE[a]
          },
          EXP_TABLE: Array(256),
          LOG_TABLE: Array(256)
     }, i = 0; 8 > i; i++) QRMath.EXP_TABLE[i] = 1 << i;
for (i = 8; 256 > i; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
for (i = 0; 255 > i; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
QRPolynomial.prototype = {
     get: function(a) {
          return this.num[a]
     },
     getLength: function() {
          return this.num.length
     },
     multiply: function(a) {
          for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++)
               for (var b = 0; b < a.getLength(); b++) c[d + b] ^= QRMath.gexp(QRMath.glog(this.get(d)) + QRMath.glog(a.get(b)));
          return new QRPolynomial(c, 0)
     },
     mod: function(a) {
          if (0 > this.getLength() - a.getLength()) return this;
          for (var c = QRMath.glog(this.get(0)) - QRMath.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
          for (b = 0; b < a.getLength(); b++) d[b] ^= QRMath.gexp(QRMath.glog(a.get(b)) + c);
          return new QRPolynomial(d, 0).mod(a)
     }
};
QRRSBlock.RS_BLOCK_TABLE = [
     [1, 26, 19],
     [1, 26, 16],
     [1, 26, 13],
     [1, 26, 9],
     [1, 44, 34],
     [1, 44, 28],
     [1, 44, 22],
     [1, 44, 16],
     [1, 70, 55],
     [1, 70, 44],
     [2, 35, 17],
     [2, 35, 13],
     [1, 100, 80],
     [2, 50, 32],
     [2, 50, 24],
     [4, 25, 9],
     [1, 134, 108],
     [2, 67, 43],
     [2, 33, 15, 2, 34, 16],
     [2, 33, 11, 2, 34, 12],
     [2, 86, 68],
     [4, 43, 27],
     [4, 43, 19],
     [4, 43, 15],
     [2, 98, 78],
     [4, 49, 31],
     [2, 32, 14, 4, 33, 15],
     [4, 39, 13, 1, 40, 14],
     [2, 121, 97],
     [2, 60, 38, 2, 61, 39],
     [4, 40, 18, 2, 41, 19],
     [4, 40, 14, 2, 41, 15],
     [2, 146, 116],
     [3, 58, 36, 2, 59, 37],
     [4, 36, 16, 4, 37, 17],
     [4, 36, 12, 4, 37, 13],
     [2, 86, 68, 2, 87, 69],
     [4, 69, 43, 1, 70, 44],
     [6, 43, 19, 2, 44, 20],
     [6, 43, 15, 2, 44, 16],
     [4, 101, 81],
     [1, 80, 50, 4, 81, 51],
     [4, 50, 22, 4, 51, 23],
     [3, 36, 12, 8, 37, 13],
     [2, 116, 92, 2, 117, 93],
     [6, 58, 36, 2, 59, 37],
     [4, 46, 20, 6, 47, 21],
     [7, 42, 14, 4, 43, 15],
     [4, 133, 107],
     [8, 59, 37, 1, 60, 38],
     [8, 44, 20, 4, 45, 21],
     [12, 33, 11, 4, 34, 12],
     [3, 145, 115, 1, 146, 116],
     [4, 64, 40, 5, 65, 41],
     [11, 36, 16, 5, 37, 17],
     [11, 36, 12, 5, 37, 13],
     [5, 109, 87, 1, 110, 88],
     [5, 65, 41, 5, 66, 42],
     [5, 54, 24, 7, 55, 25],
     [11, 36, 12],
     [5, 122, 98, 1, 123, 99],
     [7, 73, 45, 3, 74, 46],
     [15, 43, 19, 2, 44, 20],
     [3, 45, 15, 13, 46, 16],
     [1, 135, 107, 5, 136, 108],
     [10, 74, 46, 1, 75, 47],
     [1, 50, 22, 15, 51, 23],
     [2, 42, 14, 17, 43, 15],
     [5, 150, 120, 1, 151, 121],
     [9, 69, 43, 4, 70, 44],
     [17, 50, 22, 1, 51, 23],
     [2, 42, 14, 19, 43, 15],
     [3, 141, 113, 4, 142, 114],
     [3, 70, 44, 11, 71, 45],
     [17, 47, 21, 4, 48, 22],
     [9, 39, 13, 16, 40, 14],
     [3, 135, 107, 5, 136, 108],
     [3, 67, 41, 13, 68, 42],
     [15, 54, 24, 5, 55, 25],
     [15, 43, 15, 10, 44, 16],
     [4, 144, 116, 4, 145, 117],
     [17, 68, 42],
     [17, 50, 22, 6, 51, 23],
     [19, 46, 16, 6, 47, 17],
     [2, 139, 111, 7, 140, 112],
     [17, 74, 46],
     [7, 54, 24, 16, 55, 25],
     [34, 37, 13],
     [4, 151, 121, 5, 152, 122],
     [4, 75, 47, 14, 76, 48],
     [11, 54, 24, 14, 55, 25],
     [16, 45, 15, 14, 46, 16],
     [6, 147, 117, 4, 148, 118],
     [6, 73, 45, 14, 74, 46],
     [11, 54, 24, 16, 55, 25],
     [30, 46, 16, 2, 47, 17],
     [8, 132, 106, 4, 133, 107],
     [8, 75, 47, 13, 76, 48],
     [7, 54, 24, 22, 55, 25],
     [22, 45, 15, 13, 46, 16],
     [10, 142, 114, 2, 143, 115],
     [19, 74, 46, 4, 75, 47],
     [28, 50, 22, 6, 51, 23],
     [33, 46, 16, 4, 47, 17],
     [8, 152, 122, 4, 153, 123],
     [22, 73, 45, 3, 74, 46],
     [8, 53, 23, 26, 54, 24],
     [12, 45, 15, 28, 46, 16],
     [3, 147, 117, 10, 148, 118],
     [3, 73, 45, 23, 74, 46],
     [4, 54, 24, 31, 55, 25],
     [11, 45, 15, 31, 46, 16],
     [7, 146, 116, 7, 147, 117],
     [21, 73, 45, 7, 74, 46],
     [1, 53, 23, 37, 54, 24],
     [19, 45, 15, 26, 46, 16],
     [5, 145, 115, 10, 146, 116],
     [19, 75, 47, 10, 76, 48],
     [15, 54, 24, 25, 55, 25],
     [23, 45, 15, 25, 46, 16],
     [13, 145, 115, 3, 146, 116],
     [2, 74, 46, 29, 75, 47],
     [42, 54, 24, 1, 55, 25],
     [23, 45, 15, 28, 46, 16],
     [17, 145, 115],
     [10, 74, 46, 23, 75, 47],
     [10, 54, 24, 35, 55, 25],
     [19, 45, 15, 35, 46, 16],
     [17, 145, 115, 1, 146, 116],
     [14, 74, 46, 21, 75, 47],
     [29, 54, 24, 19, 55, 25],
     [11, 45, 15, 46, 46, 16],
     [13, 145, 115, 6, 146, 116],
     [14, 74, 46, 23, 75, 47],
     [44, 54, 24, 7, 55, 25],
     [59, 46, 16, 1, 47, 17],
     [12, 151, 121, 7, 152, 122],
     [12, 75, 47, 26, 76, 48],
     [39, 54, 24, 14, 55, 25],
     [22, 45, 15, 41, 46, 16],
     [6, 151, 121, 14, 152, 122],
     [6, 75, 47, 34, 76, 48],
     [46, 54, 24, 10, 55, 25],
     [2, 45, 15, 64, 46, 16],
     [17, 152, 122, 4, 153, 123],
     [29, 74, 46, 14, 75, 47],
     [49, 54, 24, 10, 55, 25],
     [24, 45, 15, 46, 46, 16],
     [4, 152, 122, 18, 153, 123],
     [13, 74, 46, 32, 75, 47],
     [48, 54, 24, 14, 55, 25],
     [42, 45, 15, 32, 46, 16],
     [20, 147, 117, 4, 148, 118],
     [40, 75, 47, 7, 76, 48],
     [43, 54, 24, 22, 55, 25],
     [10, 45, 15, 67, 46, 16],
     [19, 148, 118, 6, 149, 119],
     [18, 75, 47, 31, 76, 48],
     [34, 54, 24, 34, 55, 25],
     [20, 45, 15, 61, 46, 16]
];
QRRSBlock.getRSBlocks = function(a, c) {
     var d = QRRSBlock.getRsBlockTable(a, c);
     if (void 0 == d) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
     for (var b = d.length / 3, e = [], f = 0; b > f; f++)
          for (var k = d[3 * f + 0], g = d[3 * f + 1], l = d[3 * f + 2], m = 0; k > m; m++) e.push(new QRRSBlock(g, l));
     return e
};
QRRSBlock.getRsBlockTable = function(a, c) {
     switch (c) {
          case QRErrorCorrectLevel.L:
               return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 0];
          case QRErrorCorrectLevel.M:
               return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 1];
          case QRErrorCorrectLevel.Q:
               return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 2];
          case QRErrorCorrectLevel.H:
               return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 3]
     }
};
QRBitBuffer.prototype = {
     get: function(a) {
          return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
     },
     put: function(a, c) {
          for (var d = 0; c > d; d++) this.putBit(1 == (a >>> c - d - 1 & 1))
     },
     getLengthInBits: function() {
          return this.length
     },
     putBit: function(a) {
          var c = Math.floor(this.length / 8);
          this.buffer.length <= c && this.buffer.push(0);
          a && (this.buffer[c] |= 128 >>> this.length % 8);
          this.length++
     }
};
define("qrcode", function(global) {
     return function() {
          var ret;
          return ret || global.QRCode
     }
}(this));
! function(f) {
     f.fn.qrcode = function(a) {
          "string" == typeof a && (a = {
               text: a
          });
          a = f.extend({}, {
               render: "canvas",
               width: 256,
               height: 256,
               typeNumber: -1,
               correctLevel: QRErrorCorrectLevel.H,
               background: "#ffffff",
               foreground: "#000000"
          }, a);
          return this.each(function() {
               var b;
               if ("canvas" == a.render) {
                    b = new QRCode(a.typeNumber, a.correctLevel);
                    b.addData(a.text);
                    b.make();
                    var g = document.createElement("canvas");
                    g.width = a.width;
                    g.height = a.height;
                    for (var k = g.getContext("2d"), e = a.width / b.getModuleCount(), h = a.height / b.getModuleCount(), d = 0; d < b.getModuleCount(); d++)
                         for (var c = 0; c < b.getModuleCount(); c++) {
                              k.fillStyle = b.isDark(d, c) ? a.foreground : a.background;
                              var l = Math.ceil((c + 1) * e) - Math.floor(c * e),
                                   m = Math.ceil((d + 1) * e) - Math.floor(d * e);
                              k.fillRect(Math.round(c * e), Math.round(d * h), l, m)
                         }
               } else
                    for (b = new QRCode(a.typeNumber, a.correctLevel), b.addData(a.text), b.make(), g = f("<table></table>").css("width", a.width + "px").css("height", a.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", a.background), k = a.width / b.getModuleCount(), e = a.height / b.getModuleCount(), h = 0; h < b.getModuleCount(); h++)
                         for (d = f("<tr></tr>").css("height", e + "px").appendTo(g), c = 0; c < b.getModuleCount(); c++) f("<td></td>").css("width", k + "px").css("background-color", b.isDark(h, c) ? a.foreground : a.background).appendTo(d);
               b = g;
               f(b).appendTo(this)
          })
     }
}(jQuery);
define("jquery/qrcode", ["base", "qrcode"], function() {});
define("utils", ["utils/base", "libs/md5", "libs/base64", "utils/mediator", "utils/transfer", "utils/format", "utils/date", "utils/array", "utils/number", "utils/json", "utils/cookie", "utils/dom", "utils/drag", "utils/popover", "utils/compiler", "utils/storage", "jquery/qrcode"], function(Base) {
     var args = Base._SLICE.call(arguments, 1),
          Utils = Base.extend(Base, {
               MD5: args.shift(),
               Base64: args.shift(),
               Mediator: args.shift(),
               Transfer: args.shift(),
               Format: args.shift(),
               Date: args.shift(),
               Array: args.shift(),
               Number: args.shift(),
               JSON: args.shift(),
               Cookie: args.shift(),
               DOM: args.shift(),
               Drag: args.shift(),
               Popover: args.shift(),
               Compiler: args.shift(),
               Storage: args.shift()
          });
     Utils.Base64.raw = !1;
     Utils.Base64.utf8decode = !0;
     Utils.toDBC = Utils.Transfer.toDBC;
     Utils.toSBC = Utils.Transfer.toSBC;
     Utils.getQueryString = function(name) {
          return Utils.Transfer.decodeHashString(location.search.replace(/^\?+/, ""))[name];
     };
     Utils.getRequest = function(str, sign, flag) {
          str = (str || location.search).replace(/^\?|\#+/, "");
          return Utils.Transfer.decodeHashString(str, sign, flag)
     };
     Utils.alt = window.alert = function(text, okFn, noFn, ok) {
          noFn || (noFn = okFn);
          var popover = new Utils.Popover({
               fixed: !0,
               id: "popup_alert",
               zIndex: 2e3,
               width: 480,
               modal: !0,
               title: "温馨提示",
               content: '<dl class="popbox vertical_middle"><dt class="vm_left"></dt><dd class="vm_right">' + text + "</dd></dl>",
               ok: ok || ("" === ok ? "" : "确  定")
          });
          popover.on("ok", okFn || function(_this) {
               _this.remove()
          });
          popover.on("no", noFn);
          return popover
     };
     Utils.suc = function(obj, okFn, noFn, closeFn) {
          var text = obj,
               title = "确 认",
               ok = "确 定",
               no = "取 消";
          if ("Object" === Utils.type(obj)) {
               text = obj.text || "";
               title = obj.title || title;
               ok = obj.ok || ok;
               no = obj.no || no
          }
          var popover = new Utils.Popover({
               fixed: !0,
               id: "popup_success",
               zIndex: 1800,
               title: title,
               width: 480,
               content: '<dl class="popbox vertical_middle suc"><dt class="vm_left "></dt><dd class="vm_right">' + text + "</dd></dl>",
               ok: ok,
               no: no
          });
          popover.on("ok", okFn);
          popover.on("no", noFn);
          popover.on("close", closeFn || noFn);
          return popover
     };
     Utils.cfm = window.confirm = function(obj, okFn, noFn, title, ok, no) {
          var text = obj,
               title = title || "确 认",
               ok = ok || "确 定",
               no = no || "取 消";
          if ("Object" === Utils.type(obj)) {
               text = obj.text || "";
               title = obj.title || title;
               ok = obj.ok || ok;
               no = obj.no || no
          }
          var popover = new Utils.Popover({
               fixed: !0,
               id: "popup_confirm",
               zIndex: 1800,
               title: title,
               width: 480,
               content: '<dl class="popbox vertical_middle"><dt class="vm_left"></dt><dd class="vm_right">' + text + "</dd></dl>",
               ok: ok,
               no: no
          });
          popover.on("ok", okFn || function(_this) {
               _this.remove()
          });
          popover.on("no", noFn);
          return popover
     };
     Utils.dailog = function(obj, title, okFn, noFn, id) {
          var popover = new Utils.Popover({
               fixed: !0,
               id: id,
               zIndex: 1e3,
               title: title,
               type: "object",
               content: obj
          });
          popover.on("ok", okFn || function(_this) {
               _this.remove()
          });
          popover.on("no", noFn);
          return popover
     };
     Utils.LookImages = function(obj, id, width, setSize) {
          var popover = new Utils.Popover({
               fixed: !0,
               style: "popup_images",
               id: id,
               zIndex: 1200,
               title: "",
               type: "string" == typeof obj ? "html" : "object",
               width: width || 750,
               content: obj,
               otherClose: !0,
               setSize: setSize || null
          });
          popover.on("setSize", setSize || null);
          return popover
     };
     return Utils
});
define("widgets/slider", ["base", "tools"], function($, T) {
     function Slider(options) {
          var _this = this,
               opts = options || {};
          opts.percent = opts.percent || !1;
          opts.duration = opts.duration >= 0 ? opts.duration : 300;
          opts.interval = opts.interval >= 0 ? opts.interval : 3500;
          opts.direction = opts.direction || "lr";
          opts.autoplay = null == opts.autoplay ? !0 : opts.autoplay;
          _this.options = opts;
          _this.$cont = $(options.cont);
          _this.$list = $(".slide-layer", _this.$cont);
          _this.$panel = _this.$list.closest(".slide-panel");
          _this.$dots = $(".slide-dots", _this.$cont);
          var $firstItem = $(".slide-item:first-child", _this.$list);
          _this.index = 0;
          opts.number = opts.number || _this.$panel.data("number") || _this.$cont.data("number") || 1;
          _this.len = $(".slide-item", _this.$list).length;
          _this.width = _this.$cont.width();
          _this.itemWidth = $firstItem.outerWidth(!0);
          var num = Math.ceil(_this.width / _this.itemWidth);
          _this.count = Math.ceil(_this.len / opts.number);
          if (_this.$cont.length && _this.$panel.length && _this.$list.length && _this.count && !_this.$list.data("status") && !(_this.count <= 1)) {
               _this.$list.data("status", "installed");
               _this.setDotClass();
               if (num > 1) {
                    var maxConDiv = (_this.len % num, _this.maxComDiv(_this.len, num)),
                         minComMul = Math.max(_this.minComMul(_this.len / maxConDiv, num / maxConDiv), _this.len),
                         cloneNum = minComMul / _this.len,
                         htmls = _this.$list.html();
                    _this.count = minComMul / opts.number;
                    for (var i = 0; cloneNum >= i; i++) _this.$list.append(htmls)
               } else _this.$list.append($firstItem.clone());
               opts.percent || _this.$list.width(_this.itemWidth * $(".slide-item", _this.$list).length);
               _this.autoplay();
               _this.$cont.off("click.prev", ".slide-prev").on("click.prev", ".slide-prev", function(e) {
                    _this.direction = "lr";
                    _this.slider(_this.index - 1)
               }).off("click.next", ".slide-next").on("click.next", ".slide-next", function(e) {
                    _this.direction = "rl";
                    _this.slider(_this.index + 1)
               }).off("mouseenter.slider").on("mouseenter.slider", function(e) {
                    _this.timer && clearInterval(_this.timer)
               }).off("mouseleave.slider").on("mouseleave.slider", function(e) {
                    _this.autoplay()
               });
               _this.$dots.off("mouseenter.slider", ".slide-dot").on("mouseenter.slider", ".slide-dot", function(e) {
                    var index = $(this).index();
                    _this.slider(index)
               });
               _this.count <= 1 && $(".slide-prev, .slide-next", _this.$cont).remove();
               return _this
          }
     }
     Slider.prototype = {
          slider: function(index) {
               var _this = this,
                    opts = _this.options;
               "undefined" == typeof index ? _this.index += "lr" == opts.direction ? 1 : -1 : _this.index = index;
               _this.index < 0 && (_this.index = _this.count - 1);
               if (_this.index > _this.count) {
                    _this.$list.css("left", 0);
                    _this.index = 1
               }
               _this.$list.stop(!0).animate({
                    left: opts.percent ? -_this.index * opts.number * 100 + "%" : -_this.index * opts.number * _this.itemWidth + "px"
               }, {
                    speed: "easing",
                    duration: opts.duration
               });
               _this.setDotClass()
          },
          autoplay: function() {
               var _this = this,
                    opts = _this.options;
               if (opts.autoplay) {
                    _this.timer && clearInterval(_this.timer);
                    _this.timer = setInterval(function() {
                         _this.slider()
                    }, opts.interval)
               }
          },
          setDotClass: function(index) {
               var _this = this;
               index = _this.index || 0;
               $(".slide-dot", _this.$dots).removeClass("sel").eq(index < _this.count ? index : 0).addClass("sel")
          },
          maxComDiv: function(m, n) {
               for (var u = +m, v = +n, t = v; 0 != v;) {
                    t = u % v;
                    u = v;
                    v = t
               }
               return u
          },
          minComMul: function(a, b) {
               var minNum = Math.min(a, b),
                    maxNum = Math.max(a, b),
                    i = minNum,
                    vPer = 0;
               if (0 === a || 0 === b) return maxNum;
               for (; maxNum >= i; i++) {
                    vPer = minNum * i;
                    if (vPer % maxNum === 0) return vPer
               }
          }
     };
     return function(options) {
          return new Slider(options)
     }
});

define("zh_cn", [], function() {
     var CFG_DB = {
               INVOICE: {
                    TYPE: {
                         1: "普通发票（纸质）",
                         2: "增值税专用发票"
                    },
                    TITLE: {
                         1: "个人",
                         2: "单位"
                    },
                    CONTENT: {
                         1: "办公用品",
                         2: "办公用品",
                         3: "耗材",
                         4: "名片",
                         5: "宣传用品",
                         6: "设计费",
                         7: "画册",
                         8: "运费"
                    },
                    STATUS: {
                         Draft: "待审核",
                         NotPass: "审核不通过",
                         Pass: "审核通过"
                    }
               },
               TAKEDATE: {
                    1: "仅工作日送货（周一至周五）",
                    2: "工作日、双休日均可送货（周一至周六）"
               },
               TAKE_DATE_LIST: [{
                    dateId: 1,
                    name: "仅工作日送货",
                    desc: "（周一至周五）"
               }, {
                    dateId: 2,
                    name: "工作日、双休日均可送货",
                    desc: "（周一至周六）"
               }],
               ACCOUNT: {
                    0: "现金账户",
                    1: "现金券",
                    2: "普通账户"
               },
               IMG: {
                    "package": "http://www.ininin.com/resources/package/750x425.jpg",
                    design: "http://design.ininin.com/resources/product/750x425.jpg"
               }
          },
          CFG_TIP = {
               10: "您还未登录，请先登录",
               11: "您还未登录，请先登录",
               404: "您访问的资源不存在",
               501: "出现错误了",
               502: "502",
               503: "503"
          },
          CFG_COM = {
               username: {
                    tips: {
                         empty: "请填写手机/邮箱",
                         minlength: "请填写有效的账户名",
                         maxlength: "请填写有效的账户名",
                         mismatch: "账户名格式错误",
                         error: "账户名格式错误",
                         unique: "该账号已被注册"
                    },
                    show: "code",
                    show_rule: "mobile",
                    rule: "mobile_email",
                    unique: "in_user/is_only",
                    minlength: 5,
                    maxlength: 100,
                    required: !0
               },
               username_store: {
                    tips: {
                         empty: "请填写手机/邮箱",
                         minlength: "请填写有效的账户名",
                         maxlength: "请填写有效的账户名",
                         mismatch: "账户名格式错误",
                         error: "账户名格式错误",
                         unique: "该账号已被注册"
                    },
                    rule: "mobile_email",
                    unique: "in_user/is_only",
                    minlength: 5,
                    maxlength: 100,
                    required: !0
               },
               code: {
                    rule: "code",
                    tips: {
                         empty: "请填写验证码",
                         mismatch: "请填写有效的验证码",
                         error: "验证码格式错误"
                    },
                    from: "username",
                    required: !0
               },
               password: {
                    rule: "pwd",
                    tips: {
                         empty: "请填写密码",
                         mismatch: "密码不能包含空格",
                         minlength: "请填写不少于6位密码",
                         maxlength: "请填写不超过16位密码",
                         error: "密码格式有误"
                    },
                    required: !0,
                    minlength: 6,
                    maxlength: 16
               },
               repwd: {
                    target: "password",
                    tips: {
                         empty: "请再次填写密码",
                         same: "两次填写密码不一致",
                         error: "密码格式有误"
                    },
                    rule: "same",
                    required: !0
               },
               nick_name: {
                    tips: {
                         empty: "请填写昵称",
                         error: "请填写昵称"
                    },
                    rule: "nonempty",
                    pattern: /\S+/
               },
               contact: {
                    tips: {
                         empty: "请填写联系人",
                         error: "请填写联系人"
                    },
                    rule: "nonempty",
                    pattern: /\S+/
               },
               phone: {
                    tips: {
                         empty: "请填写手机号码",
                         mismatch: "请填写正确的手机号码",
                         error: "请填写手机号码"
                    },
                    rule: "mobile"
               },
               email: {
                    tips: {
                         empty: "请填写邮箱",
                         minlength: "请填写有效的邮箱",
                         maxlength: "请填写有效的邮箱",
                         mismatch: "邮箱格式错误",
                         error: "邮箱格式错误"
                    },
                    rule: "email",
                    minlength: 5,
                    maxlength: 100
               },
               phone_user: {
                    tips: {
                         empty: "请填写手机号码",
                         mismatch: "请填写正确的手机号码",
                         error: "请填写手机号码"
                    },
                    rule: "mobile"
               },
               email_user: {
                    tips: {
                         empty: "请填写邮箱",
                         minlength: "请填写有效的邮箱",
                         maxlength: "请填写有效的邮箱",
                         mismatch: "邮箱格式错误",
                         error: "邮箱格式错误"
                    },
                    rule: "email",
                    minlength: 5,
                    maxlength: 100
               },
               sex: {
                    tips: {
                         empty: "请选择性别",
                         error: "请选择性别"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               qq: {
                    tips: {
                         empty: "请填写QQ",
                         mismatch: "请填写正确的QQ",
                         error: "请填写QQ"
                    },
                    rule: "qq"
               },
               tel: {
                    tips: {
                         empty: "请填写固定电话",
                         mismatch: "请填写正确的固定电话（如：0755-12345678）",
                         error: "请填写固定电话"
                    },
                    rule: "tel"
               },
               contact_job: {
                    tips: {
                         empty: "请选择联系人职位",
                         error: "请选择联系人职位"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_name: {
                    tips: {
                         empty: "请填写企业名称",
                         error: "请填写企业名称"
                    },
                    rule: "nonempty",
                    pattern: /\S+/
               },
               ep_type: {
                    tips: {
                         empty: "请选择公司行业",
                         error: "请选择公司行业"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_person_sum: {
                    tips: {
                         empty: "请选择企业人数",
                         error: "请选择企业人数"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_trade: {
                    tips: {
                         empty: "请选择企业类型",
                         error: "请选择企业类型"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_purpose: {
                    tips: {
                         empty: "请选择购买产品用途",
                         error: "请选择购买产品用途"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_profile: {
                    tips: {
                         empty: "请填写企业简介",
                         error: "请填写企业简介"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               ep_logo: {
                    tips: {
                         empty: "请填上传企业LOGO",
                         error: "请填上传企业LOGO"
                    },
                    rule: "nonempty",
                    pattern: /\S/
               },
               province: {
                    tips: {
                         empty: "请选择地区",
                         error: "请选择地区"
                    },
                    rule: "nonempty"
               },
               city: {
                    tips: {
                         empty: "请选择地区",
                         error: "请选择地区"
                    },
                    rule: "nonempty"
               },
               area: {
                    tips: {
                         empty: "请选择地区",
                         error: "请选择地区"
                    },
                    rule: "nonempty"
               },
               address: {
                    tips: {
                         empty: "请填写详细地址",
                         error: "请填写详细地址"
                    },
                    rule: "nonempty",
                    pattern: /\S+/
               },
               address_2: {
                    tips: {
                         empty: "请填写详细地址",
                         error: "请填写详细地址"
                    },
                    rule: "nonempty",
                    pattern: /\S+/,
                    required: !0
               },
               inviter: {
                    tips: {
                         empty: "请填写为您服务的商务经理编号",
                         error: "",
                         mismatch: "商务经理编号格式错误",
                         unique: "该编号不存在，请核实清楚后再验证"
                    },
                    rule: "inviter",
                    unique: "in_user/check_bd_info"
               },
               agreement: {
                    tips: {
                         empty: "请阅读并接受《云印服务协议》",
                         error: "请阅读并接受《云印服务协议》"
                    },
                    required: !0,
                    rule: "nonempty",
                    pattern: /\S+/
               },
               question: {
                    tips: {
                         empty: "请选择安全问题",
                         error: "请选择安全问题"
                    },
                    rule: "nonempty",
                    required: !0
               },
               answer: {
                    tips: {
                         empty: "请填写安全答案",
                         error: "请填写安全答案"
                    },
                    rule: "nonempty",
                    required: !0
               }
          },
          CFG_FORM = {
               register: {
                    action: "in_user/regist",
                    items: {
                         username: CFG_COM.username,
                         code: CFG_COM.code,
                         password: CFG_COM.password,
                         inviter: CFG_COM.inviter,
                         agreement: CFG_COM.agreement
                    }
               },
               user_info: {
                    action: "in_user/user_update",
                    items: {
                         contact: CFG_COM.contact,
                         phone: CFG_COM.phone,
                         qq: CFG_COM.qq,
                         tel: CFG_COM.tel,
                         sex: CFG_COM.sex,
                         contact_job: CFG_COM.contact_job,
                         ep_name: CFG_COM.ep_name,
                         ep_type: CFG_COM.ep_type,
                         ep_trade: CFG_COM.ep_trade,
                         ep_person_sum: CFG_COM.ep_person_sum,
                         ep_purpose: CFG_COM.ep_purpose,
                         province: CFG_COM.province,
                         city: CFG_COM.city,
                         area: CFG_COM.area,
                         address: CFG_COM.address
                    }
               },
               login_bind: {
                    action: "in_user/link_insert",
                    items: {
                         username: {
                              tips: {
                                   empty: "请填写手机/邮箱",
                                   minlength: "请填写有效的账户名",
                                   maxlength: "请填写有效的账户名",
                                   mismatch: "账户名格式错误",
                                   error: "账户名格式错误",
                                   unique: "该账号已被注册"
                              },
                              rule: "mobile_email",
                              minlength: 5,
                              maxlength: 100,
                              required: !0
                         },
                         password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         remember: {
                              rule: "nonempty",
                              tips: {
                                   empty: "",
                                   error: ""
                              },
                              pattern: /\S/
                         }
                    }
               },
               forget_email: {
                    action: "in_user/create_code",
                    items: {
                         username: CFG_COM.email
                    }
               },
               forget_mobile: {
                    action: "in_user/check_code",
                    items: {
                         username: CFG_COM.phone,
                         code: {
                              rule: "code",
                              tips: {
                                   empty: "请填写验证码",
                                   mismatch: "请填写有效的验证码",
                                   error: "验证码格式错误"
                              },
                              required: !0
                         }
                    }
               },
               setpwd: {
                    action: "in_user/back_passsword",
                    items: {
                         password: CFG_COM.password,
                         repwd: CFG_COM.repwd
                    }
               },
               forgetpay_email: {
                    action: "in_user/create_code",
                    items: {
                         username: CFG_COM.email
                    }
               },
               forgetpay_mobile: {
                    action: "in_user/check_code",
                    items: {
                         code: {
                              rule: "code",
                              tips: {
                                   empty: "请填写验证码",
                                   mismatch: "请填写有效的验证码",
                                   error: "验证码格式错误"
                              },
                              required: !0
                         }
                    }
               },
               setnewpaypwd: {
                    action: "in_user/back_passsword",
                    items: {
                         password: CFG_COM.password,
                         repwd: CFG_COM.repwd
                    }
               },
               address: {
                    action: "in_user/address_insert",
                    items: {
                         address_id: {
                              rule: "nonempty"
                         },
                         receiver: {
                              tips: {
                                   empty: "请填写收货人姓名",
                                   error: "请填写收货人姓名"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         province: CFG_COM.province,
                         city: CFG_COM.city,
                         area: CFG_COM.area,
                         address: CFG_COM.address_2,
                         phone: {
                              tips: {
                                   empty: "请填写收货人手机号码",
                                   mismatch: "请填写正确的手机号码",
                                   error: "请填写收货人手机号码"
                              },
                              inherit: "tel",
                              rule: "mobile",
                              required: !0
                         },
                         tel: {
                              tips: {
                                   empty: "请填写收货人固定电话",
                                   mismatch: "请填写正确的固定电话（如：0755-12345678）",
                                   error: "请填写收货人固定电话"
                              },
                              inherit: "phone",
                              rule: "tel",
                              required: !0
                         },
                         email: {
                              tips: {
                                   empty: "请填写邮箱",
                                   minlength: "请填写有效的邮箱",
                                   maxlength: "请填写有效的邮箱",
                                   mismatch: "邮箱格式错误",
                                   error: "邮箱格式错误"
                              },
                              rule: "email",
                              minlength: 5,
                              maxlength: 100
                         }
                    }
               },
               invoice: {
                    action: "in_user/invoice_insert",
                    items: {
                         invoice_id: {
                              rule: "nonempty"
                         },
                         invoice_type: {
                              rule: "nonempty",
                              show: "company_name|id_code|register_address|register_phone|bank|bank_account",
                              show_pattern: /^2$/,
                              required: !0
                         },
                         title_type: {
                              show: "invoice_title",
                              show_pattern: /^2$/,
                              rule: "nonempty"
                         },
                         invoice_title: {
                              tips: {
                                   empty: "请填写单位名称",
                                   mismatch: "请填写单位名称",
                                   error: "请填写单位名称"
                              },
                              from: "title_type",
                              rule: "nonempty"
                         },
                         company_name: {
                              tips: {
                                   empty: "请填写单位名称",
                                   mismatch: "请填写单位名称",
                                   error: "请填写单位名称"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         id_code: {
                              tips: {
                                   empty: "请填写纳税人识别码",
                                   mismatch: "请填写纳税人识别码",
                                   error: "请填写纳税人识别码"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         register_address: {
                              tips: {
                                   empty: "请填写注册地址",
                                   mismatch: "请填写注册地址",
                                   error: "请填写注册地址"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         register_phone: {
                              tips: {
                                   empty: "请填写注册电话",
                                   mismatch: "请填写注册电话",
                                   error: "请填写注册电话"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         bank: {
                              tips: {
                                   empty: "请填写开户银行",
                                   mismatch: "请填写开户银行",
                                   error: "请填写开户银行"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         bank_account: {
                              tips: {
                                   empty: "请填写银行账户",
                                   mismatch: "请填写银行账户",
                                   error: "请填写银行账户"
                              },
                              from: "invoice_type",
                              rule: "nonempty",
                              required: !0
                         },
                         data_path: {
                              tips: {
                                   empty: "请上传证明资料",
                                   mismatch: "请上传证明资料",
                                   error: "请上传证明资料"
                              },
                              rule: "nonempty"
                         },
                         content_type: {
                              rule: "nonempty",
                              required: !0
                         }
                    }
               },
               apply_invoice: {
                    action: "in_invoice/invoice_create",
                    items: {
                         address_id: {
                              tips: {
                                   empty: "请填写收货地址！",
                                   error: "请填写收货地址！"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         invoice_id: {
                              tips: {
                                   empty: "请填写发票信息！",
                                   error: "请填写发票信息！"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         invoice_price: {
                              tips: {
                                   empty: "请填写发票金额",
                                   mismatch: "金额只能是数字",
                                   error: "金额只能是数字"
                              },
                              rule: "nonempty",
                              required: !0,
                              pattern: /[0-9]+\.*[0-9]{0,2}/
                         }
                    }
               },
               order: {
                    action: "in_order/order_create",
                    items: {
                         take_address_id: {
                              tips: {
                                   empty: "请选择自取门店！",
                                   error: "请选择自取门店！"
                              },
                              rule: "nonempty"
                         },
                         address_id: {
                              tips: {
                                   empty: "请您填写收货人联系方式，以便于商品到达后及时联系您",
                                   error: "请您填写收货人联系方式，以便于商品到达后及时联系您"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         take_date: {
                              tips: {
                                   empty: "请选择配送时间！",
                                   error: "请选择配送时间！"
                              },
                              rule: "nonempty"
                         },
                         take_id: {
                              tips: {
                                   empty: "请选择配送方式！",
                                   error: "请选择配送方式！"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         pay_id: {
                              tips: {
                                   empty: "请选择支付方式！",
                                   error: "请选择支付方式！"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         invoice_id: {
                              tips: {
                                   empty: "请填写发票信息！",
                                   error: "请填写发票信息！"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         buyer_remark: {
                              noplaceholder: !0,
                              tips: {
                                   empty: "请填写备注信息",
                                   maxlength: "备注信息不得超过200字",
                                   error: "请填写备注信息"
                              },
                              rule: "nonempty",
                              maxlength: 200
                         }
                    }
               },
               order_package: {
                    action: "in_order/sure_plan_order",
                    items: {
                         buyer_remark: {
                              noplaceholder: !0,
                              tips: {
                                   empty: "请填写备注信息",
                                   maxlength: "备注信息不得超过200字",
                                   error: "请填写备注信息"
                              },
                              rule: "nonempty",
                              maxlength: 200
                         }
                    }
               },
               order_design: {
                    action: "in_order/sure_design_order",
                    items: {
                         buyer_remark: {
                              noplaceholder: !0,
                              tips: {
                                   empty: "请填写备注信息",
                                   maxlength: "备注信息不得超过200字",
                                   error: "请填写备注信息"
                              },
                              rule: "nonempty",
                              maxlength: 200
                         }
                    }
               },
               set_pwd: {
                    action: "in_user/retrieve_new_password",
                    items: {
                         new_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写新密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         renewpwd: {
                              target: "new_password",
                              tips: {
                                   empty: "请再次填写新密码",
                                   same: "两次填写密码不一致",
                                   error: "密码格式有误"
                              },
                              rule: "same",
                              required: !0
                         }
                    }
               },
               check_username: {
                    action: "in_user/is_only",
                    items: {
                         username: {
                              tips: {
                                   empty: "请填写手机/邮箱",
                                   minlength: "请填写有效的账户名",
                                   maxlength: "请填写有效的账户名",
                                   mismatch: "账户名格式错误",
                                   error: "账户名格式错误"
                              },
                              show: "code",
                              show_rule: "mobile",
                              rule: "mobile_email",
                              minlength: 5,
                              maxlength: 100,
                              required: !0
                         }
                    }
               },
               check_safetips: {
                    action: "in_user/check_pwd_result",
                    items: {
                         answer1: CFG_COM.answer,
                         answer2: CFG_COM.answer
                    }
               },
               set_safetips: {
                    action: "in_user/bind_pwd_result",
                    items: {
                         question1: CFG_COM.question,
                         question2: CFG_COM.question,
                         question3: CFG_COM.question,
                         answer1: CFG_COM.answer,
                         answer2: CFG_COM.answer,
                         answer3: CFG_COM.answer
                    }
               },
               login_pwd: {
                    action: "in_user/update_password",
                    items: {
                         old_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写旧密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         new_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写新密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         renewpwd: {
                              target: "new_password",
                              tips: {
                                   empty: "请再次填写新密码",
                                   same: "两次填写密码不一致",
                                   error: "密码格式有误"
                              },
                              rule: "same",
                              required: !0
                         }
                    }
               },
               setpaypwd: {
                    action: "in_user/update_password",
                    items: {
                         new_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写支付密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         renewpwd: {
                              target: "new_password",
                              tips: {
                                   empty: "请再次填写支付密码",
                                   same: "两次填写密码不一致",
                                   error: "密码格式有误"
                              },
                              rule: "same",
                              required: !0
                         }
                    }
               },
               pay_pwd: {
                    action: "in_user/update_password",
                    items: {
                         old_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写旧密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         new_password: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写新密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         },
                         renewpwd: {
                              target: "new_password",
                              tips: {
                                   empty: "请再次填写新密码",
                                   same: "两次填写密码不一致",
                                   error: "密码格式有误"
                              },
                              rule: "same",
                              required: !0
                         }
                    }
               },
               pdetail: {
                    action: "in_order/cart_add",
                    prevent: !0,
                    items: {
                         pnum: {
                              tips: {
                                   empty: "请输入数量",
                                   type: "文件数只能是数字",
                                   mismatch: "文件数只能是数字",
                                   error: "请输入数量",
                                   min: "文件数不能小于1",
                                   max: "文件数不能大于1000000"
                              },
                              rule: "number",
                              required: !0,
                              min: 1,
                              max: 1e6
                         }
                    }
               },
               album: {
                    action: "in_order/cart_add",
                    prevent: !0,
                    items: {}
               },
               custom: {
                    action: "in_order/cart_add",
                    prevent: !0,
                    items: {
                         name: {
                              tips: {
                                   empty: "请填写产品名称",
                                   mismatch: "请填写产品名称",
                                   error: "请填写产品名称"
                              },
                              rule: "nonempty",
                              required: !0
                         },
                         number: {
                              tips: {
                                   empty: "请填写产品数量",
                                   mismatch: "请填写正确格式的产品数量",
                                   error: "请填写产品数量"
                              },
                              rule: "nonempty",
                              pattern: /^[0-9]{1,10}[\u4e00-\u9fa5]{1}$/,
                              required: !0
                         },
                         material: {
                              tips: {
                                   empty: "请填写产品材质",
                                   mismatch: "请填写产品材质",
                                   error: "请填写产品材质"
                              },
                              rule: "nonempty"
                         },
                         size_h: {
                              tips: {
                                   empty: "请填写尺寸",
                                   type: "尺寸只能是数字",
                                   mismatch: "请填写尺寸",
                                   error: "请填写尺寸",
                                   min: "尺寸不能小于1",
                                   max: "尺寸不能大于10000000"
                              },
                              rule: /^\d+(\.\d+)?$/,
                              depend: "size_v",
                              min: 1,
                              max: 1e7
                         },
                         size_v: {
                              tips: {
                                   empty: "请填写尺寸",
                                   type: "尺寸只能是数字",
                                   mismatch: "请填写尺寸",
                                   error: "请填写尺寸",
                                   min: "尺寸不能小于1",
                                   max: "尺寸不能大于10000000"
                              },
                              rule: /^\d+(\.\d+)?$/,
                              depend: "size_h",
                              min: 1,
                              max: 1e7
                         },
                         remark: {
                              tips: {
                                   empty: "请填写其他备注信息",
                                   maxlength: "其他备注信息不得超过1000字",
                                   mismatch: "请填写其他备注信息",
                                   error: "请填写其他备注信息"
                              },
                              rule: "nonempty",
                              maxlength: 1e3
                         }
                    }
               },
               mycart: {
                    items: {
                         cid: {
                              tips: {
                                   empty: "请至少选择一项商品！",
                                   error: "请至少选择一项商品！"
                              },
                              rule: "nonempty",
                              required: !0
                         }
                    }
               },
               recharge: {
                    action: "in_order/create_recharge",
                    items: {
                         amount: {
                              tips: {
                                   empty: "请填写充值金额",
                                   mismatch: "金额只能是数字",
                                   error: "金额只能是数字"
                              },
                              rule: "nonempty",
                              required: !0,
                              pattern: /[0-9]+\.*[0-9]{0,2}/
                         },
                         pay_type: {
                              rule: "nonempty",
                              tips: {
                                   empty: "请选择支付类型",
                                   mismatch: "请选择支付类型",
                                   error: "请选择支付类型"
                              },
                              required: !0
                         }
                    }
               },
               feedback: {
                    action: "in_feedback/insert_user_feedback",
                    items: {
                         feedback_content: {
                              rule: "nonempty",
                              tips: {
                                   empty: "请写下您的意见建议"
                              },
                              required: !0
                         },
                         contact_information: {
                              rule: "nonempty",
                              tips: {
                                   empty: "请输入您的联系方式"
                              }
                         },
                         real_name: {
                              rule: "nonempty",
                              tips: {
                                   empty: "请输入您的姓名"
                              }
                         }
                    }
               },
               store_payment: {
                    action: "in_payment/create_direct_pay",
                    items: {
                         store_money: {
                              tips: {
                                   empty: "请填写充值金额",
                                   mismatch: "金额只能是数字",
                                   error: "金额只能是数字"
                              },
                              rule: "nonempty",
                              required: !0,
                              pattern: /[0-9]+\.*[0-9]{0,2}/
                         },
                         store_name: {
                              tips: {
                                   empty: "请填写门店账号",
                                   minlength: "请填写有效的门店账号",
                                   maxlength: "请填写有效的门店账号",
                                   mismatch: "账户名格式错误",
                                   error: "门店账号格式错误"
                              },
                              rule: "mobile_email",
                              minlength: 5,
                              maxlength: 100,
                              required: !0
                         },
                         store_pwd: {
                              rule: "pwd",
                              tips: {
                                   empty: "请填写密码",
                                   mismatch: "密码不能包含空格",
                                   minlength: "请填写不少于6位密码",
                                   maxlength: "请填写不超过16位密码",
                                   error: "密码格式有误"
                              },
                              required: !0,
                              minlength: 6,
                              maxlength: 16
                         }
                    }
               }
          };
     window.CFG_DB = CFG_DB;
     window.CFG_TIP = CFG_TIP;
     window.CFG_COM = CFG_COM;
     window.CFG_FORM = CFG_FORM
});
window.onerror = function(e) {
     return !0
};
// if ("undefined" == typeof console) {
//      console = {};
//      console.log = function() {}
// }! function(o) {
//      o.log("我们是一群互联网信徒，\n我们是一群科技痴狂人，\n我们是一群生活热爱者，\n我们相信，互联网将改变世界，\n我们相信，科技让生活更美好，\n我们相信，天道酬勤使命必达。\n");
//      o.log("请将简历发送至：%cjoin@ininin.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:#f00");
//      o.log("职位介绍：http://www.ininin.com/about/job.html")
// }(console);
// console.log = function() {
//      return !0
// };
window.getQueryString = function(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
          r = window.location.search.substr(1).match(reg);
     return null != r ? decodeURI(r[2]) : ""
};
var _czc = _czc || [];
_czc.push(["_setAccount", "1253317095"]);
requirejs.config({
     debug: !1,
     urlArgs: "ininin=20626200133",
     baseUrl: "http://www.ininin.com/scripts/",
     paths: {
          jquery: "libs/jquery-1.7.2",
          "jquery/qrcode": "libs/jquery.qrcode.min",
          qrcode: "libs/qrcode.min",
          jcrop: "libs/jcrop.min",
          plupload: "uploader/plupload.full.min",
          "qiniu/sdk": "uploader/qiniu-sdk",
          datetimepicker: "libs/jquery.datetimepicker.full",
          plugins: "libs/plugins",
          uploader: "uploader/main",
          "design/params": "http://design.ininin.com/scripts/category/params",
          "design/price": "http://design.ininin.com/scripts/category/price",
          "package/price": "http://design.ininin.com/scripts/category/package_price",
          sinajs: "http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=2422438855"
     },
     map: {
          "*": {
               base: "jquery"
          }
     },
     shim: {
          qrcode: {
               exports: "QRCode"
          },
          "jquery/qrcode": {
               deps: ["base", "qrcode"]
          },
          jcrop: {
               deps: ["base"]
          },
          plupload: {
               deps: ["base"]
          },
          "qiniu/sdk": {
               deps: ["base", "plupload"]
          },
          location: {
               deps: ["base"]
          },
          uploadify: {
               deps: ["base"]
          },
          bmap: {
               exports: "BMap"
          },
          sinajs: {
               exports: "WB2"
          }
     },
     scriptType: "text/javascript",
     waitSeconds: 30
});
define("tools", ["base", "utils", "widgets/slider", "zh_cn"], function($, Utils, Slider) {
     function Counter($dom, options) {
          options = options || {
               min: 1,
               max: 1e3
          };
          options.step = options.step || 1;
          options.cont = options.cont || ".counter";
          null == options.min && (options.min = 1);
          null == options.max && (options.max = 1e3);
          $dom.off("selectstart" + options.cont).on("selectstart" + options.cont, options.cont + " a, " + options.cont + " b", function() {
               return !1
          }).off("click" + options.cont + "-a").on("click" + options.cont + "-a", options.cont + " a", function(e) {
               var $minus = $(this),
                    $input = $minus.siblings("input"),
                    val = parseInt($input.val(), 10),
                    dval = val;
               if (val > options.min) {
                    val -= options.step;
                    val = Math.max(val, options.min);
                    val = Math.min(val, options.max);
                    $input.val(val)
               }
               dval != val && options.change && options.change.call(options, $input, val);
               return !1
          }).off("click" + options.cont + "-b").on("click" + options.cont + "-b", options.cont + " b", function(e) {
               var $plus = $(this),
                    $input = $plus.siblings("input"),
                    val = parseInt($input.val(), 10),
                    dval = val;
               if (val < options.max) {
                    val += options.step;
                    val = Math.min(val, options.max);
                    val = Math.max(val, options.min);
                    $input.val(val)
               }
               dval != val && options.change && options.change.call(options, $input, val, 1);
               return !1
          }).off("blur" + options.cont).on("blur" + options.cont, options.cont + " input", function(e) {
               var $input = $(this),
                    val = $input.val();
               isNaN(val) && (val = 1);
               val = parseInt(val, 10) || 0;
               val = Math.max(val, options.min);
               val = Math.min(val, options.max);
               $input.val(val);
               options.change && options.change.call(options, $input, val, 0);
               return !1
          }).off("keydown" + options.cont).on("keydown" + options.cont, options.cont + " input", function(e) {
               var $input = $(this);
               if ($.trim($input.val()) && 13 == e.keyCode) {
                    e.preventDefault();
                    e.stopPropagation();
                    $input.blur()
               }
          }).off("keyup" + options.cont + " afterpaste" + options.cont).on("keyup" + options.cont + " afterpaste" + options.cont, options.cont + " input", function(e) {
               var $input = $(this);
               $input.val($input.val().replace(/\D\./g, ""))
          }).off("focus" + options.cont).on("focus" + options.cont, options.cont + " input", function(e) {
               var $input = $(this);
               $input.trigger("blur" + options.cont)
          })
     }
     var T = Utils || {};
     Utils._HOSTNAME = "http://www.ininin.com/";
     T.Slider = Slider;
     T.VIP_LEVEL = {
          1: "设计基础会员",
          2: "设计尊贵会员"
     };
     if ("undefined" == typeof console) {
          console = {};
          console.log = function() {}
     }
     String.prototype.Trim = function() {
          return this.replace(/(^\s*)|(\s*$)/g, "")
     };
     Date.prototype.Format = function(fmt) {
          return Utils.Date.format(this, fmt)
     };
     window.COM_API = {
          advert: "in_product_new/advertisement/all_ad_content",
          cart_num: "in_order/cart_num_query",
          order_mun: "in_order/order_num_query",
          get_token: "in_token/get_token",
          sendcode: "in_user/create_code",
          loginout: "in_user/loginout"
     };
     window.CFG_DS = {
          sendcode: {
               action: "in_user/create_code",
               source: 3
          },
          bind: {
               action: "in_user/link_insert"
          },
          index: {
               get: {
                    act: "getProductCategoryList",
                    mod: "ProductPortal",
                    categoryCode: "01"
               }
          },
          product: {
               get_price: "in_quotation/get_price",
               get_category_multi: "in_product_new/query_category_multi"
          },
          design: {
               get_category: "in_product/query_design_category_all",
               get_service: "in_product/query_design_service_all"
          },
          address: {
               get: "in_user/address_query",
               adr_add: "in_user/address_insert",
               adr_def: "in_user/set_default_address",
               adr_upd: "in_user/address_update",
               adr_del: "in_user/address_delete"
          },
          invoice: {
               get: "in_user/invoice_query",
               inv_add: "in_user/invoice_insert",
               inv_upd: "in_user/invoice_update",
               inv_del: "in_user/invoice_delete"
          },
          ucenter: {
               get: {
                    act: "getRecentOrderList",
                    mod: "MemberFGInfo",
                    page: 1,
                    size: 5
               }
          },
          udetail: {
               get: "in_user/user_query",
               come_address: "in_user/come_address_query",
               credit: "in_order/used_amount_query"
          },
          order: {
               delivery: "in_product/query_delivery_by_state_all",
               smt: "in_order/order_create"
          },
          mycart: {
               get: "in_order/cart_query",
               del: "in_order/cart_delete",
               chk: "in_order/cart_status"
          },
          myorder: {
               get: "in_order/order_query",
               det: "in_order/order_query",
               cel: "in_order/order_update",
               upload: "in_order/order_product_update",
               get_draft: "in_order/query_manuscript",
               upd_draft: "in_order/update_manuscript"
          },
          distorder: {
               get: "in_order/dist_order_query",
               cel: "in_order/dist_order_cancel"
          },
          myintegral: {
               get: "in_order/in_coin_query"
          },
          mywallet: {
               get: "in_order/user_wallet_query"
          },
          myfile: {
               get: "in_user/file_query",
               del: "in_order/check_file_by_fileurl",
               upload: "in_user/file_upload",
               checkFileSize: "in_user/check_design_file"
          },
          mydesignfile: {
               get: "in_user/find_file_design"
          },
          template: {
               get: "in_order/query_design_template"
          },
          card: {
               get: "in_user/card_query"
          },
          mycoupon: {
               get: "in_order/coupon_query",
               get_new: "in_order/coupon_query_for_web"
          },
          message: {
               get: "in_message/get_message"
          },
          search: {
               find_key_word: "in_product_new/search/find_key_word",
               product_search: "in_search_center/product/search"
          }
     };
     window.CFG_DB = window.CFG_DB || {};
     CFG_DB.FCFID = 2;
     CFG_DB.FNDID = 17;
     CFG_DB.FESID = 18;
     CFG_DB.FDDID = 20;
     CFG_DB.FHDID = 16;
     CFG_DB.PMPID = "|30|39|40|41|42|141|142|";
     CFG_DB.PMYID = 35;
     CFG_DB.DEF_PCD = "广东省^深圳市^南山区";
     CFG_DB.WCMDSID = 74;
     CFG_DB.NEWDSID = "|9|14|15|23|25|26|27|29|31|32|34|36|38|41|";
     CFG_DB.HD_PRO = {
          200036: 1
     };
     CFG_DB.ISP = {
          1001: 1,
          1002: 1,
          1003: 1
     };
     CFG_DB.PCFG = {
          HOME: "30,28,29,33,36,37,35",
          VNAV: "30,28,29,33,36,37,35",
          TYPE: "30,28,29,33,36,37,35",
          NOT_WEIGHT: "_98_101_102_103_104_",
          NOT_DELIVERY_DAY: "_98_"
     };
     CFG_DB.CYBER = {
          124: 1,
          125: 1,
          126: 1,
          127: 1,
          128: 1,
          130: 1,
          131: 1,
          50: 2,
          54: 2,
          101: 2,
          102: 2,
          103: 2,
          104: 2,
          61: 3,
          64: 3,
          65: 3,
          66: 3,
          98: 3,
          111: 3,
          121: 3,
          113: 3,
          200021: 3,
          200022: 3,
          200030: 3,
          200031: 3,
          200032: 3,
          200033: 3,
          200053: 3,
          200054: 3,
          200061: 3,
          200062: 3,
          200063: 3,
          60: 4
     };
     CFG_DB.MARKS = {
          61: [1],
          54: [1],
          57: [1],
          200021: [1],
          200022: [1],
          200030: [1],
          200031: [1],
          200032: [1],
          200033: [1],
          200053: [1],
          200054: [1],
          50: [2],
          55: [2],
          60: [3],
          64: [3],
          66: [3],
          200061: [3],
          200062: [3],
          200063: [3],
          108: [4],
          109: [4],
          113: [4],
          104: [5],
          111: [5],
          122: [5],
          124: [5],
          125: [5],
          126: [5],
          127: [5],
          128: [5],
          130: [5],
          131: [5]
     };
     CFG_DB.PACKAGE = {
          MARKS: {
               2: [1],
               6: [4]
          }
     };
     CFG_DB.DESIGN = {
          ATTACH: "11",
          MODIFY: "12",
          LOGO: "11",
          ZHEYE: "25",
          MINGPIAN: "9"
     };
     CFG_DB.ADVERT = {
          bhp1: {},
          bhp2: {
               width: 740,
               height: 408
          },
          bhp3: {
               width: 240,
               height: 124
          },
          bhp4: {
               width: 240,
               height: 130
          },
          bhp5: {
               width: 1220,
               height: 80
          },
          print: {
               width: 1920,
               height: 408
          },
          superior: {
               width: 1920,
               height: 408
          },
          scene: {
               width: 1920,
               height: 408
          },
          login: {
               width: 1920,
               height: 600
          },
          design: {
               width: 1920,
               height: 408
          },
          designer: {
               width: 1920,
               height: 408
          },
          art1: {
               width: 1920,
               height: 408
          },
          art2: {
               width: 290,
               height: 168
          }
     };
     window.CFG_FORM = window.CFG_FORM || {};
     CFG_FORM.login = {
          action: "in_user/login",
          items: {
               username: {
                    rule: "mobile_email",
                    tips: {
                         empty: "请填写手机/邮箱",
                         minlength: "请填写有效的账户名",
                         maxlength: "请填写有效的账户名",
                         mismatch: "账户名格式错误",
                         error: "账户名格式错误"
                    },
                    minlength: 5,
                    maxlength: 100,
                    required: !0
               },
               password: {
                    rule: "pwd",
                    tips: {
                         empty: "请填写密码",
                         mismatch: "密码不能包含空格",
                         minlength: "请填写不少于6位密码",
                         maxlength: "请填写不超过20位密码",
                         error: "密码格式有误"
                    },
                    required: !0,
                    minlength: 6,
                    maxlength: 16
               },
               code: {
                    rule: "code",
                    tips: {
                         empty: "请填写验证码",
                         mismatch: "请填写有效的验证码",
                         error: "验证码格式错误"
                    },
                    from: "username",
                    required: !0
               },
               remember: {
                    rule: "nonempty",
                    tips: {
                         empty: "",
                         error: ""
                    },
                    pattern: /\S/
               }
          }
     };
     var FIXS = ["@qq.com", "@163.com", "@126.com", "@sina.com", "@gmail.com", "@sina.cn", "@139.com", "@189.cn", "@wo.com.cn", "@2008.sina.com", "@51uc.com", "@vip.sina.com", "@3g.sina.cn", "@foxmail.com", "@vip.qq.com", "@yeah.net", "@vip.163.com", "@yahoo.com", "@sohu.com", "@56.com", "@yahoo.com.cn", "@msn.com", "@hotmail.com", "@live.com", "@aol.com", "@ask.com", "@163.net", "@263.net", "@came.net.cn", "@8ycn.net", "@tuziba.net", "@googlemail.com", "@mail.com", "@aim.com", "@inbox.com", "@21cn.com", "@tom.com", "@eyou.com", "@x.cn", "asiainfo.com", "mplus-info.com", "exinfozone.com.cn", "@chinaren.com", "@sogou.com"];
     T.FlashPlayerURL = "http://get.adobe.com/cn/flashplayer/";
     T.DOMAIN = {
          ACTION: "http://action.ininin.com/",
          CLOUD: "http://cloud." + Utils._DOMAIN + "/",
          WWW: Utils._HOSTNAME,
          CART: Utils._HOSTNAME + "cart/",
          FAQ: Utils._HOSTNAME + "faq/",
          HOT: Utils._HOSTNAME + "hot/",
          NEW: Utils._HOSTNAME + "new/",
          HELP: Utils._HOSTNAME + "help/",
          ABOUT: Utils._HOSTNAME + "about/",
          ORDER: Utils._HOSTNAME + "order/",
          MEMBER: Utils._HOSTNAME + "member/",
          DESIGN: "http://design.ininin.com/",
          PACKAGE: Utils._HOSTNAME + "package/",
          PRODUCT: Utils._HOSTNAME + "product/",
          CATEGORY: Utils._HOSTNAME + "category/",
          PASSPORT: Utils._HOSTNAME + "passport/",
          CARD: Utils._HOSTNAME + "card/",
          YUNFILE: Utils._HOSTNAME + "yunfile/",
          SOLUTION: Utils._HOSTNAME + "solution/",
          DESIGN_CATEGORY: "http://design.ininin.com/category/",
          DESIGN_PRODUCT: "http://design.ininin.com/product/",
          RESOURCES: Utils._HOSTNAME + "resources/",
          DESIGN_RESOURCES: "http://design.ininin.com/resources/",
          SCRIPTS: Utils._HOSTNAME + "scripts/",
          ICONS: Utils._HOSTNAME + "resources/icons/",
          DOMAIN: Utils._DOMAIN
     };
     document.domain = T.DOMAIN.DOMAIN;
     T.VERSION = (new Date).getTime();
     T.DOING = '&nbsp;<img class="doing_gif" src="' + T.DOMAIN.RESOURCES + 'loading.gif" width="16"/>&nbsp;';
     T._serviceQQ = T._serviceQQLink = "http://crm2.qq.com/page/portalpage/wpa.php?uin=4008601846&aty=1&a=1003&curl=&ty=1";
     T.MARKS = {
          m1: {
               IMG: T.DOMAIN.ICONS + "m1.png",
               ALT: "热销"
          },
          m2: {
               IMG: T.DOMAIN.ICONS + "m3.png",
               ALT: "推荐"
          },
          m3: {
               IMG: T.DOMAIN.ICONS + "m5.png",
               ALT: "新品"
          },
          m4: {
               IMG: T.DOMAIN.ICONS + "m2.png",
               ALT: "出货快"
          },
          m5: {
               IMG: T.DOMAIN.ICONS + "m4.png",
               ALT: "实惠"
          }
     };
     T.hasPMPID = function(categoryId) {
          return CFG_DB.PMPID.indexOf("|" + categoryId + "|") >= 0
     };
     T.loadScript = function(uri, callback) {
          if ("undefined" != typeof BMap && "Object" === T.Typeof(BMap)) callback && callback();
          else {
               var jsoncallback = "_" + T.UUID().toUpperCase(),
                    script = document.createElement("script");
               script.defer = "defer";
               script.async = "async";
               window[jsoncallback] = function() {
                    try {
                         callback && callback()
                    } catch (e) {} finally {
                         script && script.parentNode && script.parentNode.removeChild && script.parentNode.removeChild(script);
                         setTimeout(function() {
                              window[jsoncallback] = "ininin"
                         }, 100)
                    }
               };
               document.documentElement.appendChild(script);
               script.src = uri + jsoncallback
          }
     };
     T.loadBMapSDK = function(callback) {
          T.loadScript("http://api.map.baidu.com/api?v=2.0&&ak=VybvSG3RqpGQzp6GwlzNOmiq&callback=", callback)
     };
     T.TIPS = {
          DEF: "系统繁忙，请稍后再试",
          empty: "Value missing.",
          type: "Type mismatch.",
          mismatch: "Pattern mismatch.",
          minlength: "Too short.",
          maxlength: "Too long.",
          min: "Too small.",
          max: "Too big.",
          step: "Step mismatch.",
          error: "Custom error.",
          unique: "This account is not available.",
          placeholder: ""
     };
     T.RE = {
          number: /^\d+$/,
          mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
          tel: /^(\d{3,4}-)\d{7,8}$/,
          email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          mobile_email: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          mobile_email_uname: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,
          code: /^[0-9]{6}$/,
          qq: /^[0-9]{5,13}$/,
          pwd: /^\S{6,16}$/,
          uri: /^[a-zA-z]+:\/\/[^\s]*$/,
          url: /^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,
          date: /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,
          time: /sdf/,
          datetime: /asd/,
          uname: /^[a-zA-Z]\w{5,15}$/,
          nonempty: /\S/,
          expedited_zone: /^广东省\^深圳市\^南山区|^广东省\^深圳市\^福田区/,
          quantity: /^数量|数量$/,
          inviter: /^(\s*|DB\d{4}|B\d{3})$/i,
          size: /\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i
     };
     T.BC = {
          Trident: "",
          Gecko: "",
          Presto: "",
          Webkit: "",
          Blink: ""
     };
     T.UA = navigator.userAgent.toLowerCase();
     T.WB = {
          IE: !T.IS.EL,
          IE6: !T.IS.fixed,
          IE7: T.IS.fixed && !T.IS.DM,
          IE8: T.IS.DM && !T.IS.CVS,
          IE9: T.IS.CVS && !T.IS.FR,
          GC: /.*(chrome)\/([\w.]+).*/.test(T.UA),
          SF: /.*version\/([\w.]+).*(safari).*/.test(T.UA),
          FF: /.*(firefox)\/([\w.]+).*/.test(T.UA),
          OP: /(opera).+version\/([\w.]+)/.test(T.UA),
          UC: /.*version\/([\w.]+).*(safari).*/.test(T.UA)
     };
     T.EVENTS = {
          input: "undefined" == typeof document.body.oninput ? "propertychange" : "input"
     };
     T.setHash = function(value) {
          location.hash = T.WB.SF ? encodeURIComponent(value) : value
     };
     T.UUID = Utils.uuid;
     T.GetFileUrl = function() {
          var str = T.UUID() + (new Date).getTime() + "" + Math.random();
          return T.MD5(Math.random() + T.MD5(str) + Math.random())
     };
     T.Typeof = Utils.type;
     T.Each = Utils.each;
     T.Inherit = Utils.extend;
     T.ConvertToQueryString = function(options) {
          var params = [];
          for (var o in options) options.hasOwnProperty(o) && params.push(o + "=" + encodeURIComponent("object" == typeof options[o] ? T.JSON.stringify(options[o]) : options[o]));
          return params.join("&")
     };
     T.RandomString = function(len, readable) {
          len = len || 6;
          var chars = readable ? "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
               count = chars.length,
               str = "";
          for (i = len; i > 0; i--) str += chars.charAt(Math.floor(Math.random() * count));
          return str
     };
     T.GetStrLength = function(str) {
          str = str || "";
          var cArr = str.match(/[^\x00-\xff]/gi);
          return str.length + (null == cArr ? 0 : cArr.length)
     };
     T.GetEllipsis = function(str1, str2, length) {
          if (!str1) return "";
          if ("Number" == T.Typeof(str2)) {
               length = str2;
               str2 = ""
          }
          str2 = str2 || "";
          length = length || 56;
          var str1Length = T.GetStrLength(str1),
               str2Length = T.GetStrLength(str2);
          if (str1Length > length - str2Length) {
               for (var arr = str1.split(""), strLength = 0, i = 0, l = arr.length; l > i; i++) {
                    strLength += T.GetStrLength(arr[i]);
                    if (strLength > length - str2Length) {
                         arr = arr.slice(0, i);
                         break
                    }
               }
               var reg = /[\uff0c|\u3002|\u3001|\uff1b|\u201d|\u201c|\uff08|\uff09]/;
               reg.test(arr[arr.length - 1]) && arr.pop();
               return arr.join("") + "..."
          }
          return str1
     };
     T.Eval = function(str) {
          return new Function("return " + str)()
     };
     T.Array = {
          add: function(arr, value, redo, key) {
               if (redo) {
                    arr.push(value);
                    return arr
               }
               var bool = !1,
                    isKey = "undefined" == typeof key || "" === key;
               T.Each(arr, function(k, v) {
                    (isKey && v == value || !isKey && v[key] == value[key]) && (bool = !0)
               });
               bool || arr.push(value);
               return arr
          },
          get: function(arr, value, key) {
               var ret = null;
               if ("undefined" == typeof value || "undefined" == typeof key || "" === key) return ret;
               T.Each(arr, function(k, v) {
                    if (v[key] == value) {
                         ret = v;
                         return !1
                    }
               });
               return ret
          },
          remove: function(arr, value, key) {
               var ret = null;
               if ("undefined" == typeof value) return ret;
               T.Each(arr, function(k, v) {
                    v == value ? arr.splice(k, 1) : v && v[key] == value && arr.splice(k, 1)
               });
               return ret
          },
          set: function(arr, value, key) {
               if (!arr || "undefined" == typeof value || "undefined" == typeof key || "" === key) return arr;
               T.Each(arr, function(k, v) {
                    v[key] == value[key] && (arr[k] = value)
               });
               return arr
          },
          indexOf: function(arr, value, key) {
               var ret = -1,
                    bool = "undefined" == typeof key || "" === key;
               T.Each(arr, function(k, v) {
                    if (bool ? v == value : v[key] == value) {
                         ret = k;
                         return !1
                    }
               });
               return ret
          },
          check: function(arr, values, key, def) {
               if (!T.Typeof(arr, /Array/) || "undefined" == typeof values || "undefined" == typeof key || "" === key) return values || [];
               T.Typeof(values, /Array/) && (values = values.join(";"));
               var count = 0,
                    _values = "";
               T.Each(arr, function(i, v) {
                    if ((";" + values + ";").indexOf(";" + v[key] + ";") >= 0) {
                         arr[i].CHECKED = 1;
                         _values += ";" + v[key];
                         count++
                    } else arr[i].CHECKED = 0
               });
               if (0 === count && def && arr[0]) {
                    arr[0].CHECKED = 1;
                    _values += ";" + arr[0][key]
               }
               return (_values ? _values.substring(1) : "").split(";")
          }
     };
     T.FormatData = function(s, bool) {
          if (T.Typeof(s, /Object/)) {
               var o = {};
               T.Each(s, function(k, v) {
                    k = "" + k;
                    var key = k.replace(/[A-Z]/g, function(ch) {
                         return (bool ? "" : "_") + String.fromCharCode(32 | ch.charCodeAt(0))
                    });
                    o[key] = T.Typeof(v, /Object|Array/) ? T.FormatData(v) : v
               });
               return o
          }
          if (T.Typeof(s, /Array/)) {
               var o = [];
               T.Each(s, function(k, v) {
                    o.push(T.FormatData(v))
               });
               return o
          }
          s = "" + s;
          return s.replace(/[A-Z]/g, function(ch) {
               return "_" + String.fromCharCode(32 | ch.charCodeAt(0))
          })
     };
     T.Module = function(baseClass) {
          function superClass() {
               var _this = this,
                    _render = _this.render,
                    _events = _this.events;
               _this.initialize = function(options) {
                    options = options || {};
                    _render = options.render || _render, _events = options.events || _events;
                    _this.data = T.Inherit(_this.data || {}, options.data || {});
                    _this.action = options.action || _this.action || "";
                    _this.params = options.params || _this.params || {};
                    _this.status = options.status || _this.status || [];
                    _this.template = options.template || _this.template || "";
                    _this.callbacks = options.callbacks || _this.callbacks || {};
                    _this.$cont && _this.$cont[0] || (_this.$cont = $("#template-" + _this.template + "-view"));
                    _this.events(_events);
                    _this.init && _this.init.apply(_this, arguments);
                    return _this
               };
               _this.compiler = function(tmplId, data, viewId) {
                    data = data || {};
                    data.RMB = T.RMB;
                    data.Number = Number;
                    data.CFG = T.CFG || {};
                    data.DOING = T.DOING;
                    data.DOMAIN = T.DOMAIN || {};
                    data.DeliveryDate = T.DeliveryDate;
                    viewId = viewId || tmplId;
                    var temp = document.getElementById("template-" + tmplId),
                         view = document.getElementById("template-" + viewId + "-view");
                    temp && view && (view.innerHTML = Utils.Compiler.templateNative("template-" + tmplId, data));
                    return view
               };
               _this.bindData = function(k, data) {
                    k = k ? k + "-" : "";
                    T.Each(data, function(key, value) {
                         if (T.Typeof(value, /array|Object/)) T.BindData(k + key, value);
                         else {
                              var obj = document.getElementById(k + key);
                              if (obj) {
                                   var tn = ("" + obj.tagName).toLowerCase();
                                   value = "undefined" == typeof value ? "" : value;
                                   value = /price/i.test(key) ? T.RMB(value) : value;
                                   if (/input|textarea/.test(tn)) obj.value = value;
                                   else if (/img/.test(tn)) obj.src = value;
                                   else if (/select/.test(tn)) {
                                        obj.src = value;
                                        for (var options = obj.options, o = 0; o < options.length; o++) options[o].value.Trim() == value && (options[o].selected = !0)
                                   } else obj.innerHTML = value
                              }
                         }
                    })
               };
               _this.render = function(data) {
                    data = data || _this.data;
                    _render ? _render.call(_this, data) : _this.template && _this.compiler(_this.template, data);
                    T.Loaded(_this.$cont)
               };
               _this.events = function(events) {
                    T.Each(events, function(selector, handler) {
                         var match = selector.match(/^(\S+)\s*(.*)$/),
                              eventName = match[1];
                         selector = match[2];
                         eventName += "." + _this.mid;
                         "string" == typeof handler && (handler = _this[handler]);
                         if ("function" == typeof handler) {
                              var _handler = function(e, data) {
                                   handler.call(_this, $(this), e, data)
                              };
                              selector ? _this.$cont.undelegate(selector, eventName).delegate(selector, eventName, _handler) : _this.$cont.off(eventName).on(eventName, _handler)
                         }
                    })
               };
               _this.loaded = function(data, params, callback) {
                    if ("function" == typeof callback) callback.apply(_this, arguments);
                    else if ("number" == typeof callback) {
                         _this.status[callback] = 1;
                         if (_this.status.length === _this.status.join("").length) {
                              _this.render(_this.data);
                              _this.complete && _this.complete.apply(_this, arguments)
                         }
                    } else {
                         _this.render(_this.data);
                         _this.complete && _this.complete.apply(_this, arguments)
                    }
               };
               return _this
          }

          function _module(subClass) {
               superClass.call(baseClass);
               return baseClass.initialize.apply(baseClass, arguments)
          }
          T.Module.mid = (T.Module.mid || 0) + 100;
          return _module
     };
     T.LoadImage = function(imgsrc, success, failure, retry) {
          var _this = this;
          if (imgsrc) {
               retry = parseInt(retry || 0) || 0;
               var img = new Image;
               img.onload = function() {
                    var nw = img.naturalWidth || img.width,
                         nh = img.naturalHeight || img.height;
                    400 == nw && 300 == nh ? img.onerror() : "function" == typeof success && success.call(_this, imgsrc, nw, nh)
               };
               img.onabort = img.onerror = function() {
                    if (retry) {
                         retry--;
                         _this.LoadImage(imgsrc, success, failure, retry)
                    } else "function" == typeof failure && failure.call(_this, imgsrc)
               };
               img.src = imgsrc
          }
     };
     T.SetCounter = function($dom, options) {
          return new Counter($($dom), options)
     };
     $.fn.counter = function(params) {
          return this.each(function() {
               $(this).data("counter", new Counter($(this), params))
          })
     };
     T.Loaded = function($cont) {
          $cont || ($cont = $("body"));
          $cont.removeClass("load")
     };
     T.REQUEST = T.getRequest();
     T.DragDrop = function(options) {
          return new Utils.DragDrop(options)
     };
     T.CheckAOuth = function() {
          if (T._STORE && T._SNICKNAME) {
               var usid = T._USID,
                    account = T._ACCOUNT;
               T.LoginAfter();
               if (account && usid != T._USID) {
                    T.alt("账号：" + account + " 登录超时，被退出，请重新登录", function(_o) {
                         location.reload()
                    }, function(_o) {
                         location.reload()
                    });
                    return !0
               }
          }
     };
     T.GET = function(options, _failure, _error) {
          if (options && options.action) {
               var params = options.params || {},
                    jsoncallback = params.jsoncallback || T.UUID().toUpperCase();
               window[jsoncallback] && (jsoncallback = T.UUID().toUpperCase());
               /^http/.test(options.action) || (options.action = T.DOMAIN.ACTION + options.action);
               params.jsoncallback = jsoncallback;
               T._STORE && T._USID && !options.issid && (params.sid = T._USID);
               T._STORE && "undefined" == typeof params.source && T._SNICKNAME && !params.issource && (params.source = T._SNICKNAME);
               if (!T.CheckAOuth()) {
                    var _params = params;
                    _params.ininin || (_params.ininin = T.UUID().toUpperCase());
                    options.action += (options.action.indexOf("?") < 0 ? "?" : "&") + T.ConvertToQueryString(_params);
                    var script = document.createElement("script");
                    script.defer = "defer";
                    script.async = "async";
                    window[jsoncallback] = function(response) {
                         try {
                              options.data = response;
                              T.callback(options, _failure, _error)
                         } catch (e) {} finally {
                              script && script.parentNode && script.parentNode.removeChild && script.parentNode.removeChild(script);
                              setTimeout(function() {
                                   window[jsoncallback] = "ininin"
                              }, 100)
                         }
                    };
                    document.documentElement.appendChild(script);
                    script.src = options.action
               }
          }
     };
     T.POST = function(options, _failure, _error) {
          if (options && options.action) {
               T.POST.zIndex = (T.POST.zIndex || 0) + 1;
               options.params = options.params || {};
               T._STORE && T._USID && !options.issid && (options.params.sid = T._USID);
               T._STORE && "undefined" == typeof options.params.source && T._SNICKNAME && !options.issource && (options.params.source = T._SNICKNAME);
               if (!T.CheckAOuth()) {
                    /^http/.test(options.action) || (options.action = T.DOMAIN.ACTION + options.action);
                    options.action += (options.action.indexOf("?") > 0 ? "&" : "?") + "ininin=" + T.UUID().toUpperCase();
                    var iframe, form = T.DOM.create("form", {
                         target: "piframe_" + T.POST.zIndex,
                         action: options.action,
                         method: "post",
                         style: "display:none"
                    });
                    try {
                         iframe = document.createElement('<iframe name="piframe_' + T.POST.zIndex + '">')
                    } catch (ex) {
                         iframe = T.DOM.create("iframe", {
                              name: "piframe_" + T.POST.zIndex,
                              src: "#",
                              style: "display:none"
                         })
                    }
                    if (iframe) {
                         iframe.style.display = "none";
                         document.body.appendChild(iframe);
                         document.body.appendChild(form);
                         var formdata = options.params;
                         T.Each(formdata, function(k, v) {
                              /password$|pwd$/i.test(k) && (v = "agent_pwd" == k ? T.MD5(v) : T.MD5(T.MD5(v)));
                              form.appendChild(T.DOM.create("input", {
                                   type: "hidden",
                                   name: k,
                                   value: "object" == typeof v ? T.JSON.stringify(v) : v
                              }))
                         });
                         iframe.callback = function(o) {
                              iframe.parentNode.removeChild(iframe), form.parentNode.removeChild(form), iframe = form = null;
                              options.data = o;
                              T.callback(options, _failure, _error)
                         };
                         options.before && options.before(form, iframe);
                         form.submit()
                    }
               }
          }
     };
     T.callback = function(options, _failure, _error) {
          if (options && T.Typeof(options.data, /Object/))
               if (0 == options.data.result && T.Typeof(options.data.data, /Object/)) 0 == options.data.data.result ? options.success && options.success(options.data.data, options.params) : options.data.data.result > 0 ? options.failure ? options.failure(options.data.data, options.params) : T.alt(options.data.data.msg || T.TIPS.DEF, function(_this) {
                    _this.remove()
               }, function() {}) : options.error ? options.error(options.data.data, options.params) : T.alt(T.TIPS.DEF, function(_this) {
                    _this.remove()
               }, function() {});
               else if (3 == options.data.result)
               if (_failure) _failure(options.data, options.params);
               else {
                    T.UnCookie();
                    T.NotLogin()
               }
          else options.data.result > 0 ? _failure ? _failure(options.data, options.params) : T.alt(options.data.msg || T.TIPS.DEF, function(_this) {
               _this.remove()
          }, function() {}) : _error ? _error(options.data, options.params) : T.alt(T.TIPS.DEF, function(_this) {
               _this.remove()
          }, function() {});
          else _error && _error(options.data, options.params)
     };
     T.Popup = Utils.Popover;
     T.msg = function(text, isDone) {
          var dom = document.getElementById("msg_tip");
          dom && dom.parentNode.removeChild(dom);
          if (!isDone) {
               dom = document.body.appendChild(document.createElement("div"));
               dom.id = "msg_tip";
               dom.className = "msg_tip";
               dom.innerHTML = "<dl><dt></dt><dd>" + text + "</dd></dl>";
               var w = $(window).width(),
                    h = $(window).height();
               dom.style.top = (h - dom.offsetHeight) / 2 + "px";
               dom.style.left = (w - dom.offsetWidth) / 2 + "px";
               setTimeout(function() {
                    $(dom).animate({
                         opacity: 0
                    }, 300, function() {
                         $(dom).remove()
                    })
               }, 1200)
          }
     };
     T.loading = function(isDone, duration, text) {
          function _setProgress(step) {
               var node = document.getElementById("loading_shading_progress");
               if (node && step) {
                    step--;
                    node.style.width = 100 - step + "%";
                    step > 2 && setTimeout(function() {
                         _setProgress(step)
                    }, duration / 100)
               }
          }
          var dom = document.getElementById("loading_shading");
          if (dom)
               if ("number" == typeof duration) {
                    _setProgress(1);
                    setTimeout(function() {
                         dom.parentNode.removeChild(dom)
                    }, 300)
               } else dom.parentNode.removeChild(dom);
          if (!isDone) {
               dom = document.body.appendChild(document.createElement("dl"));
               dom.id = "loading_shading";
               dom.className = "loading_shading";
               if ("number" == typeof duration) {
                    dom.innerHTML = '<dt></dt><dd class="load_progress"><table cellpadding="0" cellspacing="0"><tr><td><div class="progress_box"><p class="text">' + (text || "") + '</p><div class="progress"><div id="loading_shading_progress"></div></div></div></td></tr></table></dd>';
                    _setProgress(100)
               } else dom.innerHTML = "<dt></dt><dd></dd>"
          }
     };
     T.contains = function(root, el) {
          if (!root || !el || 1 !== root.nodeType || 1 !== el.nodeType) return !1;
          if (root.compareDocumentPosition) return root === el || !!(16 & root.compareDocumentPosition(el));
          if (root.contains) return root.contains(el);
          for (; el = el.parentNode;) return el === root ? !0 : !1
     };
     T.TIP = function(options, isRemove) {
          function TIP() {
               var _this = this;
               if (options.container && options.content && options.trigger) {
                    options["max-width"] = options["max-width"] || "";
                    options.width = options.width || "";
                    /^\d+$/.test(options["max-width"]) && (options["max-width"] += "px");
                    /^\d+$/.test(options.width) && (options.width += "px");
                    options.offsetX = parseInt(options.offsetX, 10) || 0;
                    options.offsetY = parseInt(options.offsetY, 10) || 0;
                    _this.options = options || {};
                    _this.container = options.dom || document.body || document.documentElement;
                    _this.trigger = null;
                    _this.load = function() {
                         var dom = document.getElementById(options.id);
                         dom && dom.parentNode.removeChild(dom);
                         var text = "function" == typeof _this.options.content ? _this.options.content(_this.trigger) || "" : _this.options.content;
                         if (text) {
                              _this.dom = document.createElement("div");
                              options.id && (_this.dom.id = options.id);
                              _this.dom.className = "tips " + (_this.options.style || "");
                              "" !== options["max-width"] && (_this.dom.style["max-width"] = _this.options["max-width"]);
                              "" !== options.width && (_this.dom.style.width = _this.options.width);
                              _this.container.appendChild(_this.dom);
                              _this.dom.innerHTML = text;
                              _this.options.callback && _this.options.callback.call(_this, _this);
                              _this.setPosition()
                         }
                    };
                    _this.setPosition = function() {
                         if (_this.dom && _this.trigger) {
                              var offset = T.DOM.offset(_this.trigger),
                                   domWH = T.DOM.getSize(_this.dom),
                                   tgrWH = T.DOM.getSize(_this.trigger),
                                   _offset = $(_this.container).offset() || {
                                        top: 0,
                                        left: 0
                                   },
                                   _left = 0,
                                   _top = 0;
                              if ($(options.dom).length) {
                                   _left = $(document).scrollLeft();
                                   _top = $(document).scrollTop()
                              }
                              _this.dom.style.top = offset.top + tgrWH.h + _this.options.offsetY - _offset.top + _top + "px";
                              var _x = parseInt(T.DOM.attr(_this.trigger, "x"), 10) || 0 - _offset.left + _left;
                              _this.options.left ? _this.dom.style.left = offset.left + _x + _this.options.offsetX + "px" : _this.dom.style.left = offset.left + _x + tgrWH.w - domWH.w + _this.options.offsetX + "px";
                              $(_this.dom).bind("mouseenter", _this.mouseenter).bind("mouseleave", _this.mouseleave)
                         }
                    };
                    _this.show = function() {
                         _this.dom && (_this.dom.style.display = "block")
                    };
                    _this.hide = function() {
                         _this.dom && (_this.dom.style.display = "none")
                    };
                    _this.remove = function() {
                         if (_this.dom && _this.dom.parentNode) {
                              _this.dom.parentNode.removeChild(_this.dom);
                              _this.dom = null
                         }
                    };
                    _this.mouseenter = function(e) {
                         _this.contains(e.fromElement || e.currentTarget) || _this.load()
                    };
                    _this.mouseleave = function(e) {
                         if (!_this.contains(e.toElement || e.relatedTarget)) {
                              _this.remove();
                              _this.trigger = null
                         }
                    };
                    _this.contains = function(toElement) {
                         return T.contains(_this.dom, toElement) || T.contains(_this.trigger, toElement) ? !0 : !1
                    };
                    $(options.container).delegate(options.trigger, "mouseenter", function(e) {
                         _this.trigger = $(this).get(0);
                         _this.mouseenter(e)
                    }).delegate(options.trigger, "mouseleave", function(e) {
                         _this.trigger = $(this).get(0);
                         _this.mouseleave(e)
                    })
               }
          }
          return new TIP
     };
     T.FORM = function(f, cfg, fns) {
          function Form(form, options, funs) {
               var _this = this;
               if (form && options) {
                    _this.form = "string" == typeof form ? document.getElementById(form) : form;
                    _this.options = options;
                    _this.funs = funs;
                    if (_this.form && options.action) {
                         _this.action = options.action;
                         _this.items = {};
                         _this.indexs = [];
                         _this.caches = {};
                         _this.cacheForm = document.createElement("form");
                         _this.cacheForm.style.display = "none";
                         _this.init()
                    }
               }
          }
          Form.prototype = {
               init: function() {
                    var _this = this;
                    _this.form.novalidate = "novalidate";
                    _this.submitting = !1;
                    _this.funs.before && (_this.before = _this.funs.before);
                    _this.funs.submit && (_this.submit = _this.funs.submit);
                    _this.funs.after && (_this.after = _this.funs.after);
                    _this.funs.success && (_this.success = _this.funs.success);
                    _this.funs.failure && (_this.failure = _this.funs.failure);
                    _this.funs.error && (_this.error = _this.funs.error);
                    for (var g in _this.options.items)
                         if (_this.options.items.hasOwnProperty(g)) {
                              var _item = _this.options.items[g] || {},
                                   _tips = _item.tips || {},
                                   _evts = _item.evts || {},
                                   item = {};
                              item.tips = {};
                              item.evts = {};
                              for (var t in T.TIPS) T.TIPS.hasOwnProperty(t) && (item.tips[t] = _tips[t] || T.TIPS[t]);
                              item.rule = _item.rule || "";
                              item.unique = _item.unique || !1;
                              item.required = _item.required || !1;
                              item.minlength = _item.minlength || "";
                              item.maxlength = _item.maxlength || "";
                              item.min = _item.min || "";
                              item.max = _item.max || "";
                              item.noplaceholder = _item.noplaceholder || !1;
                              item.inherit = _item.inherit || "";
                              item.depend = _item.depend || "";
                              item.target = _item.target || "";
                              item.from = _item.from || "";
                              item.show = _item.show || "";
                              item.show_rule = _item.show_rule || "";
                              item.pattern = _item.pattern || T.RE[item.rule] || /\S/;
                              item.show_pattern = _item.show_pattern || T.RE[item.show_rule] || /\S/;
                              item.tips.placeholder = item.tips.placeholder || item.tips.empty || "";
                              _evts.valid || (item.evts.valid = _this.valid);
                              _evts.value || (item.evts.value = _this.value);
                              _evts.output || (item.evts.output = _this.output);
                              _this.items[g] = item;
                              var input = _this.input(g);
                              if (input)
                                   if (input.tagName) _this.bind(input);
                                   else
                                        for (var f = 0; f < input.length; f++) _this.bind(input[f]);
                              item.from && _this.showInput(g, item.from)
                         }
                    _this.form.submit = _this.form.onsubmit = function(e) {
                         if (_this.submitting) return !1;
                         var data = _this.validator(!0);
                         if (!data) return !1;
                         _this.params = data;
                         _this.submit.call(_this);
                         return !1
                    }
               },
               input: function(input) {
                    var _this = this;
                    return input ? "string" == typeof input ? _this.form[input] : _this.form[input.name] : void 0
               },
               bind: function(input) {
                    var _this = this;
                    if (input) {
                         var type = input.type;
                         /^textarea$/i.test(input.tagName) && (type = "textarea");
                         if (type) {
                              var name = input.name;
                              if (/^submit$|^button$|^image$/.test(type)) T.DOM.bind(input, "click", function(e) {
                                   _this.form.submit()
                              });
                              else if (/^reset$/.test(type));
                              else if (name) {
                                   var item = _this.items[name] || {};
                                   item.type = type;
                                   item.name = name;
                                   item.tips = item.tips || {};
                                   T.DOM.bind(input, "invalid", function(e) {
                                        T.DOM.stopPropagation(e);
                                        T.DOM.preventDefault(e)
                                   });
                                   if (/^text$|^textarea$|^password$/.test(type)) {
                                        /email/.test(item.rule) && T.Mailfix({
                                             inputs: [input]
                                        });
                                        item.noplaceholder || _this.placeholder(input, item.tips.placeholder);
                                        T.DOM.bind(input, "focus", function(e) {
                                             T.DOM.addClass(T.DOM.closest(input, "label"), "focus");
                                             _this.isEnd = T.Array.indexOf(_this.indexs, item.name) >= _this.indexs.length
                                        });
                                        T.DOM.bind(input, "blur", function(e) {
                                             T.DOM.removeClass(T.DOM.closest(input, "label"), "focus");
                                             _this.showInput(item.show, item.name);
                                             if (item.rule) {
                                                  item.value = item.evts.value.call(_this, input);
                                                  var data = item.evts.valid.call(_this, input);
                                                  item.evts.output.call(_this, input, data);
                                                  _this.validator();
                                                  var params = {};
                                                  params[name] = item.value;
                                                  data && data.ret && item.unique && item.unique_value != item.value && T.POST({
                                                       action: item.unique,
                                                       params: params,
                                                       success: function(data) {
                                                            item.unique_value = item.value;
                                                            item.uniqued = !0;
                                                            item.evts.output.call(_this, input, {
                                                                 ret: !0,
                                                                 msg: ""
                                                            });
                                                            _this.validator()
                                                       },
                                                       failure: function(data) {
                                                            item.uniqued = !1;
                                                            item.unique_value = item.value;
                                                            item.evts.output.call(_this, input, {
                                                                 ret: !1,
                                                                 msg: ("function" == typeof item.tips.unique ? item.tips.unique.call(_this, item) : item.tips.unique) || ""
                                                            })
                                                       },
                                                       error: function() {
                                                            item.uniqued = !1;
                                                            T.alt(data.msg || T.TIPS.DEF, function(_o) {
                                                                 _o.remove()
                                                            })
                                                       }
                                                  })
                                             }
                                        });
                                        var isKeyup = !0;
                                        T.DOM.bind(input, "keyup", function(e) {
                                             e = e || event;
                                             isKeyup = !0
                                        });
                                        _this.options.prevent || T.DOM.bind(input, "keydown", function(e) {
                                             e = e || event;
                                             if (!/^textarea$/.test(type) && isKeyup) {
                                                  isKeyup = !1;
                                                  var keycode = e.keyCode || e.which,
                                                       currIndex = T.Array.indexOf(_this.indexs, item.name);
                                                  if (13 === keycode) {
                                                       item.show && _this.showInput(item.show, item.name);
                                                       var nextName = _this.indexs[currIndex + 1],
                                                            data = item.evts.valid.call(_this, input);
                                                       if (data && data.ret) {
                                                            var nextInput = _this.input(nextName);
                                                            if (nextInput) {
                                                                 _this.isEnd = !1;
                                                                 "function" == typeof nextInput.focus && nextInput.focus()
                                                            } else {
                                                                 _this.isEnd = !0;
                                                                 _this.form.submit()
                                                            }
                                                       }
                                                  }
                                             }
                                        });
                                        input.removeAttribute && input.removeAttribute("placeholder")
                                   } else if (/^radio$|^checkbox$|^select/.test(type)) {
                                        _this.checked.call(_this, input, !1);
                                        _this.checkall.call(_this, input, item);
                                        T.DOM.bind(input, /^select/.test(item.type) ? "change" : "click", function(e) {
                                             _this.checked.call(_this, input, !1);
                                             _this.showInput(item.show, item.name);
                                             /all$/.test(name) && _this.checkall.call(_this, input, item);
                                             if (item.rule) {
                                                  item.value = item.evts.value.call(_this, input, item);
                                                  item.evts.output.call(_this, input, item.evts.valid.call(_this, input, item));
                                                  _this.validator()
                                             }
                                        })
                                   }
                                   if (_this.items[name]) {
                                        _this.items[name] = item;
                                        _this.indexs.push(name)
                                   }
                              }
                         }
                    }
               },
               showInput: function(name, targetName, on) {
                    var _this = this;
                    if (null != name) {
                         var names = String(name).split("|");
                         if (names && names.length > 1)
                              for (var i = names.length - 1; i >= 0; i--) _this.showInput(names[i], targetName, on);
                         var input = _this.input(name),
                              item = _this.items[name];
                         if ("undefined" == typeof on) {
                              targetName = targetName || item.from;
                              if (!item || !targetName) return;
                              var targetInput = _this.input(targetName),
                                   targetItem = _this.items[targetName];
                              if (!targetInput || !targetItem || !targetItem.show_pattern) return;
                              on = targetItem.show_pattern.test(_this.value(targetName))
                         }
                         var idx = T.Array.indexOf(_this.indexs, name),
                              targetIdx = T.Array.indexOf(_this.indexs, targetName);
                         if (on) {
                              if (0 > idx && targetIdx >= 0 && _this.caches[name]) {
                                   _this.indexs.splice(targetIdx + 1, 0, name);
                                   var targetInput = _this.input(targetName);
                                   targetInput.tagName || (targetInput = targetInput[0]);
                                   T.DOM.insertAfter(_this.caches[name], T.DOM.closest(targetInput, ".form_item"));
                                   "function" == typeof _this.form[name].focus && _this.form[name].focus();
                                   _this.items[name].disabled = !1
                              }
                         } else if (input) {
                              var node = T.DOM.closest(input, ".form_item");
                              T.DOM.removeClass(node, "hide");
                              if (idx > 0 && targetIdx >= 0 && node) {
                                   _this.indexs.splice(idx, 1);
                                   _this.caches[name] = node;
                                   _this.cacheForm.appendChild(_this.caches[name]);
                                   _this.items[name].disabled = !0
                              }
                         }
                    }
               },
               checked: function(input, item) {
                    var _this = this,
                         checked = input.checked;
                    if (/^checkbox/.test(input.type)) {
                         checked ? T.DOM.addClass(input.parentNode, "sel") : T.DOM.removeClass(input.parentNode, "sel");
                         var bool = !0,
                              boxs = _this.input(input.name);
                         if (!boxs || !boxs.length) return;
                         for (var len = boxs.length, j = 0; len > j; j++)
                              if (!boxs[j].checked) {
                                   bool = !1;
                                   j = len
                              }
                         var alls = _this.input(input.name + "all");
                         if (!alls || !alls.length) return;
                         for (var len = alls.length, k = 0; len > k; k++) {
                              alls[k].checked = bool;
                              bool ? T.DOM.addClass(alls[k].parentNode, "sel") : T.DOM.removeClass(alls[k].parentNode, "sel")
                         }
                    }
                    if (/^radio/.test(input.type) && checked) {
                         checked ? T.DOM.addClass(input.parentNode, "sel") : T.DOM.removeClass(input.parentNode, "sel");
                         var boxs = _this.input(input.name);
                         if (!boxs || !boxs.length) return;
                         for (var len = boxs.length, h = 0; len > h; h++) {
                              T.DOM.removeClass(boxs[h].parentNode, "sel");
                              boxs[h].checked = !1
                         }
                         input.checked = !0;
                         T.DOM.addClass(input.parentNode, "sel")
                    }
               },
               checkall: function(input, item, options) {
                    var _this = this;
                    if (/^checkbox/.test(input.type)) {
                         var checked = input.checked,
                              boxs = _this.input(input.name.replace(/all$/, ""));
                         if (!boxs || !boxs.length) return;
                         for (var len = boxs.length, j = 0; len > j; j++) {
                              boxs[j].checked = checked;
                              checked ? T.DOM.addClass(boxs[j].parentNode, "sel") : T.DOM.removeClass(boxs[j].parentNode, "sel")
                         }
                         var alls = _this.input(input.name.replace(/all$/, "") + "all");
                         if (!alls || !alls.length) return;
                         for (var len = alls.length, k = 0; len > k; k++) {
                              alls[k].checked = checked;
                              checked ? T.DOM.addClass(alls[k].parentNode, "sel") : T.DOM.removeClass(alls[k].parentNode, "sel")
                         }
                    }
               },
               valid: function(input, item, isDepend) {
                    var _this = this,
                         name = input.name ? input.name : input;
                    input = _this.input(name);
                    item = item || _this.items[name] || {};
                    var data = {
                         ret: !1,
                         msg: item.tips.error || ""
                    };
                    item.tips = item.tips || {};
                    if (!input) return data;
                    if (!name) return data;
                    var value = _this.value(name);
                    if (!item) return data;
                    if ("undefined" != typeof item.uniqued && item.unique_value == item.value && !item.uniqued) return {
                         ret: !1,
                         msg: ("function" == typeof item.tips.unique ? item.tips.unique.call(_this, item) : item.tips.unique) || ""
                    };
                    if (item.inherit && "" === value) {
                         value = _this.value(item.inherit);
                         return "" === value ? {
                              ret: !1,
                              msg: item.tips.error || ""
                         } : {
                              ret: !0,
                              msg: ""
                         }
                    }
                    if (item.depend && !isDepend) {
                         var depend_input = _this.input(item.depend);
                         if (depend_input) {
                              var _vd = _this.valid(depend_input, null, !0) || {},
                                   depend_value = _this.value(item.depend);
                              if (!_vd || !_vd.ret || "" !== depend_value && "" === value || "" === depend_value && "" !== value) return {
                                   ret: !1,
                                   msg: _vd.msg || item.tips.empty || ""
                              }
                         }
                    }
                    if ("" === value) return {
                         ret: !item.required || !1,
                         msg: item.required ? item.tips.empty || "" : ""
                    };
                    if ("same" === item.rule) {
                         var _value = _this.value(item.target);
                         return _value === value ? {
                              ret: !0,
                              msg: ""
                         } : {
                              ret: !1,
                              msg: item.tips.same || ""
                         }
                    }
                    return "number" === item.rule ? /^[1-9]\d*\.?\d*$/.test(value) || /^0\.?\d*$/.test(value) ? item.min && value < item.min ? {
                         ret: !1,
                         msg: item.tips.min || ""
                    } : item.max && value > item.max ? {
                         ret: !1,
                         msg: item.tips.max || ""
                    } : {
                         ret: !0,
                         msg: ""
                    } : {
                         ret: !1,
                         msg: item.tips.type || ""
                    } : item.minlength && value.length < item.minlength ? {
                         ret: !1,
                         msg: item.tips.minlength || ""
                    } : item.maxlength && value.length > item.maxlength ? {
                         ret: !1,
                         msg: item.tips.maxlength || ""
                    } : item.pattern ? item.pattern.test(value) ? {
                         ret: !0,
                         msg: item.tips.ok || ""
                    } : {
                         ret: !1,
                         msg: item.tips.mismatch || ""
                    } : {
                         ret: !1,
                         msg: item.tips.error || ""
                    }
               },
               validator: function(isSubmit) {
                    var _this = this,
                         params = {};
                    for (var o in _this.items)
                         if (_this.items.hasOwnProperty(o)) {
                              var item = _this.items[o] || {},
                                   input = _this.input(o);
                              if (!item.disabled) {
                                   if (item.from) {
                                        var from = _this.items[item.from],
                                             bool = from.show_pattern.test(_this.value(item.from));
                                        if (!bool) continue
                                   }
                                   if (isSubmit && !input && item.required) {
                                        T.msg(item.tips.empty);
                                        params = null;
                                        break
                                   }
                                   var value = _this.value(o);
                                   params[o] = value;
                                   if (!item.rule) {
                                        params = null;
                                        break
                                   }
                                   var _vd = _this.valid(o) || {};
                                   if (!_vd.ret) {
                                        if (isSubmit && _vd.msg) {
                                             input && input.focus && input.focus();
                                             T.msg(_vd.msg)
                                        }
                                        params = null;
                                        break
                                   }
                              }
                         }
                    params ? T.DOM.removeClass(_this.form, "dis") : T.DOM.addClass(_this.form, "dis");
                    return params
               },
               output: function(input, data) {
                    var _this = this;
                    input = _this.input(input.name);
                    if (input && data) {
                         input.length >= 0 && (input = input[0]);
                         if (input) {
                              var formItem = T.DOM.closest(input, ".form_item");
                              if (formItem) {
                                   var msg = T.DOM.find(formItem, "i.msg")[0];
                                   msg && (msg.innerHTML = data.msg);
                                   data.ret ? T.DOM.removeClass(formItem, "error") : T.DOM.addClass(formItem, "error")
                              }
                         }
                    }
               },
               value: function(input, item) {
                    var _this = this;
                    input = _this.input(input);
                    if (input) {
                         var name = input.name || input[0].name;
                         if (name) {
                              item = item || _this.items[name];
                              if (item) {
                                   var value = "";
                                   if (/^select/.test(item.type)) {
                                        if (!input.disabled) {
                                             if (input.options)
                                                  for (var options = input.options, o = 0; o < options.length; o++) options[o].selected && (value += "," + options[o].value.Trim());
                                             value = value ? value.substring(1) : value
                                        }
                                   } else if (/^checkbox$|^radio$/.test(item.type))
                                        if (input.length) {
                                             for (var i = 0; i < input.length; i++) input[i].checked && !input[i].disabled && (value += "," + input[i].value.Trim());
                                             value = value ? value.substring(1) : value
                                        } else input.checked && !input.disabled && (value = input.value.Trim());
                                   else input.disabled || "undefined" == typeof input.value || (value = input.value.Trim());
                                   return value
                              }
                         }
                    }
               },
               setData: function(data) {
                    var _this = this;
                    for (var o in data) data.inputs.hasOwnProperty(o) && (_this[o] = data[o])
               },
               submit: function(params) {
                    var _this = this;
                    _this.params = _this.params || params;
                    if (_this.params && !_this.submiting) {
                         _this.before && _this.before.call(_this);
                         var _params = {};
                         if (_this.data) {
                              var len = 0;
                              T.Each(_this.params, function(k, v) {
                                   if (_this.params[k] !== _this.data[k]) {
                                        _params[k] = v;
                                        len++
                                   }
                              });
                              if (1 > len) return !1
                         } else _params = _this.params;
                         _this.params = _params;
                         if (_this.action) {
                              T.loading();
                              _this.submiting = !0;
                              T.POST({
                                   action: _this.action,
                                   params: _this.params,
                                   issid: _this.issid,
                                   issource: _this.issource,
                                   success: function(data) {
                                        T.loading(!0);
                                        _this.submiting = !1;
                                        _this.success && _this.success.call(_this, data, _this.params)
                                   },
                                   failure: function(data) {
                                        T.loading(!0);
                                        _this.submiting = !1;
                                        _this.failure && _this.failure.call(_this, data, _this.params)
                                   },
                                   error: function(data) {
                                        T.loading(!0);
                                        _this.submiting = !1;
                                        _this.error && _this.error.call(_this, data, _this.params)
                                   }
                              }, function(data) {
                                   _this.submiting = !1;
                                   T.loading(!0);
                                   3 == data.result ? T.LoginForm() : T.alt(T.TIPS.DEF)
                              }, function(data) {
                                   _this.submiting = !1;
                                   T.loading(!0);
                                   T.alt(T.TIPS.DEF)
                              });
                              _this.after && _this.after(_this)
                         }
                    }
               },
               success: function(data) {
                    var _this = this;
                    _this.submiting = !1;
                    T.loading(!0);
                    T.msg(data.msg || "操作成功。")
               },
               failure: function(data) {
                    var _this = this;
                    _this.submiting = !1;
                    T.loading(!0);
                    T.msg(data.msg || "操作失败！")
               },
               error: function(data) {
                    var _this = this;
                    _this.submiting = !1;
                    T.loading(!0);
                    T.alt(data && data.msg || "Unknown error!", function(_o) {
                         _o.remove();
                         window.location.reload()
                    }, function(_o) {
                         _o.remove();
                         window.location.reload()
                    })
               },
               keydownEnter: function(e, obj) {
                    T.DOM.stopPropagation(e);
                    e = e || event;
                    var keycode = e.keyCode || e.which;
                    13 === keycode && obj.form.submit()
               },
               placeholder: function(o, t) {
                    return function(obj, text) {
                         function _focus(e) {
                              var val = obj.value.Trim();
                              T.DOM.removeClass(obj, "placeholder");
                              _obj.style.display = "none";
                              obj.focus();
                              "" == val && (obj.value = "")
                         }

                         function _blur() {
                              var val = obj.value.Trim();
                              if ("" === val) {
                                   T.DOM.addClass(obj, "placeholder");
                                   T.DOM.addClass(_obj, "placeholder");
                                   _obj.style.cssText = "position:absolute;left:" + obj.offsetLeft + "px;top:" + obj.offsetTop + "px;display:none;_zoom:1;";
                                   _obj.style.display = "";
                                   _obj.value = text
                              } else {
                                   T.DOM.removeClass(obj, "placeholder");
                                   _obj.style.display = "none"
                              }
                         }
                         if (obj) {
                              var _obj = document.createElement(obj.tagName.toLowerCase());
                              _obj.className = obj.className;
                              _obj.setAttribute("autocomplete", "off");
                              "input" === obj.tagName.toLowerCase() && (_obj.type = "text");
                              obj.parentNode.appendChild(_obj);
                              obj.getAttribute("disabled") && _obj.setAttribute("disabled", "disabled");
                              T.DOM.bind(_obj, "focus", _focus);
                              T.DOM.bind(obj, "focus", _focus);
                              T.DOM.bind(obj, "blur", _blur);
                              _blur()
                         }
                    }(o, t)
               }
          };
          return new Form(f, cfg, fns)
     };
     T.Mailfix = function(options) {
          options = options || {};
          var UI = {};
          if (FIXS && FIXS.length && "object" == typeof FIXS) {
               UI.container = document.body || document.documentElement;
               if (UI.container) {
                    UI.inputs = document.getElementsByName(options.name || "mail") || [];
                    options.inputs && UI.inputs.length && (UI.inputs = options.inputs || []);
                    if (UI.inputs && UI.inputs.length) {
                         UI.maxlength = 5;
                         UI.trim = function(str) {
                              return str.replace(/(^\s*)|(\s*$)/g, "")
                         };
                         UI.addEvent = function(target, name, handler) {
                              window.addEventListener ? target.addEventListener(name, handler, !1) : target.attachEvent("on" + name, handler)
                         };
                         UI.stopPropagation = function(e) {
                              e && e.stopPropagation ? e.stopPropagation() : window.event.cancelable = !1
                         };
                         UI.preventDefault = function(e) {
                              e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1
                         };
                         UI.offset = function(obj) {
                              var pos = {
                                        top: 0,
                                        left: 0
                                   },
                                   getPos = function(obj) {
                                        obj && (pos.top += obj.offsetTop, pos.left += obj.offsetLeft, getPos(obj.offsetParent))
                                   };
                              getPos(obj);
                              return pos
                         };
                         UI.closest = function(obj, className) {
                              var _parent = function(o) {
                                   var tn = o.tagName.toUpperCase();
                                   return "HTML" === tn ? null : o.className.indexOf(className) >= 0 ? o : _parent(o.parentNode)
                              };
                              return _parent(obj)
                         };
                         UI.fixs = FIXS;
                         UI.size = FIXS.length;
                         UI.index = 0;
                         UI.items = null;
                         UI.item = null;
                         UI.length = 0;
                         UI.search = function(e) {
                              e = e || window.event;
                              var keycode = e.keyCode || e.which;
                              if (13 != keycode && 38 != keycode && 40 != keycode) {
                                   UI.hide();
                                   this && this.nodeType && (UI.input = this);
                                   var value = UI.trim(UI.input.value || "");
                                   UI.value = value;
                                   if ("" !== UI.value) {
                                        UI.fixs = FIXS;
                                        UI.fix = "";
                                        var idx = UI.value.lastIndexOf("@");
                                        idx > 0 && (UI.fix = UI.value.substring(idx));
                                        if ("" != UI.fix && "undefined" != typeof UI.fix) {
                                             UI.fixs = [];
                                             for (var size = UI.fix.length, o = null, l = 0, i = 0; i < UI.size; i++) {
                                                  o = FIXS[i];
                                                  l = o.length;
                                                  l >= size && UI.fix === o.substring(0, size) && UI.fixs.push(o.substring(size))
                                             }
                                        }
                                        UI.fixs.length && UI.show()
                                   }
                              }
                         };
                         UI.position = function() {
                              var offset = UI.offset(UI.input),
                                   pos = UI.offset(UI.container);
                              UI.dom.style.top = offset.top + UI.input.offsetHeight - pos.top + "px";
                              UI.dom.style.left = offset.left - pos.left + "px"
                         };
                         UI.hover = function() {
                              UI.index = UI.index < 0 ? UI.length - 1 : UI.index;
                              UI.index = UI.index >= UI.length ? 0 : UI.index;
                              for (var i = UI.length - 1; i >= 0; i--) UI.items[i].className = UI.index == i ? "selected" : "";
                              UI.item = UI.items[UI.index];
                              UI.item && (UI._value = UI.item.innerHTML)
                         };
                         UI.keydown = function(e) {
                              if (UI.dom) {
                                   e = e || event;
                                   var keycode = e.keyCode || e.which;
                                   if (13 == keycode) {
                                        UI.item && (UI.input.value = UI.item.innerHTML);
                                        UI.hide()
                                   } else if (38 == keycode) {
                                        UI.preventDefault(e);
                                        UI.index--;
                                        UI.hover()
                                   } else if (40 == keycode) {
                                        UI.preventDefault(e);
                                        UI.index++;
                                        UI.hover()
                                   }
                              }
                         };
                         UI.click = function(e) {
                              var li = this;
                              UI.input.value = li.innerHTML;
                              UI.hide();
                              UI.input.blur()
                         };
                         UI.show = function() {
                              this && this.nodeType && (UI.input = this);
                              UI.selectedIndex = 0;
                              if (UI.dom) {
                                   UI.dom.parentNode.removeChild(UI.dom);
                                   UI.dom = null
                              }
                              UI.dom = document.createElement("div");
                              UI.dom.className = "association";
                              var cont = UI.closest(UI.input, "popup_layer");
                              cont && (UI.container = cont);
                              UI.container.appendChild(UI.dom);
                              T.IS.fixed || (UI.dom.innerHTML = '<div class="popup_opacity"><iframe frameborder="0" scrolling="no"></iframe></div>');
                              UI.list = document.createElement("ul");
                              UI.dom.appendChild(UI.list);
                              UI.dom.style.width = UI.input.offsetWidth - 2 + "px";
                              UI.count = Math.min(UI.fixs.length, UI.maxlength);
                              for (var html = T.RE.mobile.test(UI.value) ? '<li class="selected">' + UI.value + "</li>" : "", i = 0; i < UI.count; i++) html += "<li" + (html ? "" : ' class="selected"') + ">" + UI.value + UI.fixs[i] + "</li>";
                              UI.list.innerHTML = html;
                              UI.position();
                              UI.items = UI.list.getElementsByTagName("li");
                              UI.length = UI.items.length;
                              UI.index = 0;
                              UI.hover();
                              for (var item = null, i = 0; i < UI.length; i++) {
                                   item = UI.items[i];
                                   item.onclick = function() {
                                        return function(e) {
                                             UI.click.call(this, e)
                                        }
                                   }()
                              }
                              UI.dom.onmousedown = function(e) {
                                   UI.stopPropagation(e);
                                   UI.preventDefault(e)
                              };
                              UI.dom.onmouseenter = function(e) {
                                   UI.input.onblur = null
                              };
                              UI.dom.onmouseleave = function(e) {
                                   UI.input.onblur = UI.hide
                              };
                              UI.input.onblur = UI.hide
                         };
                         UI.hide = function(isChange) {
                              if (UI.dom) {
                                   UI.dom.parentNode.removeChild(UI.dom);
                                   UI.dom = null
                              }
                         };
                         for (var len = UI.inputs.length, i = 0; len > i; i++) {
                              UI.inputs[i].onfocus = UI.search;
                              UI.inputs[i].onkeyup = UI.search;
                              UI.inputs[i].onblur = UI.hide;
                              UI.inputs[i].setAttribute("autocomplete", "off")
                         }
                         window.addEventListener ? document.addEventListener("keydown", UI.keydown, !0) : window.attachEvent ? document.attachEvent("onkeydown", UI.keydown) : document.onkeydown = UI.keydown
                    }
               }
          }
     };
     T.GetEmilLoginURL = function(email) {
          var urls = {
                    "139.com": "mail.10086.cn",
                    "wo.com.cn": "mail.wo.cn",
                    "sina.cn": "mail.sina.com.cn",
                    "sina.com": "mail.sina.com.cn",
                    "2008.sina.com": "mail.sina.com.cn",
                    "vip.sina.com": "vip.sina.com.cn",
                    "3g.sina.com": "3g.sina.com.cn",
                    "foxmail.com": "mail.qq.com",
                    "yahoo.com": "login.yahoo.com",
                    "yahoo.com.cn": "login.yahoo.com",
                    "56.com": "www.56.com/home.html",
                    "msn.com": "login.live.com",
                    "hotmail.com": "login.live.com",
                    "live.com": "login.live.com",
                    "aol.com": "my.screenname.aol.com",
                    "ask.com": "www.ask.com",
                    "aim.com": "my.screenname.aol.com",
                    "inbox.com": "www.inbox.com/login.aspx",
                    "tom.com": "web.mail.tom.com",
                    "eyou.com": "www.eyou.com",
                    "googlemail.com": "mail.google.com",
                    "ininin.com": "exmail.qq.com/login/"
               },
               idx = email.indexOf("@");
          if (0 > idx) return "";
          email = email.substring(idx + 1);
          var url = urls[email];
          return url ? "http://" + url : /\w+\.\w+\.\w+/.test(email) ? "http://" + email : "http://mail." + email
     };
     T.Paginbar = function(pagin) {
          function createPageLabel(tag, cla, tit, txt, callback) {
               var obj = document.createElement(tag);
               obj.className = cla;
               obj.title = tit;
               "input" === tag ? obj.value = txt : obj.innerHTML = txt;
               "a" === tag && (obj.href = "javascript:;");
               pagin.paginbar.appendChild(obj);
               callback && (obj.onclick = function(o, i, s, t) {
                    return function(e) {
                         callback(o, i, s, t)
                    }
               }(obj, tit, pagin.size, pagin.total));
               return obj
          }
          pagin = pagin || {};
          pagin.index = parseInt(pagin.index, 10) || 1;
          pagin.total = parseInt(pagin.total, 10) || 1;
          pagin.size = parseInt(pagin.size, 10) || 15;
          pagin.num = parseInt(pagin.num, 10) || 3;
          pagin.index > pagin.total && (pagin.index = 1);
          if (pagin.paginbar) {
               pagin.paginbar = document.getElementById(pagin.paginbar);
               if (pagin.paginbar) {
                    T.DOM.addClass(pagin.paginbar, "hide");
                    pagin.paginbar.innerHTML = "";
                    if (!(pagin.total < 2)) {
                         T.DOM.removeClass(pagin.paginbar, "hide");
                         if (pagin.index > 1) {
                              createPageLabel("a", "start", 1, "首页", pagin.callback);
                              createPageLabel("a", "prev", pagin.index - 1, "上一页", pagin.callback)
                         }
                         if (pagin.total <= 2 * pagin.num + 4)
                              for (var index = 1; index <= pagin.total; index++) index == pagin.index ? createPageLabel("b", "dis", index, index) : createPageLabel("a", "", index, index, pagin.callback);
                         else {
                              var total = Math.min(pagin.index + pagin.num, pagin.total),
                                   index = Math.max(pagin.index - pagin.num, 1),
                                   _left = pagin.index < index + pagin.num,
                                   _right = pagin.index > total - pagin.num,
                                   center = pagin.index >= index + pagin.num && pagin.index <= total - pagin.num;
                              if (center) {
                                   index > 1 && createPageLabel("a", "ellipsis", index, "...", pagin.callback);
                                   for (index; total >= index; index++) index == pagin.index ? createPageLabel("b", "dis", index, index) : createPageLabel("a", "", index, index, pagin.callback);
                                   total < pagin.total && createPageLabel("a", "ellipsis", index, "...", pagin.callback)
                              } else {
                                   _left && (total = Math.min(index + 2 * pagin.num, pagin.total));
                                   _right && (index = Math.max(total - 2 * pagin.num, 1));
                                   _right && total > 2 * pagin.num && createPageLabel("a", "ellipsis", index, "...", pagin.callback);
                                   for (index; total >= index; index++) index == pagin.index ? createPageLabel("b", "dis", index, index) : createPageLabel("a", "", index, index, pagin.callback);
                                   _left && createPageLabel("a", "ellipsis", index, "...", pagin.callback)
                              }
                         }
                         if (pagin.index < pagin.total) {
                              createPageLabel("a", "next", pagin.index + 1, "下一页", pagin.callback);
                              createPageLabel("a", "end", pagin.total, "尾页", pagin.callback)
                         }
                         if (pagin.total > 2 * pagin.num + 4) {
                              createPageLabel("span", "txt", "", "到第");
                              var input = createPageLabel("input", "input", "", "1");
                              input.onblur = function() {
                                   var val = parseInt(input.value.Trim(), 10) || 1;
                                   1 > val && (val = 1);
                                   val > pagin.total && (val = pagin.total);
                                   input.value = val
                              };
                              createPageLabel("span", "txt", "", "页");
                              createPageLabel("a", "go", "确定", "确定", function() {
                                   pagin.callback && pagin.callback(input, input.value, pagin.size, pagin.total)
                              })
                         }
                    }
               }
          }
     };
     T.Template = function(uuid, viewId, data, type) {
          if ("object" == typeof viewId) {
               type = data;
               data = viewId;
               viewId = uuid
          }
          data = data || {};
          data.RMB = T.RMB;
          data.Number = Number;
          data.CFG = T.CFG || {};
          data.DOING = T.DOING;
          data.DOMAIN = T.DOMAIN || {};
          data.DeliveryDate = T.DeliveryDate;
          if (type) {
               var temp = document.getElementById("template-" + uuid),
                    view = document.getElementById("template-" + viewId + "-view");
               if (temp && view) {
                    view.innerHTML = Utils.Compiler.template("template-" + uuid, data);
                    return view
               }
          } else {
               var temp = document.getElementById("template_" + uuid),
                    view = document.getElementById("template_" + viewId + "_view");
               if (temp && view) {
                    view.innerHTML = Utils.Compiler.templateNative("template_" + uuid, data);
                    return view
               }
          }
     };
     T.BindData = function(k, data, flag) {
          k = k ? k + (flag ? "-" : "_") : "";
          T.Each(data, function(key, value) {
               if (T.Typeof(value, /array|Object/)) T.BindData(k + key, value, flag);
               else {
                    var obj = document.getElementById(k + key);
                    if (obj) {
                         var tn = ("" + obj.tagName).toLowerCase();
                         value = "undefined" == typeof value ? "" : value;
                         value = /price/i.test(key) ? T.RMB(value) : value;
                         if (/input|textarea/.test(tn)) obj.value = value;
                         else if (/img/.test(tn)) obj.src = value;
                         else if (/select/.test(tn)) {
                              obj.src = value;
                              for (var options = obj.options, o = 0; o < options.length; o++) options[o].value.Trim() == value && (options[o].selected = !0)
                         } else obj.innerHTML = value
                    }
               }
          })
     };
     T.RMB = function(num, isSign) {
          num = parseFloat(num, 10) || 0;
          if ("number" != typeof num) return "0.00";
          num = Math.round(100 * num) / 100;
          num = num.toString();
          var res = "",
               idx = num.indexOf(".");
          if (0 > idx) res = num + ".00";
          else {
               idx++;
               res = num.substring(0, idx);
               for (var len = num.length, i = idx; idx + 2 > i; i++) res += len > i ? num.charAt(i) : "0"
          }
          return 0 > res ? "0.00" : res
     };
     T.GetChecked = function(dom, name, isRadio, enabled) {
          if (!name) return null;
          for (var chks = [], type = isRadio ? "radio" : "checkbox", inputs = T.DOM.byTagName(dom, "input"), input = null, i = 0; input = inputs[i]; i++) input && input.type == type && input.name == name && (enabled ? input.checked && !input.disabled && chks.push(input.value) : input.checked && chks.push(input.value));
          return chks
     };
     T.Checkboxs = function(dom, name, nameall, callback) {
          function chkeckall(o, chk, chkall) {
               for (var inputs = T.DOM.byTagName(dom, "input"), input = null, i = 0; input = inputs[i]; i++) chkall ? input && "checkbox" == input.type && input.name === nameall && checked(input, chk) : !input || "checkbox" != input.type || input.name !== name && input.name !== nameall || checked(input, chk)
          }

          function check() {
               for (var inputs = T.DOM.byTagName(dom, "input"), input = null, i = 0; input = inputs[i]; i++)
                    if (input && "checkbox" == input.type && input.name === name && !input.checked) return !1;
               return !0
          }

          function checked(o, chk) {
               chk ? o.checked = !0 : o.checked = !1;
               chk ? T.DOM.addClass(T.DOM.closest(o, ".checkbox"), "sel") : T.DOM.removeClass(T.DOM.closest(o, ".checkbox"), "sel");
               callback && callback.call(o, o, o.checked)
          }
          if (name) {
               null !== nameall && (nameall = nameall || name + "all");
               for (var inputs = T.DOM.byTagName(dom, "input"), input = null, i = 0; input = inputs[i]; i++) !input || "checkbox" != input.type || input.name !== name && input.name !== nameall || (input.onclick = function(o) {
                    return function(e) {
                         checked(o, o.checked);
                         o.name === nameall ? chkeckall(o, o.checked) : chkeckall(o, check(), !0)
                    }
               }(input))
          }
     };
     ! function(T) {
          function Captcha(options, callbacks) {
               var _this = this,
                    opts = options || {};
               opts.img = opts.img || "img";
               opts.input = opts.input || "input[name='captcha']";
               opts.account = opts.account || "input[name='account']";
               opts.refresh = opts.refresh || ".refresh";
               _this.options = opts;
               _this.callbacks = callbacks || {};
               _this.init()
          }
          Captcha.prototype = {
               data: {
                    token: ""
               },
               init: function() {
                    var _this = this,
                         opts = _this.options;
                    _this.$cont = $(opts.cont);
                    _this.$img = $(opts.img, _this.$cont);
                    _this.$input = $(opts.input, _this.$cont);
                    _this.$account = $(opts.account);
                    _this.$img.off("click.captcha").on("click.captcha", function(e) {
                         _this.refresh()
                    });
                    $(opts.refresh, _this.$cont).off("click.captcha").on("click.captcha", function(e) {
                         _this.refresh()
                    });
                    _this.refresh()
               },
               getValue: function() {
                    var _this = this;
                    return $.trim(T.toDBC(_this.$input.val()))
               },
               verify: function() {
                    var _this = this,
                         callbacks = (_this.options, _this.callbacks),
                         code = _this.getValue();
                    if (!_this.verifying || _this.data.token) {
                         _this.verifying = !1;
                         if (_this.data.token && code) {
                              _this.verifying = !0;
                              T.GET({
                                   action: "in_common/captcha/captcha_verify",
                                   params: {
                                        token: _this.data.token,
                                        capt_val: code
                                   },
                                   success: function(data, params) {
                                        _this.verifying = !1;
                                        callbacks.success && callbacks.success.call(_this, data.verify_code)
                                   },
                                   failure: function(data, params) {
                                        _this.verifying = !1;
                                        T.msg(data.msg || "输入验证码有误，请重新输入");
                                        _this.refresh()
                                   }
                              }, function(data, params) {
                                   _this.verifying = !1;
                                   T.msg(data.msg || "输入验证码有误，请重新输入");
                                   _this.refresh()
                              }, function(data, params) {
                                   _this.verifying = !1;
                                   T.msg(data.msg || "输入验证码有误，请重新输入");
                                   _this.refresh()
                              });
                              _this.data.token = ""
                         } else if (code) {
                              T.msg("验证码已失效，请重新输入");
                              _this.refresh()
                         } else {
                              T.msg("请输入验证码");
                              _this.refresh()
                         }
                    }
               },
               refresh: function() {
                    var _this = this,
                         callbacks = (_this.options, _this.callbacks);
                    T.GET({
                         action: "in_common/captcha/get_token",
                         success: function(data, params) {
                              _this.data.token = data.token || "";
                              _this.$img.attr("src", T.DOMAIN.ACTION + "in_common/captcha/get_captcha?" + T.ConvertToQueryString({
                                   token: _this.data.token
                              }));
                              callbacks.refresh && callbacks.refresh.call(_this, _this.data.token)
                         },
                         failure: function(data, params) {
                              _this.refresh()
                         }
                    })
               }
          };
          T.Captcha = function(options, callbacks) {
               return new Captcha(options, callbacks)
          }
     }(T);
     ! function(T) {
          function CaptchaToPhone(options, callbacks) {
               this.options = options || {};
               this.callbacks = callbacks || {};
               this.init()
          }
          CaptchaToPhone.prototype = {
               init: function() {
                    var _this = this,
                         opts = _this.options;
                    _this.callbacks;
                    opts.popupId = opts.popupId || "captcha-popup";
                    opts.trigger = opts.trigger || "#captcha_to_phone";
                    opts.text = opts.text || "发送验证码";
                    opts.sendText = opts.sendText || "发送成功";
                    opts.account = opts.account || "#account";
                    opts.username = opts.username || "";
                    opts.interval = opts.interval || 60;
                    opts.successTip = null == opts.successTip ? "发送验证码成功" : opts.successTip;
                    _this.$account = $(opts.account);
                    _this.$trigger = $(opts.trigger);
                    _this.data = {};
                    _this.$trigger.off("click.captcha").on("click.captcha", function(e) {
                         if (!_this.$trigger.hasClass("dis")) {
                              var captcha;
                              $("#" + opts.popupId).remove();
                              _this.popup = T.cfm('<div id="' + opts.popupId + '" class="forms form_vcode"><input type="text" class="vcode" value="" name="captcha"/><img class="img" src=""/><a class="refresh" href="javascript:;">看不清楚<br/>换一张</a></div>', function() {
                                   captcha && captcha.verify();
                                   return !1
                              }, function(_o) {
                                   _o.remove()
                              }, "请输入图片验证码", "发 送");
                              captcha = T.Captcha({
                                   cont: "#" + opts.popupId
                              }, {
                                   success: function(verify_code) {
                                        _this.sendCode(verify_code)
                                   }
                              })
                         }
                    })
               },
               sendCode: function(verify_code) {
                    var _this = this,
                         opts = _this.options,
                         callbacks = _this.callbacks,
                         account = $.trim(T.toDBC(opts.username || _this.$account.val()));
                    if (verify_code && account) {
                         var step = opts.interval;
                         _this.$trigger.addClass("dis").text(opts.sendText + "（" + step + "）");
                         _this.timer = setInterval(function() {
                              if (step > 1) {
                                   step--;
                                   _this.$trigger.text(opts.sendText + "（" + step + "）")
                              } else _this.reset()
                         }, 1e3);
                         if (_this.popup && _this.popup.remove) {
                              _this.popup.remove();
                              _this.popup = null
                         }
                         setTimeout(function() {
                              _this.reset()
                         }, 1e3 * opts.interval);
                         T.POST({
                              action: "in_user/create_code",
                              params: {
                                   username: account,
                                   source: String(opts.source),
                                   ticket: verify_code
                              },
                              success: function(data, params) {
                                   opts.successTip && T.msg(opts.successTip);
                                   callbacks.success && callbacks.success.call(_this, verify_code)
                              },
                              failure: function(data, params) {
                                   _this.reset();
                                   T.msg(data.msg || "发送失败，请重新发送！")
                              }
                         })
                    } else account ? verify_code || T.msg("请先填写图片验证码") : T.msg("请先填写手机号")
               },
               reset: function() {
                    var _this = this,
                         opts = _this.options;
                    if (_this.timer) {
                         clearInterval(_this.timer);
                         _this.timer = null
                    }
                    _this.$trigger.removeClass("dis").text(opts.text)
               }
          };
          T.CaptchaToPhone = function(options, callbacks) {
               return new CaptchaToPhone(options, callbacks)
          }
     }(T);
     T.KeydownEnter = function(e, obj) {
          var form;
          if (form) {
               T.DOM.stopPropagation(e);
               e = e || event;
               var keycode = e.keyCode || e.which;
               13 === keycode && form.submit()
          }
     };
     T.DeliveryDate = function(dateStr, delivery, type) {
          dateStr = dateStr || "";
          delivery = parseInt(delivery, 10) || 0;
          var today = new Date;
          today.setHours(0);
          today.setMinutes(0);
          today.setSeconds(0);
          today.setMilliseconds(0);
          today = today.getTime();
          var date = dateStr ? new Date(dateStr.replace(/-/g, "/")) : new Date,
               dayTime = 864e5,
               isToday = date.getHours() < 17;
          isToday || (delivery += 1);
          for (var DATE_HOLIDAY = ",1-1,1-2,1-3,2-5,2-6,2-7,2-8,2-9,2-10,2-11,2-12,2-13,4-2,4-3,4-4,4-30,5-1,5-2,6-9,6-10,6-11,9-15,9-16,9-17,10-1,10-2,10-3,10-4,10-5,10-6,10-7,", DATE_ADJUST_DUTY = ",2-14,6-12,9-18,10-8,10-9,", startTime = date.getTime(), i = 0; delivery >= i; i++) {
               var d = new Date(startTime + i * dayTime);
               0 == d.getDay() || 2016 == d.getFullYear() && DATE_HOLIDAY.indexOf("," + (d.getMonth() + 1) + "-" + d.getDate() + ",") >= 0 ? delivery++ : 0 == d.getDay() && 2016 == d.getFullYear() && DATE_ADJUST_DUTY.indexOf("," + (d.getMonth() + 1) + "-" + d.getDate() + ",") >= 0 && delivery--
          }
          var endTime = startTime + delivery * dayTime;
          if (today > endTime) return "";
          var day = "",
               days = (endTime - today) / dayTime;
          1 > days ? day = "今天" : 2 > days ? day = "明天" : 3 > days && (day = "后天");
          var str = new Date(endTime).Format("mm月dd日").replace(/^0/, "").replace("月0", "月");
          str = day ? day + "（" + str + "）" : str;
          1 == type ? str = isToday ? "<span>17:00前下单并支付，预计</span><b>" + str + '</b><span>从工厂发出货物</span><a class="lnk" href="' + T.DOMAIN.FAQ + 'distribution.html#1" target="_blank">生产周期说明</a>' : "<span>现在下单并支付，预计</span><b>" + str + '</b><span>从工厂发出货物</span><a class="lnk" href="' + T.DOMAIN.FAQ + 'distribution.html#1" target="_blank">生产周期说明</a>' : 2 == type && (str = str);
          return str
     };
     T.IsInstallService = function(productId) {
          var result = 0;
          CFG_DB.ISP[productId] && (result = 1);
          return result
     };
     T.PageLoaded = function() {
          $(".main").removeClass("load").addClass("mained")
     };
     T.Loader = function(func) {
          window.addEventListener ? func() : $(function() {
               func()
          })
     };
     T.OAuthURL = function(returl, params) {
          if (!returl || !params) return returl;
          var idx = returl.indexOf("?"),
               _params = {};
          if (idx > 0) {
               _params = T.getRequest(returl.substring(idx));
               returl = returl.substring(0, idx)
          }
          _params = T.Inherit(_params, params);
          return returl + (returl.indexOf("?") > 0 ? "&" : "?") + T.ConvertToQueryString(_params)
     };
     T.cookie = function(key, value, options) {
          if (null == value) return Utils.Cookie.get(key);
          Utils.Cookie.set(key, "", {
               expires: -1,
               path: "/"
          });
          return Utils.Cookie.set(key, value, options || {
               path: "/",
               domain: T.DOMAIN.DOMAIN
          })
     };
     T._STORENAME = "_haidedian@ininin.com_kexingdian@ininin.com_test-store@ininin.com_hq@ininin.com_";
     T.SetCookie = function(data, params) {
          data = data || {}, params = params || {};
          if (2 == T._TYPE && "check_user" == params._action) {
               var _data = T.JSON.parse(T.cookie("_agent_token") || "{}") || {};
               if (!_data.sid) return;
               _data.user = data;
               data = _data
          }
          T.cookie("_type", "", {
               expires: -1,
               path: "/"
          });
          T.cookie("_type", "", {
               expires: -1,
               path: "/",
               domain: T.DOMAIN.DOMAIN
          });
          T.cookie("_agent_token", "", {
               expires: -1,
               path: "/"
          });
          T.cookie("_agent_token", "", {
               expires: -1,
               path: "/",
               domain: T.DOMAIN.DOMAIN
          });
          if (1 == params.remember) {
               T.cookie("sid", data.sid || "", {
                    expires: 1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("_user_type", 1, {
                    expires: 1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               })
          } else {
               T.cookie("sid", data.sid || "");
               T.cookie("_user_type", 1)
          }
          if (data.sid && data.type && data.type > 1) {
               T.cookie("_agent_token", T.JSON.stringify(data));
               T.cookie("_type", data.type)
          } else {
               T.cookie("_account", data.userName || params.username || "", {
                    expires: 36500,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("_nickname", data.nickName || "", {
                    expires: 36500,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.INININ = ""
          }
          data.userSupportQQ = $.trim(data.userSupportQQ);
          var _userSupportQQ = "";
          if (/^\d+$/.test(data.userSupportQQ)) {
               "938062247" == data.userSupportQQ && (data.userSupportQQ = "4008601846");
               _userSupportQQ = "http://wpa.qq.com/msgrd?v=3&uin=" + data.userSupportQQ + "&site=http://www.ininin.com&menu=yes"
          }
          T.cookie("_userSupportQQ", _userSupportQQ || "")
     };
     T.UnCookie = function(isStore, backuri) {
          if (2 != T._TYPE || isStore) {
               T.cookie("_type", "", {
                    expires: -1,
                    path: "/"
               });
               T.cookie("_type", "", {
                    expires: -1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("_agent_token", "", {
                    expires: -1,
                    path: "/"
               });
               T.cookie("_agent_token", "", {
                    expires: -1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("sid", "", {
                    expires: -1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("_security_user", "", {
                    expires: -1,
                    path: "/"
               });
               T.cookie("_security_user", "", {
                    expires: -1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               });
               T.cookie("_user_type", "", {
                    expires: -1,
                    path: "/"
               });
               T.cookie("_user_type", "", {
                    expires: -1,
                    path: "/",
                    domain: T.DOMAIN.DOMAIN
               })
          } else {
               var _data = T.JSON.parse(T.cookie("_agent_token") || "{}") || {};
               _data.user = {};
               T.cookie("_agent_token", T.JSON.stringify(_data))
          }
          backuri ? window.location = backuri : 0 !== backuri && setTimeout(function() {
               location.reload()
          }, 10)
     };
     T.Redirect = function(url) {
          return url ? url : ""
     };
     T.NotLogin = function() {
          T.UnCookie(!1, T.DOMAIN.PASSPORT + "index.html#backurl=" + encodeURIComponent(location.href))
     };
     T.Advert = function(options) {
          function render(item) {
               var size = CFG_DB.ADVERT[item.adAreaCode],
                    cont = "#slider_list_" + item.adAreaCode;
               item.width = item.width || size.width;
               item.height = item.height || size.height;
               $(cont).html(Utils.Compiler.template("slider_list", item));
               Slider({
                    cont: cont,
                    number: options.number,
                    duration: item.carouselTime,
                    interval: item.pauseTime,
                    direction: "lr",
                    autoplay: !0
               })
          }

          function _failure(data, params) {
               options.failure && options.failure()
          }
          options = options || {};
          options.areaCode = options.areaCode || "";
          if (T.adList) T.Each(options.areaCode.split(","), function(i, areaCode) {
               var item = T.adList[areaCode];
               item && render(item)
          });
          else {
               T.adList = {};
               var params = {},
                    local = location.href;
               options.areaCode ? params.areaCode = options.areaCode : $("#slider_list_bhp2").length ? params.areaCode = "bhp" : 0 === local.indexOf(T.DOMAIN.NEW + "index.html") ? params.areaCode = "superior" : 0 === local.indexOf(T.DOMAIN.PRODUCT + "index.html") ? params.areaCode = "print" : 0 === local.indexOf(T.DOMAIN.SOLUTION + "index.html") ? params.areaCode = "scene" : $("#slider_list_login").length ? params.areaCode = "login" : $("#slider_list_design").length ? params.areaCode = "design" : $("#slider_list_designer").length ? params.areaCode = "designer" : $("#slider_list_art1").length && (params.areaCode = "art");
               T.GET({
                    action: COM_API.advert,
                    params: params,
                    success: function(data, params) {
                         data.resultList = data.resultList || [];
                         T.Each(data.resultList, function(i, item) {
                              if ("bhp1" == item.adAreaCode) {
                                   T.adList[item.adAreaCode] = item;
                                   item.adContent && item.adContent[0] && T.Notice(item.adContent[0])
                              } else if (item.adAreaCode) {
                                   T.adList[item.adAreaCode] = item;
                                   render(item)
                              }
                         });
                         options.callback && options.callback(data, params)
                    },
                    failure: _failure,
                    error: _failure
               }, _failure, _failure)
          }
     };
     T.Notice = function(notice) {
          if (notice && notice.content) {
               var $noticebar, htmls = [],
                    height = 34;
               htmls.push('<div id="noticebar" class="noticebar">');
               htmls.push('<div class="notice"><div class="text">');
               htmls.push(notice.content);
               htmls.push('</div><a class="close" href="javascript:;"></a></div>');
               htmls.push("</div>");
               $("#header_fixed").prepend(htmls.join(""));
               $noticebar = $("#noticebar");
               htmls = [], height = $noticebar.outerHeight();
               htmls.push('<style type="text/css">');
               htmls.push("body { background-position: center " + (height + 36) + "px;}");
               htmls.push(".body_store { background-position: center " + (height + 72) + "px;}");
               htmls.push(".header { padding-top: " + (height + 36) + "px;}");
               htmls.push(".hfixed { padding-top: " + (height + 36) + "px;}");
               htmls.push(".body_store .hfixed { padding-top: " + (height + 72) + "px;}");
               htmls.push("</style>");
               $noticebar.prepend(htmls.join(""));
               $("#noticebar .close").click(function(e) {
                    $("#noticebar").remove()
               })
          }
     };
     T.HotSell = function(params, callback) {
          T.GET({
               action: "in_search/product/search",
               params: params || {
                    args: "",
                    sortField: "sales_volume",
                    sortDirection: "desc",
                    from: 0,
                    size: 12
               },
               success: function(data, params) {
                    data.data = data.data || {};
                    var hotSell = data.data.data || {};
                    data.productList = (hotSell.product || []).slice(0, 5);
                    data.designList = hotSell.design_product || [];
                    T.Each(data.productList, function(index, v) {
                         v.simpleDesc = v.simpleDesc || "";
                         v.productName = v.productName || "";
                         v.simpleDescEllipsis = T.GetEllipsis(v.simpleDesc, v.productName, 46)
                    });
                    T.Template("hot_sell", data, !0);
                    callback && callback(data, params)
               },
               failure: function(data) {},
               error: function(data) {}
          }, function(data) {}, function(data) {})
     };
     T.TopUserbar = function() {
          var htmls = [0 == location.href.indexOf(T.DOMAIN.DESIGN) ? '<li><a href="' + T.DOMAIN.WWW + 'index.html" rel="nofollow">返回主页</a></li><li class="vline v1"></li>' : ""];
          htmls.push("<li class=\"user_logreg\"><a name=\"registerurl\" onclick=\"_czc.push(['_trackEvent', '顶部', '去登录', '登录','','login_btn']);\" href=\"" + T.DOMAIN.PASSPORT + "index.html\">登录</a><span class=\"vline\"></span><a id=\"topregisterurl\" name=\"registerurl\" onclick=\"_czc.push(['_trackEvent', '顶部', '去注册', '注册','','topregisterurl']);\" href=\"" + T.DOMAIN.PASSPORT + 'index.html#type=1" rel="nofollow">注册</a></li>');
          htmls.push('<li class="user_name my_about ellipsis"><a id="user_name" class="user_tar" href="' + T.DOMAIN.WWW + 'member/index.html" rel="nofollow"></a>');
          htmls.push('<dl id="ulinks" class="ulinks link_about">');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'member/index.html" rel="nofollow">我的余额</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'member/myintegral.html" rel="nofollow">我的积分</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'member/mycoupon.html" rel="nofollow">我的优惠券</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'card/index.html#1" rel="nofollow">我的专属模板</a></dd>');
          htmls.push('<dd><a href="http://design.ininin.com/case/mycollection.html#1" rel="nofollow">我的收藏</a></dd>');
          htmls.push('<dt class="arrows"></dt></dl>');
          htmls.push("</li>");
          htmls.push('<li class="user_logout"><a id="logout_btn" href="javascript:;">退出</a></li>');
          htmls.push('<li class="vline v1"></li>');
          htmls.push('<li class="my_about"><a class="order_tar" href="' + T.DOMAIN.WWW + 'order/index.html" rel="nofollow">待处理订单</a>');
          htmls.push('<dl id="olinks" class="ulinks link_order">');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'order/index.html" rel="nofollow">印刷产品订单（<span id="data_common_count">0</span>）</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'order/design.html" rel="nofollow">设计服务订单（<span id="data_design_count">0</span>）</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'order/package.html" rel="nofollow">优惠套餐订单（<span id="data_plan_count">0</span>）</a></dd>');
          htmls.push('<dd><a href="' + T.DOMAIN.WWW + 'order/quotation.html" rel="nofollow">商品询价订单（<span id="data_new_count">0</span>）</a></dd>');
          htmls.push('<dt class="arrows"></dt></dl>');
          htmls.push("</li>");
          htmls.push('<li class="vline v2"></li>');
          htmls.push('<li class="user_sysmsg"><a id="sysmsg" class="sysmsg" href="' + T.DOMAIN.WWW + 'member/message.html" rel="nofollow"><b id="sysmsg_number"></b></a></li>');
          htmls.push('<li class="vline v2"></li>');
          $("#userbar").prepend(htmls.join(""))
     };
     T.Couponbar = function($couponbar, callback) {
          var isSuperCoupon = !1;
          if ($("#menu").length && !$couponbar) {
               $couponbar = $('<div class="couponbar"><span class="offline_coupon"><label><input class="textbox" type="text" name="record_code" autocomplete="off" /></label><a class="submit btnshort" href="javascript:;">立即兑换</a></span><a class="lnk" href="' + T.DOMAIN.FAQ + 'payment.html#2" target="_blank">了解优惠券获取途径>></a></div>').insertAfter("#header .head_shop");
               T.FORM().placeholder($("input[name='record_code']", $couponbar)[0], "请输入优惠券兑换码");
               isSuperCoupon = !0
          }
          $couponbar && $couponbar.length && $couponbar.on("click.coupon", ".submit", function(e) {
               if (T._LOGED) {
                    var $input = ($(this), $("input[name='record_code']", $couponbar)),
                         record_code = $.trim($input.val());
                    record_code ? T.RedeemedCoupon(record_code, callback) : isSuperCoupon ? window.location = T.DOMAIN.MEMBER + "mycoupon.html" : T.CouponAltPopup({
                         msg: "请输入优惠券兑换码或口令！"
                    })
               } else T.LoginForm(0)
          })
     };
     T.CouponAltPopup = function(data, callback) {
          0 == data.result ? data.msg = data.msg || "恭喜您！优惠券兑换成功。" : data.msg = data.msg || T.TIPS.DEF;
          T.Popup({
               id: "redeemedcoupon",
               zIndex: 860,
               title: "温馨提示",
               content: '<div class="couponbox"><h3 class="red">' + data.msg + '</h3><dl><dt>更多优惠券可通过如下方式获得：</dt><dd><span>①</span> 选购云印优惠套餐； <a href="' + T.DOMAIN.WWW + 'package/index.html" target="_blank">点击进入>></a></dd><dd><span>②</span> 选购云印指定产品； <a href="' + T.DOMAIN.WWW + 'all.html" target="_blank">点击进入>></a></dd><dd><span>③</span> 参与云印优惠活动； <a href="' + T.DOMAIN.WWW + 'activity/index.html" target="_blank">点击进入>></a></dd></dl></div>',
               noFn: function(_self) {
                    _self.remove()
               }
          });
          callback && callback(data)
     };
     T.RedeemedCoupon = function(record_code, callback) {
          record_code && T.POST({
               action: "in_order/exchange_offline_coupon",
               params: {
                    record_code: record_code
               },
               success: function(data) {
                    T.CouponAltPopup(data, callback)
               },
               failure: function(data) {
                    T.CouponAltPopup(data, callback)
               }
          })
     };
     T.GetServiceQQ = function() {
          T.cookie("_serviceQQ") ? T.BindQQService() : T.GET({
               action: "in_user/get_online_bd_qq",
               success: function(data) {
                    T._serviceQQ = data.OnlineBdQq || T._serviceQQ;
                    T.cookie("_serviceQQ", T._serviceQQ || "");
                    T.BindQQService()
               },
               failure: function(data, params) {},
               error: function(data, params) {}
          }, function(data) {}, function(data) {})
     };
     T.BindQQService = function(isRefurbish) {
          if (isRefurbish) return T.GetServiceQQ();
          T._userSupportQQ && T._userSupportQQ.indexOf("=938062247&") > 0 && (T._userSupportQQ = T._serviceQQLink || "");
          T._serviceQQ && T._serviceQQ.indexOf("=938062247&") > 0 && (T._serviceQQ = T._serviceQQLink || "");
          $("#tservice,#qqconsultation,#online_service").attr("href", T._userSupportQQ || T._serviceQQ);
          $("#tmember,#qqservice").unbind("click.tmember");
          T._LOGED ? $("#tmember,#qqservice").attr("target", "_blank").attr("href", T._userSupportQQ || T._serviceQQ) : $("#tmember,#qqservice").attr("href", "javascript:;").bind("click.tmember", function() {
               T.LoginForm(0)
          }).removeAttr("target")
     };
     T.LoginAfter = function() {
          T._SID = T.cookie("sid") || "";
          T._TYPE = T.cookie("_type") || 0;
          T._USER_TYPE = T.cookie("_user_type") || 0;
          T._USER_TYPE || (T._USER_TYPE = location.href.indexOf("www.ininin.com") > 0 ? 1 : 0);
          T._ACCOUNT = T.cookie("_account") || "";
          T._NICKNAME = T.cookie("_nickname") || T._ACCOUNT || "我的云印";
          T._userSupportQQ = T.cookie("_userSupportQQ") || "";
          T._serviceQQ = T.cookie("_serviceQQ") || T._serviceQQ || "";
          T._LOGED = T._SID && "string" == typeof T._SID && 1 == T._USER_TYPE;
          if (T._LOGED && T._TYPE > 1) {
               T._LOGED = 0;
               T._STORE = T._TYPE;
               var _data = T.JSON.parse(T.cookie("_agent_token") || "{}") || {},
                    _user = _data.user || {};
               T._USID = _user.sid || "";
               T._ACCOUNT = _user.userName || T._ACCOUNT;
               T._NICKNAME = _user.nickName || T._ACCOUNT || "";
               T._userSupportQQ = _user.userSupportQQ || "";
               T._serviceQQ = _user.serviceQQ || T._serviceQQ || "";
               T._SACCOUNT = _data.userName || "";
               T._SNICKNAME = _data.userName || "";
               T._SREALNAME = _data.nickName || "";
               T._SYSTEMINFO = _data.systemInfo || "";
               T._OPERATOR = _data.operator || "";
               3 == T._TYPE ? T._USID && !T.IS_AUTH_PAHE ? T._LOGED = 1 : T.UnCookie(0, T.DOMAIN.WWW) : 2 == T._TYPE && T._USID && T._STORENAME.indexOf("_" + T._SACCOUNT + "_") >= 0 && (T._LOGED = 1)
          }
     };
     T.LoginStatus = function() {
          if (T._LOGED) {
               $(document.body).addClass("logged");
               $("#userbar").removeClass("login_before");
               $("#user_name").text(T._NICKNAME).attr("title", T._NICKNAME)
          }
          T.BindQQService(1);
          if (T._STORE && !T.IS_AUTH_PAHE) {
               if (T._SNICKNAME) {
                    var _idx = T._SNICKNAME.lastIndexOf("-");
                    if (_idx > 0) {
                         T._SREALNAME = T._SNICKNAME.substring(0, _idx);
                         T._SNICKNAME = T._SNICKNAME.substring(_idx + 1)
                    }
                    T._SNICKNAME = $.trim(T._SNICKNAME || T._SREALNAME)
               }
               $("#header").addClass("hfixed");
               $("body").addClass("body_store");
               var html = '<div id="storebar" class="storebar"><div class="layout clearfix"><dl class="sinfo"><dd class="search suser ellipsis tr">' + T._OPERATOR + '</dd><dt class="sname">' + T._SYSTEMINFO + "</dt></dl></div></div>";
               2 == T._TYPE && (html = '<div id="storebar" class="storebar"><div class="layout clearfix"><dl class="sinfo"><dd class="search nosearch"><div class="searchbar"><input id="ininin_super_search_input" class="textbox" type="text"/><a id="ininin_super_search_button" class="search_btn" href="javascript:;"><i></i></a></div></dd><dt class="sname"><span class="sloginout"><a href="javascript:;">退出</a></span>>>欢迎光临' + T._SREALNAME + "<<</dt></dl></div></div>");
               $("#header_fixed").prepend(html);
               if (2 != T._TYPE) return;
               $("#storebar .search").bind("click.search", function() {
                    $(this).removeClass("nosearch");
                    $("#ininin_super_search_input").focus()
               });
               $("#ininin_super_search_button").bind("click.store", function() {
                    STORE.superSearch()
               });
               $("#ininin_super_search_input").bind("focus.store", function() {
                    STORE.KeydownEnter()
               }).bind("blur.store", function() {
                    STORE.UnKeydownEnter()
               }).val(T._USERNAME || "");
               $("#header .sloginout").bind("click.store", function() {
                    T.UnCookie(!0);
                    T.POST({
                         action: COM_API.loginout
                    }, {
                         issid: !0,
                         issource: !0
                    }, function(data) {
                         T.UnCookie(!0)
                    }, function() {
                         T.UnCookie(!0)
                    })
               });
               T.Mailfix({
                    inputs: [T.DOM.byId("ininin_super_search_input")]
               });
               T.FORM().placeholder(T.DOM.byId("ininin_super_search_input"), "超级搜索")
          }
     };
     T.VER = "v=" + T.VERSION;
     T.INININ = "";
     T.IS_AUTH_PAHE = 0 == location.href.indexOf(T.DOMAIN.WWW + "auth.html");
     T.IS_AUTH_PAHE || T.LoginAfter();
     var STORE = {
          superSearch: function(uname) {
               var uname = uname || $.trim($("#ininin_super_search_input").val());
               uname && (T.RE.mobile_email.test(uname) ? T.GET({
                    action: "in_user/check_user",
                    params: {
                         username: uname
                    },
                    issid: !0,
                    issource: !0,
                    success: function(data) {
                         T.SetCookie(data, {
                              _action: "check_user"
                         });
                         window.location.reload()
                    },
                    failure: function(data) {
                         T.cookie("_username", uname || "", {
                              path: "/"
                         });
                         T.cfm("帐号" + uname + " 不存在，是否立即创建该账号？", function(_this) {
                              _this.remove();
                              window.location = T.DOMAIN.PASSPORT + "index.html"
                         }, null, null, "立即注册", "以后再说", 720)
                    }
               }) : T.msg("用户名只能是手机号或邮箱！"))
          },
          KeydownEnter: function() {
               $(window).bind("keydown.store", function(e) {
                    e.stopPropagation();
                    e = e || event;
                    var keycode = e.keyCode || e.which;
                    13 === keycode && STORE.superSearch()
               })
          },
          UnKeydownEnter: function() {
               $(window).unbind("keydown.store")
          }
     };
     T.Loader(function() {
          T.TopUserbar();
          T.LoginStatus();
          T.Advert();
          $("a[name='registerurl']").each(function(i, el) {
               var $el = $(el),
                    href = $el.attr("href"),
                    registerurl = T.DOMAIN.PASSPORT + "index.html",
                    params = T.getRequest(href.replace(/^.*\#/, ""));
               params.backurl = encodeURIComponent(location.href);
               "javascript:;" != href && location.href.indexOf(registerurl) < 0 ? $el.attr("href", href.replace(/[#?]+.*$/, "") + "#" + T.Transfer.encodeHashString(params)) : $el.attr("href", "javascript:;")
          });
          T.SetCurrNav = function(pid) {
               pid = pid || T.getQueryString("pid") || "";
               var localhref = location.href.replace(location.search, "").replace(location.hash, "");
               /pdetail\.html$/.test(localhref) && (localhref = T.DOMAIN.WWW + "pdetail.html?pid=" + pid);
               localhref = localhref.replace(/\/$/, "");
               localhref = localhref.replace(/chromatism\.html$/, "upload.html");
               var isHelp = /\/help\//i.test(localhref) && !/\/help\/upload\.html/i.test(localhref),
                    isAbout = /\/about\//i.test(localhref),
                    isNew = /\/new\//i.test(localhref),
                    isProduct = /\/product\//i.test(localhref);
               localhref = localhref.replace(T.DOMAIN.WWW, "");
               $("#nav li > a").each(function(i, a) {
                    var href = $(a).attr("href").replace(T.DOMAIN.WWW, "").replace(/^\//, "");
                    if (/pdetail\.html/.test(localhref)) {
                         var idx = href.indexOf("&");
                         idx > 0 && (href = href.substring(0, idx))
                    } else href = href.replace(/[?#].*/, "").replace(/\/$/, "");
                    href == localhref && $(a).closest("li").addClass("sel");
                    isHelp && /^help/i.test(href) && 0 == localhref.indexOf(href) && $(a).closest("li").addClass("sel");
                    isAbout && /^about/i.test(href) && 0 == localhref.indexOf(href) && $(a).closest("li").addClass("sel");
                    isNew && /^new/i.test(href) && $(a).closest("li").addClass("sel");
                    isProduct && 0 == href.indexOf("all.html") && $(a).closest("li").addClass("sel")
               })
          };
          T.SetCurrNav();
          T.SelectedNav = function(localhref) {
               localhref = localhref.replace(T.DOMAIN.WWW, "");
               $("#nav li > a").each(function(i, a) {
                    var href = $(a).attr("href").replace(T.DOMAIN.WWW, "").replace(/^\//, "");
                    href && href.indexOf(localhref) >= 0 && $(a).closest("li").addClass("sel").siblings("li").removeClass("sel")
               })
          };
          var $toolbar = $("#toolbar"),
               $backTop = $("#tbacktop");
          $backTop.hide();
          $backTop.bind("click", function(e) {
               $("html, body").stop(!0, !0).animate({
                    scrollTop: 0
               }, 120)
          });
          T.Toolbar = function(e) {
               var isMini = $(window).width() < 1400,
                    isBackTop = $(document).scrollTop() > 0;
               isBackTop ? $backTop.show() : $backTop.hide();
               isMini ? $toolbar.addClass("mintoolbar") : $toolbar.removeClass("mintoolbar");
               $toolbar.css("margin-top", -$toolbar.height() / 2)
          };
          $(window).bind("scroll.toolbar resize.toolbar", T.Toolbar);
          T.Toolbar();
          T.Back = function(e) {
               $(window).bind("scroll.toolbar", function() {
                    var top = $(document).scrollTop();
                    top > 10 ? $backTop.show() : $backTop.hide()
               })
          };
          T.Back()
     });
     $(document).delegate(".droplist .dropbtn, .droplist .dropval", "click.droplist", function(e) {
          var $target = $(e.target),
               $droplist = $target.closest(".droplist"),
               $dropoptions = $target.closest(".dropoptions");
          if (!$dropoptions.length) {
               var ClearDroplist = function() {
                    $("body>.dropoptions").remove();
                    $(window).unbind("scroll.droplist resize.droplist");
                    $(document).bind("click.droplist")
               };
               ClearDroplist();
               $droplist.addClass("show");
               var $dropoptions = $(".dropoptions", $droplist).clone(),
                    width = Math.max($dropoptions.width(), $droplist.width());
               $droplist.width(width);
               var SetPosition = function() {
                    var offset = $droplist.offset();
                    $dropoptions.css({
                         width: width,
                         top: offset.top + $droplist.outerHeight(),
                         left: offset.left
                    })
               };
               SetPosition();
               $dropoptions.appendTo(document.body);
               $dropoptions.undelegate(".dropitem", "click.droplist").delegate(".dropitem", "click.droplist", function(e) {
                    var $target = $(this).addClass("sel");
                    $target.siblings(".dropitem").removeClass("sel");
                    var $dropoptions = $target.closest(".dropoptions"),
                         $droplist = $(".droplist[uuid='" + $dropoptions.attr("uuid") + "']"),
                         value = $target.data("value"),
                         title = $target.html();
                    $(".dropval", $droplist).html(title);
                    $droplist.removeClass("show");
                    $("input", $droplist).val(value).trigger("valchange.droplist", value);
                    T.IS.CVS ? setTimeout(ClearDroplist, 0) : ClearDroplist()
               });
               $(document).unbind("click.droplist2").bind("click.droplist2", function(e) {
                    var $target = $(e.target),
                         $droplist = $target.closest(".droplist"),
                         $dropoptions = $target.closest(".dropoptions");
                    $droplist.length || $dropoptions.length || ClearDroplist()
               });
               $(window).unbind("scroll.droplist resize.droplist").bind("scroll.droplist resize.droplist", SetPosition)
          }
     });
     T.Loader(function() {
          ! function(btn, btn2, usercart) {
               function showCodeLogin() {
                    var account = $("#accountLogin").val();
                    T.RE.mobile.test(account) && $("#loginChange").show().text("使用验证码登录")
               }
               var login_backurl = "",
                    loginFormObj = null,
                    login_callback = null,
                    loginForm = T.DOM.byId("login_form");
               loginForm && $("input[name='username']", loginForm).val(T._ACCOUNT);
               T.LoginForm = function(backurl, callback) {
                    if (loginFormObj) {
                         loginFormObj.remove();
                         loginFormObj = null
                    }
                    login_callback = callback;
                    login_backurl = "undefined" != typeof backurl ? backurl : "";
                    loginFormObj = T.dailog(loginForm, "登录", null, null, "login_form_popup")
               };
               usercart && T.DOM.bind(usercart, "click", function(e) {
                    if (!T._LOGED) {
                         T.DOM.preventDefault(e);
                         T.DOM.stopPropagation(e);
                         T.LoginForm(T.DOMAIN.CART + "index.html" + (T.INININ ? "?" + T.INININ : ""))
                    }
               });
               $(document).bind("keyup", function(e) {
                    T.KeydownEnter(e)
               });
               if (loginForm) {
                    var pwdErrorCount = 0;
                    T.DOM.bind(btn, "click", function(e) {
                         T.DOM.preventDefault(e);
                         T.DOM.stopPropagation(e);
                         T.LoginForm()
                    });
                    var captcha, verifyCodeValue, verifyCallback, hasVerifyCode = !1;
                    T.CaptchaToPhone({
                         trigger: "#sendCodeLogin",
                         account: "#accountLogin",
                         source: 2
                    });
                    var LOGINFORM = T.FORM("login", CFG_FORM.login, {
                         before: function() {
                              var _form = this;
                              _form.action = "in_user/login";
                              if (hasVerifyCode && verifyCodeValue || !hasVerifyCode || _form.params.code) {
                                   _form.issid = !0;
                                   _form.issource = !0;
                                   var params = {
                                        username: _form.params.username,
                                        remember: _form.params.remember || "0"
                                   };
                                   hasVerifyCode && verifyCodeValue && (params.checkcode = verifyCodeValue);
                                   _form.params.code && (params.code = _form.params.code);
                                   _form.params.password && (params.password = _form.params.password);
                                   _form.params = params;
                                   if (T._STORENAME.indexOf("_" + params.username + "_") >= 0) {
                                        params.source = "1";
                                        params.remember = "1"
                                   }
                              } else if (captcha && captcha.verify) {
                                   _form.action = "";
                                   verifyCallback = function(verifyCode) {
                                        verifyCallback = null;
                                        _form.submit()
                                   };
                                   captcha.verify()
                              }
                         },
                         success: function(data, param) {
                              var curr_url = T.DOMAIN.PASSPORT + "index.html" + (T.INININ ? "?" + T.INININ : "");
                              T._STORENAME.indexOf("_" + param.username + "_") >= 0 ? data.type = 2 : 2 == T._TYPE && (param._action = "check_user");
                              T.SetCookie(data, param);
                              if (0 === login_backurl) {
                                   T.cookie("ORDER_NOTPAY", "1");
                                   if (loginFormObj) {
                                        loginFormObj.remove();
                                        loginFormObj = null
                                   }
                                   T.LoginAfter();
                                   T.LoginStatus();
                                   T.SetStatus()
                              } else {
                                   0 == window.location.href.indexOf(curr_url) && (login_backurl = T.DOMAIN.MEMBER + "index.html");
                                   if (login_backurl) window.location = login_backurl;
                                   else if (T._TYPE > 1 && T._STORENAME.indexOf("_" + param.username + "_") < 0) window.location.reload();
                                   else {
                                        T.cookie("ORDER_NOTPAY", "0");
                                        window.location.reload()
                                   }
                              }
                              login_callback && login_callback()
                         },
                         failure: function(data, params) {
                              pwdErrorCount = data.errorCount;
                              if (pwdErrorCount >= 2) {
                                   hasVerifyCode = !0;
                                   captcha = T.Captcha({
                                        cont: "#captcha-pop"
                                   }, {
                                        refresh: function(token) {
                                             verifyCodeValue = ""
                                        },
                                        success: function(verifyCode) {
                                             verifyCodeValue = verifyCode;
                                             verifyCallback && verifyCallback(verifyCode)
                                        }
                                   });
                                   $("#captcha-pop").removeClass("hide");
                                   pwdErrorCount >= 5 ? T.alt('该账户输入错误密码次数过多，已被冻结3小时，您可自助<a class="forget" href="/passport/forget.html">找回密码</a>。如有疑问，请拨打云印客服电话：400-680-9111', function(_o) {
                                        _o.remove()
                                   }, function(_o) {
                                        _o.remove()
                                   }) : 1 == data.codeResult || params && params.code ? T.msg(data.msg || "输入验证码有误，请重新输入") : T.msg(data.msg || "用户名不存在或密码不正确")
                              } else {
                                   $("#captcha-pop").addClass("hide");
                                   params && params.code ? T.msg(data.msg || "输入验证码有误，请重新输入") : T.msg(data.msg || "用户名不存在或密码不正确")
                              }
                         }
                    });
                    showCodeLogin();
                    LOGINFORM.showInput("code", "username", !1);
                    LOGINFORM.showInput("password", "username", !0);
                    $("#accountLogin").bind("blur", showCodeLogin);
                    $("#loginChange").bind("click", function(e) {
                         if ("使用验证码登录" == $("#loginChange").text()) {
                              $("#loginChange").text("使用密码登录");
                              LOGINFORM.showInput("code", "username", !0);
                              LOGINFORM.showInput("password", "username", !1);
                              hasVerifyCode = !1;
                              $("#captcha-pop").addClass("hide")
                         } else {
                              $("#loginChange").text("使用验证码登录");
                              LOGINFORM.showInput("code", "username", !1);
                              LOGINFORM.showInput("password", "username", !0);
                              if (pwdErrorCount >= 2) {
                                   hasVerifyCode = !0;
                                   $("#captcha-pop").removeClass("hide")
                              } else {
                                   hasVerifyCode = !1;
                                   $("#captcha-pop").addClass("hide")
                              }
                         }
                    })
               }
               btn2 && T.DOM.bind(btn2, "click", function(e) {
                    T.POST({
                         action: COM_API.loginout
                    }, function(data) {
                         T.NotLogin()
                    }, function() {
                         T.NotLogin()
                    });
                    T.NotLogin()
               })
          }(T.DOM.byId("login_btn"), T.DOM.byId("logout_btn"), T.DOM.byId("user_cart"));
          ! function(sidebar) {
               if (sidebar) {
                    var items = T.DOM.byTagName(sidebar, "a");
                    if (items && items.length)
                         for (var local = window.location.href.replace(/\?.*|#.*/gi, ""), l = items.length, i = 0; l > i; i++) {
                              var href = items[i].href.replace(/\?.*|#.*/gi, "");
                              if (local == href) {
                                   T.DOM.addClass(items[i], "sel");
                                   return
                              }
                         }
               }
          }(T.DOM.byId("sidebar"))
     });
     T.OAuth = {
          getRedirectUri: function(type, redirectUri) {
               return encodeURIComponent(T.DOMAIN.WWW + "oauth/" + type + ".html?redirect_uri=" + encodeURIComponent(redirectUri || T.REQUEST.backurl || location.href))
          },
          qq: function(btnId, redirectUri) {
               redirectUri = this.getRedirectUri("qqauth", redirectUri);
               var oauthUri = "https://graph.qq.com/oauth2.0/authorize?response_type=token&t=tt&client_id=100554417&state=" + T.MD5(T.UUID()) + "&redirect_uri=" + redirectUri;
               $("#" + btnId).attr("href", oauthUri).on("click.oauth", function(e) {
                    window.location = oauthUri
               })
          },
          wechat: function(btnId, redirectUri) {
               redirectUri = this.getRedirectUri("wechat", redirectUri);
               var oauthUri = "https://open.weixin.qq.com/connect/qrconnect?appid=wx913310ec0211980f&response_type=code&redirect_uri=" + redirectUri + "&scope=snsapi_login&state=" + T.MD5(T.UUID()) + "#wechat_redirect";
               $("#" + btnId).attr("href", oauthUri).on("click.oauth", function(e) {
                    window.location = oauthUri
               })
          }
     };
     T.OAuth.qq("qq_login_btn");
     T.OAuth.wechat("wechat_login_btn");
     ! function(window, document, undefined) {
          function FixPrototypeForGecko() {
               HTMLElement.prototype.__defineGetter__("runtimeStyle", element_prototype_get_runtimeStyle);
               window.constructor.prototype.__defineGetter__("event", window_prototype_get_event);
               Event.prototype.__defineGetter__("srcElement", event_prototype_get_srcElement);
               Event.prototype.__defineGetter__("fromElement", element_prototype_get_fromElement);
               Event.prototype.__defineGetter__("toElement", element_prototype_get_toElement)
          }

          function element_prototype_get_runtimeStyle() {
               return this.style
          }

          function window_prototype_get_event() {
               return SearchEvent()
          }

          function event_prototype_get_srcElement() {
               return this.target
          }

          function element_prototype_get_fromElement() {
               var node;
               "mouseover" == this.type ? node = this.relatedTarget : "mouseout" == this.type && (node = this.target);
               if (node) {
                    for (; 1 != node.nodeType;) node = node.parentNode;
                    return node
               }
          }

          function element_prototype_get_toElement() {
               var node;
               "mouseout" == this.type ? node = this.relatedTarget : "mouseover" == this.type && (node = this.target);
               if (node) {
                    for (; 1 != node.nodeType;) node = node.parentNode;
                    return node
               }
          }

          function SearchEvent() {
               if (document.all) return window.event;
               func = SearchEvent.caller;
               for (; null != func;) {
                    var arg0 = func.arguments[0];
                    if (arg0 instanceof Event) return arg0;
                    func = func.caller
               }
               return null
          }(window.mozIndexedDB !== undefined || window.mozInnerScreenY !== undefined) && FixPrototypeForGecko()
     }(window, document);
     return T
});