var express = require("express");
var router = express.Router();

router.all('*', function(req, res, next){
    // var token = req.cookie.tgt;
    // next();
})

module.exports = router;