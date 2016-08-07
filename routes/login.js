/**
 * Created by creator on 16/6/22.
 */
var express = require('express');
var router = express.Router();
var User = require('../database/db');

router.get('/add', function(req, res) {

    var userData = {
        user: 'zhangzhonghao',
        password: '123456',
        token: '1234567890',
        lastTime: Date.parse(new Date()),
        phone: 18352864850
    };

    var user = new User(userData);

    user.save(function(err){
        res.send("Zhang Zhonghao");
        res.end();
    });
});

module.exports = router;