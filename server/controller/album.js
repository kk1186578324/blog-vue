var express = require('express');
var router = express.Router();
var ablum = require('./../models/album');
var file = require("./../models/file.js");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

//上传表单
 class Album {
   upload(req,res,text){
    var base64url = req.body.base64Str;
    var albumId= req.body.albumId;
    ablum.findOne({_id:albumId},function(err,doc){
      if(err){
        console.log(err);
        res.json({
          status:'0',
          msg:err.message
        })
      }else{
        if(doc){
         writeFile(base64url,doc)
        }
      }
    })
   };
   addAlbum(req,res,text){
       var param = {
         albumName:req.body.name,
         albumDesc:req.body.desc,
         images:[]
       };
    ablum.findOne({albumName:req.body.name},function(err,doc){
      if(err){
        console.log(err);
        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        if(doc){
          res.json({
            status:'2',
            msg:'该相册名已存在!',
          })
        }else{
    ablum.create(param,function(err,doc){
        if(err){
          res.json({
            status:'0',
            msg:err.message
          })
        }else{
            doc?res.json({
              status:'1',
            }):res.json({
              status:'0',
              msg:"创建失败！"
           })
        }
         })
        }
      }
    })
   }

/*   //图片加载,存储在public/images下的所有图片
app.get('/public/images/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    console.log("Request for " + req.url + " received.");
}
*/
    getImg(req, res,text){

     
     var imgUrl = __dirname + "/../images/" + req.query.img
     console.log(imgUrl)
          res.sendFile( __dirname+"/1544605330548.jpg");
     // res.sendFile(imgUrl);
    }

   imgList(req, res,text){
     var imgId =req.body.imgId
     ablum.findOne({_id:imgId},function(err,doc){
      if(err){
        console.log(err);
        res.json({
          status:'0',
          msg:err.message
        })
      }else{
        if(doc){
         res.json({
                status:'1',
                content:doc,
              })
        }
      }
    })
    }
   listAlbum(req,res,text){
       ablum.find({},function(err,doc){
          if(err){
            console.log(err);
            res.json({
              status:'1',
              msg:err.message
            })
          }else{
            if(doc){
              res.json({
                status:'1',
                content:doc,
              })
            }
          }
        })
   }

 }
 function writeFile(base64url,doc){

    var imageName = Date.now() + '.jpg';
    var path = __dirname + "./../../src/assets/img/"+imageName;//从app.js级开始找--在我的项目工程里是这样的
    var base64 = base64url.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    console.log(dataBuffer);
//         console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
    fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
        if (err) {
            console.log(err);
        } else {
            console.log(doc)
         doc.images.push(imageName)
         ablum.update({_id:doc._id},doc,function(err,doc){
              if(err){
                res.json({
                  status:'0',
                  msg:err.message
                })
              }else{
                if(doc){
                  console.log('写入成功！');
                }else{
                  res.json({
                    status:'0',
                    msg:"写入失败！"
                  })
                }
              }
            })   
        }
    })
}
module.exports = new Album();