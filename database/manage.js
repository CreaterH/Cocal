var db = require("./db");
var _ = require("underscore");

// function product(){}
var product = {
    addClassify: function(req, res, data){
        db.ProductClassify.find({name: data.name}, function(err, doc){
            if(doc.length != 0){
                if(doc[0].display){
                    res.send(code(2, "", "该分类已存在！"));
                    res.end();
                    return
                }
                else{
                    doc[0].display = true;
                    console.log(doc);
                    doc[0].save();
                    res.send(code(0));
                    res.end();
                    return
                }
            }
            else{
                var classify = new db.ProductClassify(data);
                classify.save(function(err){
                    if(err){
                        res.send(code(1));
                        res.end();
                        return
                    }
                    res.send(code());
                    res.end();
                });
            }
        })
    },
    deleteClassify: function(req, res, data){
        console.log(data)
        if(!Array.isArray(data)){
            res.send(code(3, "", "This is not a Array"));
            res.end();
            return
        }
        var errData = [];
        for(var i = 0, len = data.length; i < len; i++){
            db.ProductClassify.findOneAndUpdate({_id: data[i]}, {display: false}, function(err){
                if(err){
                    errData.push(data[i]);
                }
            })
        }
        if(errData.length == 0){
            res.send(code());
            res.end();
        }
        else{
            res.send(code(3, errData));
            res.end();
        }
    },
    updateClassify: function(req, res, data){
        console.log(data)
        if(!Array.isArray(data)){
            res.send(code(3, "", "This is not a Array"));
            res.end();
            return
        }
        var errData = [];
        for(var i = 0, len = data.length; i < len; i++){
            db.ProductClassify.findOneAndUpdate({_id: data[i]}, {}, function(err){
                if(err){
                    errData.push(data[i]);
                }
            })
        }
        if(errData.length == 0){
            res.send(code());
            res.end();
        }
        else{
            res.send(code(3, errData));
            res.end();
        }
    },
    checkClassify: function(req, res, data){
        /**
         *  data = {
         *      
         *  }
         */
        data.display = true;        
        db.ProductClassify.find(data, function(err, doc){
            if(err){
                res.send(code(1));
            }
            res.send(code(0, doc));
            res.end();
        });
    },

    checkList: function(req, res, data){
        db.ProductList.find(data, function(err, doc){
            if(err){
                res.send(code(1));
            }
            res.send(code(0, doc));
            res.end();
        })
    },
    addProduct: function(req, res, data){
        var productList = new db.ProductList(data);
        productList.save(function(err){
            if(err){
                res.send(code(1));
                res.end();
            }
            res.send(code());
            res.end();
        });
    },
    deleteProduct: function(req, res, data){

    },
    updateProduct: function(req, res, data){

    }
};

var adminUser = {
    login: function(req, res, data){

    },
    register: function(req, res, data){

    }
};
function code(num, data, message){
    return {
        code: num || 0,
        data: data || "",
        message: message || ""
    };
}

module.exports = {
    product: product,
    adminUser: adminUser
};
