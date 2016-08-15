var addProductTpl = require("../tpl/product/addproduct.html");
require('select2');
require("jquery-form");
require("piny-notify");
var Dropzone = require("Dropzone");

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
            var classifyList = [{
                id: 0,
                text: "产品分类",
                value: 'classify-default'
            }];
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
    });
    // 
    // 
    $(".add-product").on("click", function(){
        // 组装数据
        // var productName = $(".product-name");
        // var productClassifyName = $();
        // var productClassifyId = $();
        // var productPrice = $();

        var options = {
            type: "post",
            url: "/admin/addproduct",
            data: {
                productName: "123",//productName,
            },
            success: function(res){
                if(res.code == 0){
                    $(".notifications").notify({
                        message: {
                            text: "保存成功！",

                        }
                    }).show();
                }
            }
        }
        $("#addproduct-form").ajaxSubmit(options);
    })
}

function initBtn(){
    // 保存 数据
    $("#save").on("click", function(){})

    // 清空数据
    $("#delete").on("click", function(){})
}
    Dropzone.options.dropZone = {
      paramName: "file", 
      maxFilesize: 0,

      addRemoveLinks: true,
      dictDefaultMessage: '<i class="fa fa-cloud-upload"></i> \
         <span class="main-text"><b>Drop Files</b> to upload</span> <br /> \
         <span class="sub-text">(or click)</span> \
        ',
      dictResponseError: 'Server not Configured'
    };

    Dropzone.options.dropZone2 = {
      paramName: "file", 
      maxFilesize: 0,

      addRemoveLinks: true,
      dictDefaultMessage: '<i class="fa fa-cloud-upload"></i> \
         <span class="main-text"><b>Drop Files</b> to upload</span> <br /> \
         <span class="sub-text">(or click)</span> \
        ',
      dictResponseError: 'Server not Configured'
    };
    setTimeout(function() {
      var Drop = $('#dropZone2');
      Drop.addClass('dz-started dz-demo');

      setTimeout(function() {
        $('.example-preview').each(function(i, e) {
          var This = $(e);

          var thumbOut = setTimeout(function() {
            Drop.append(This);
            This.addClass('animated fadeInRight').removeClass('hidden');
          }, i * 135);

        });
      }, 750);

    }, 800);

    // Demo code 
    $('.example-preview').on('click', 'a.dz-remove', function() {
      $(this).parent('.example-preview').remove();
    });

module.exports = {
    render: render
}