var tpl = require('../tpl/product/classify.html');
// require("./../../tpl/tpl-input-element.html");
var bootbox = require('bootbox');
var dialog = require('piny-dialog');
var pinyAlert = require('widget/piny-alert.js');
require('datatable');

var _opts;

var render = function(opts){
    _opts = opts;
    var tplData = {
        title: "Piny",
        root: "#!/product/classify",
    };
    var template = _.template(tpl);
    $(_opts.container).empty().append(template(tplData));
    initPage();
    initBtn();
    initTable();
};

function initPage(){
    $(".nav-list-topbar li").eq(0).addClass("active");
    $("#addClassify").on("click", function(){
        var Tpl = require("tpl/tpl-input-classify.html");
        var tplData = {
            inputId: "input-classify-add",
            inputPlaceholder: "请输入分类名称",
            btnId: "btn-classify-add",
            btnName: "确认"
        }

        bootbox.dialog({
            title: "添加分类",
            message: "<div id='placeholder'><div>",
            buttons: {
                leftBtn: {
                    label: "关闭",
                    callback: function(){

                    }
                },
                rightBtn: {
                    label: "确认",
                    callback: function(){
                        var addClassify = $("#input-classify-add").val();
                        if(!addClassify){
                            pinyAlert({
                                status: "danger",
                                container: "#alert-classify",
                                message: "分类名称不能为空！"
                            })
                            return false
                        }
                        $.post("/admin/addClassify",{
                            name: addClassify
                        }).done(function(res){
                            if(res.code == 0){
                                $("#classify-table").dataTable().api().ajax.reload();
                                pinyAlert({
                                    status: "success",
                                    container: "#alert-classify",
                                    message: "新增分类成功！"
                                })
                            }
                            else{
                                $("#classify-table").dataTable().api().ajax.reload();
                                pinyAlert({
                                    status: "danger",
                                    container: "#alert-classify",
                                    message: "新增分类失败！"
                                })
                            }
                        }).error(function(err){

                        })
                        return false
                    }
                }
            },
            callback: function(){},
            onEscape: true,
            show: true
        });
        appendNode({
            container: "#placeholder",
            data: tplData,
            tpl: Tpl
        })
    });
    $("#delClassify").on("click", function(){
        var classifyIds = $(".classify-checkbox:checked");
        var delClassIds = [];
        for(var i = 0, len = classifyIds.length; i < len; i++){
            delClassIds.push($(".classify-checkbox:checked").eq(i).parent().data("id"));
        }
        console.log(delClassIds)
        $.post("/admin/delclassify",{
            delClassItems: JSON.stringify(delClassIds)
        }).done(function(res){
            if(res.code == 0){
                $("#classify-table").dataTable().api().ajax.reload();
            }
            else{

            }
        }).error(function(err){})
    });

    function appendNode(opts){
        /*
        opts = {
            container: container,
            tpl: tpl,
            data: data
        }
         */
         var template = _.template(opts.tpl);
         $(opts.container).append(template(opts.data));
    }
}

function initTable(){
    $("#classify-table").dataTable({
        bPaginate: true, //翻页功能
        bLengthChange: false, //改变每页显示数据数量
        bFilter: false, //过滤功能
        bSort: false, //排序功能
        bInfo: true, //页脚信息
        bAutoWidth: false, //自动宽度
        columns: [{
            title: '<label class="option block mn"><input type="checkbox" name="classify-checkbox-all" id="classify-checkbox-all"><span class="checkbox mn"></span></label>',
            data: null,
            width: "40px",
            className: "text-center",
            render: function(data, type, row, meta){
                return '<label class="option block mn" data-id="' + row._id + '"><input type="checkbox" class="classify-checkbox" name="classify-checkbox" ><span class="checkbox mn"></span></label>'
            }
        }, {
            title: "图标",
            data: null,
            width: "50px",
            // className: "text-center",
            render: function(data, type, row, meta){
                return ''
            }
        }, {
            title: "分类名称",
            data: "name",
            width: '100px',
            className: "",
            render: function(data, type, row, meta){
                return data
            }

        }, {
            title: "操作",
            data: null,
            width: '100px',
            render: function(data, type, row, meta){
                return ""
            }
        }],
        ajax: {
            "url": "/admin/checkClassify"
        },
        initComplete: function(){
            $("#classify-table").on("change", "#classify-checkbox-all", function(){
                var isChecked = $(this).is(":checked");
                $(".classify-checkbox").prop("checked", isChecked);
            })
        },
        drawCallback: function(){
            // $()
        }
    });
}

function initBtn(){
    $(".nav-list-topbar li").on({
        "click": function(){
            $(this).addClass("active");
        },
        "mouseover": function(){
            $(this).addClass("active");
        },
        "mouseout": function(){
            $(this).removeClass("active");
            $(".nav-list-topbar li").eq(0).addClass("active");
        }
    });
}


module.exports = {
    render: render,
};
