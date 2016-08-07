/**
 * Created by creator on 16/6/22.
 */
var express = require('express');
var router = express.Router();
var User = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    // User.remove(function(err){
    //     res.send("success");
    // })
    //
    console.log(User.User.findOne)
    User.User.findOne({user:'zhangzhonghao'}, function(err, oneUser){
        console.log(JSON.stringify(oneUser));
        res.render('index', { title: oneUser.phone });
    });

});

module.exports = router;
