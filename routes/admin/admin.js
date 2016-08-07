var express = require("express");
var router = express.Router();
var manage = require("../../database/manage");
var multiparty = require('multiparty');
var util = require('util');
var fs = require("fs");

router.get('/', function(req, res, next) {
    var Data = {
        title: '珊瑚茶歇',
        root: 'public',
        username: 'Piny'
    };
    res.render('admin/index', Data);
});
/**
 * 分类相关接口
 */
router.post('/addClassify', function(req, res) {
    var data = {
        name: req.body.name,
    };
    manage.product.addClassify(req, res, data);
});

router.get("/checkClassify", function(req, res) {
    // console.log(req);
    var data = {};
    manage.product.checkClassify(req, res, data);
});

router.post("/delClassify", function(req, res) {
        var data = JSON.parse(req.body.delClassItems);
        manage.product.deleteClassify(req, res, data);
    })
    /**
     * 商品列表相关接口
     */
router.post('/addProduct', function(req, res) {

});

router.post('/addProduct/image', function(req, res) {

});

router.post("/delProduct", function(req, res) {

});

router.post("/updateProduct", function(req, res) {

});

router.get("/checkList", function(req, res) {
    var data = {
        display: true
    }
    manage.product.checkList(req, res, data);
});


/* 上传*/
router.post('/file/uploading', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: './public/files/'
    });
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }

        res.writeHead(200, {
            'content-type': 'text/plain;charset=utf-8'
        });
        res.write('received upload:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: filesTmp
        }));
    });
});

router.get("*", function(req, res) {
    res.render("admin/404", {
        title: "Not Found"
    });
});
module.exports = router;