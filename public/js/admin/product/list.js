var tpl = require('../tpl/product/list.html');
var bootbox = require('bootbox');
var dialog = require('piny-dialog');
var pinyAlert = require('widget/piny-alert');
var addProduct = require('./addproduct');
require('datatable');


var _opts;

function render(opts){
    _opts = opts;
    var tplData = {
        title: "Piny",
        root: "#!/product/list",
    };
    var template = _.template(tpl);
    $(_opts.container).empty().append(template(tplData));
    initPage();
    initBtn();
    initTable();
};

function initPage(){
    $(".nav-list-topbar li").eq(1).addClass("active");

    $("#addList").on("click", function(){
        // addProduct.render({
        //     container: "#content_wrapper"
        // })
    });
    $("#delList").on("click", function(){
        
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
    $("#list-table").dataTable({
        bPaginate: true, //翻页功能
        bLengthChange: false, //改变每页显示数据数量
        bFilter: false, //过滤功能
        bSort: false, //排序功能
        bInfo: true, //页脚信息
        bAutoWidth: true, //自动宽度
        columns: [{
            title: '<label class="option block mn"><input type="checkbox" name="list-checkbox-all" id="list-checkbox-all"><span class="checkbox mn"></span></label>',
            data: null,
            width: "40px",
            className: "text-center",
            render: function(data, type, row, meta){
                return '<label class="option block mn" data-id="' + row._id + '"><input type="checkbox" class="list-checkbox" name="list-checkbox" ><span class="checkbox mn"></span></label>'
            }
        }, {
            title: "商品名称",
            data: "name",
            width: '100px',
            className: "",
            render: function(data, type, row, meta){
                return data
            }

        }, {
            title: "图片",
            data: null,
            width: "50px",
            // className: "text-center",
            render: function(data, type, row, meta){
                return ''
            }
        }, {
            title: "价格",
            data: null,
            width: "50px",
            // className: "text-center",
            render: function(data, type, row, meta){
                return ''
            }
        }, {
            title: "类型",
            data: null,
            width: "50px",
            // className: "text-center",
            render: function(data, type, row, meta){
                return ''
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
            "url": "/admin/checkList"
        },
        initComplete: function(){
            $("#list-table").on("change", "#list-checkbox-all", function(){
                var isChecked = $(this).is(":checked");
                $(".list-checkbox").prop("checked", isChecked);
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
            $(".nav-list-topbar li").eq(1).addClass("active");
        }
    });
}


module.exports = {
    render: render,
};
