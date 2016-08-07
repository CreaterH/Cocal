var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Zhang Zhonghao' });
});

module.exports = router;