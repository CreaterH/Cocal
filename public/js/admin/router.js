/**
 *  Created By Piny
 *  路由控制主要函数
 */
function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(opts, callback) {
    //给不同的hash设置不同的回调函数
    // 判断传递的参数  既可以传递object 有可以传递 key,value对
    if(typeof(opts) == 'object'){
        for(var path in opts){
            this.routes[path] = opts[path];
        }
    }
    else{
        this.routes[opts] = callback;
    }
};
Router.prototype.refresh = function() {
    //获取到相应的hash值
    var defaultHash = '!/index';
    //如果存在hash值则获取到，否则设置hash值为默认
    this.currentUrl = location.hash.slice(1).split('?')[0] || defaultHash;
    for(var path in this.routes){
        var pathRegExp = new RegExp(path);
        var result = pathRegExp.test(this.currentUrl);
        if(result){
            this.currentUrl = path;
            break;
        }
    }
    if(typeof(this.routes[this.currentUrl]) == 'function'){
        this.routes[this.currentUrl]();
    }
    else {
        this.routes[defaultHash]();
    }
    //根据当前的hash值来调用相对应的回调函数
};
Router.prototype.init = function() {
    // 添加监听事件
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
};
module.exports = function(){
    //给window对象挂载属性
    window.Router = new Router();
    window.Router.init();
};
