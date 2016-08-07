/**
 * Created by cpiny on 16/6/29.
 */

var mongoose = require("mongoose");
mongoose.connect('mongodb://120.25.241.110:20000/shanhu');


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功');
    //在这里创建你的模式和模型
});

/**
 * @声明用户数据集合
 * @type {mongoose.Schema}
 */
var UserSchema = new mongoose.Schema({
    user: String,
    password: String,
    token: String,
    lastTime: Date,
    phone: Number
});

var User = db.model('User', UserSchema);


/**
 * @后台管理  添加产品分类
 */

var ProductClassifySchema = new mongoose.Schema({
    name: String,
    display: {
        type:Boolean,
        default: true,
    },
    time: {
        type: String,
        default: Date.now
    }
});

var ProductClassify = db.model("ProductClassify", ProductClassifySchema);

/**
 * 产品列表
 * @type {mongoose}
 */
var ProductListSchema = new mongoose.Schema({
    name: String,
    price: String,
    classify: String,
    size: String,
    package: String,
    number: Number,
    describe: String,
    comment: String,
    picture: Array,
    display: {
        type:Boolean,
        default: true,
    },
    time: {
        type: Date,
        default: Date.now
    }
}, {_id: true});

var ProductList = db.model("ProductList", ProductListSchema);

// comment 评论

/**
 * 产品套餐
 * @type {mongoose}
 * products: [{_id: classifyId,
 *             products:[
 *             list
 *             ]
 *           }]
 */
var ProductPackageSchema = new mongoose.Schema({
    name: String,
    products: Array,
    total: Number,
    price: String,
}, {_id: true});

var ProductPackage = db.model("ProductPackage", ProductPackageSchema);

module.exports =  {
    User: User,
    ProductClassify: ProductClassify,
    ProductList: ProductList,
    ProductPackage: ProductPackage
};


// 产品 > 类别 > 套餐
