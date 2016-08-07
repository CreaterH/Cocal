
var bootbox = require("bootbox");
// var dialog = require("")
var _opts;
var instance;

function dialog(opts){
    _opts = opts;

    bootbox.dialog({
        title: _opts.title || "",
        message: "<div id='" + (_opts.container || "") + "'><div>",
        buttons: {
            leftBtn: {
                label: _opts.leftBtnName || "关闭",
                callback: _opts.leftBtnCallback || function(){

                }
            },
            rightBtn: {
                label: _opts.rightBtnName || "确认",
                callback: _opts.rightBtnCallback || function(){

                }
            }
        },
        callback: _opts.callback || function(){},
        onEscape: true,
        // show:
    });

    return instance;
}

function show(callback){
    

    callback();
    return instance;
}

exports.instance = {
    dialog: dialog,
    show: show
}