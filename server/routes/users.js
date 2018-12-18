var express = require('express');
var router = express.Router();

var Admin = require('./../controller/users')


router.post("/login",Admin.login)


module.exports = router;
