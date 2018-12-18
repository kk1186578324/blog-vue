var express = require('express');
var router = express.Router();

var Album = require('./../controller/album')
router.post("/imgList",Album.imgList)
router.get("/getImg",Album.getImg)
router.get("/listAlbum",Album.listAlbum)
router.post("/addAlbum",Album.addAlbum)
router.post("/upload",Album.upload)
module.exports = router;
