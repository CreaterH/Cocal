var addProductTpl = require("../tpl/product/addproduct.html");
require('select2');
var _opts;

function render(opts){
    /**
     * @ _opts = {
     *         container: container,
     *         data: data
     *     }
     *  tpl = {
     *          
     *  }
     */
    
    _opts = opts;
    var tplComplate = _.template(addProductTpl);
    $(_opts.container).empty().append(tplComplate());
    initPage();
}

function initPage(){
    // 选择分类
    $.get('/admin/checkClassify').done(function(res){
        if(res.code == 0){
            var classifyList = [];
            _.each(res.data, function(item){
                classifyList.push({
                    id: item._id,
                    text: item.name,
                    value: item._id
                });
            })
            $("#product-classify").select2({
                data: classifyList
            })
        }
    })
}

function initBtn(){
    // 保存 数据
    $("#save").on("click", function(){})

    // 清空数据
    $("#delete").on("click", function(){})
}

module.exports = {
    render: render
}