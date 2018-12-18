var express = require('express');
var router = express.Router();

var Article = require('./../controller/article')


router.post("/add",Article.add)
router.post("/update",Article.update)
router.get("/list",Article.list)
router.get("/page",Article.page)
router.get("/del",Article.del)
router.get("/detail",Article.detail)
router.post("/comment",Article.comment)
module.exports = router;

