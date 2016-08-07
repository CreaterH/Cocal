/**
 * Created by creator on 16/7/1.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.render('index', {title: '珊瑚茶歇'});
});

module.exports = router;
