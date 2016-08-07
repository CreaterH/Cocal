// const tpl = {
//     user: require("./tpl/user.html"),
//     product: require('./tpl/classify.html'),
// };

var user = require('./user/user');
var bootstrap = require('bootstrap');

// 管理界面路由控制
var Admin = {
    // 主界面路由
    index: {
        '!/index': function(){
            var index = require("./index/index.js");
            index.render({
                container: '#content_container'
            });
            console.log("Welcome to Coral TeaBreak!");
        }
    },
    // 会员路由控制
    member: {
        '!/member/v1': function(){

        },
        '!/member/v2': function(){

        },
        '!/member/v3': function(){

        },
        '!/member/v4': function(){

        },
        '!/member/v5': function(){

        }
    },
    // 商品路由控制
    product: {
        '!/product/classify': function(){
            var classify = require('./product/classify');
            classify.render({
                container: '#content_container',
            });
        },
        '!/product/list/add': function(){
            var addProduct = require("./product/addproduct");
            addProduct.render({
                container: '#content_container',
            })
        },
        '!/product/list': function(){
            var list = require('./product/list');
            list.render({
                container: '#content_container',
            });
        },
        '!/product/attr': function(){

        },
        '!/product/recommen': function(){

        },
    },
    //  收支路由控制
    income: {
        '!/income/captial': function(){

        }
    },
};

/*
 * @ init 初始化  注册路由事件
 */

var init = function(){

    var Router = require("./router");

    Router();

    window.Router.route(Admin.index);

    window.Router.route(Admin.member);

    window.Router.route(Admin.product);

    window.Router.route(Admin.income);

    // window.Router.route(Admin.index);

    // window.Router.route(Admin.index);
}();
