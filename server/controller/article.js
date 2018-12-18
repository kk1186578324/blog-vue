var express = require('express');
var router = express.Router();
var article = require('./../models/article');
var md5 = require("../models/md5.js");


class Article {

     add(req,res,next){
       var self = this;
       var param = {
         title:req.body.title,
         tag:req.body.tag,
         content:req.body.content,
         date:formatterDateTime(new Date())
       };
       article.create(param,function(err,doc){
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
             })
           }else{
             res.json({
               status:'0',
               msg:"账户名或密码错误"
             })
           }
         }
       })
     };
  update(req,res,next){
    var self = this;
    var param = {
      title:req.body.title,
      tag:req.body.tag,
      content:req.body.content,
      date:formatterDateTime(new Date())
    };
    article.update({_id:req.body.id},param,function(err,doc){
      if(err){

        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        if(doc){
          res.json({
            status:'1',
          })
        }else{
          res.json({
            status:'0',
            msg:"账户名或密码错误"
          })
        }
      }
    })
  };
  list(req,res,next){

    var param={};
    let tag = req.param("tag");
    let title = req.param("title");
      tag!=="all"?param['tag']=new RegExp(tag):null;
    title?param['title']= new RegExp(title):null;
    article.count(param,function(err,doc){
      if(err){
        res.json({
          status:'0',
          msg:err.message
        })
      }else{
        if(doc){
          res.json({
            status:'1',
            content:doc
          })
        }else{
          res.json({
            status:'0',
            msg:"查询错误！"
          })
        }
      }
    })
  };
  page(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let skip = (page-1)*pageSize;

    let tag = req.param("tag");
    let title = req.param("title");
    let param = {};
    tag!=="all"?param['tag']=new RegExp(tag):null;
    title?param['title']= new RegExp(title):null;

    console.log(param);
    article.find(param,function(err,doc){
      if(err){
        res.json({
          status:'0',
          msg:err.message
        })
      }else{
        if(doc){
          res.json({
            status:'1',
            content:doc
          })
        }else{
          res.json({
            status:'0',
            msg:"查询错误！"
          })
        }
      }
    }).skip(skip).limit(pageSize)
  };
  del(req,res,next){
    var id = req.query.id;
    article.remove({
      _id:id
    }, function (err,doc) {
      if(err){
        res.json({
          status:'0',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'1',
          msg:'',
          result:'suc'
        });
      }
    });
  };
  detail(req,res,next){
    var id = req.query.id;
    article.findOne({
      _id:id
    }, function (err,doc) {
      if(err){
        res.json({
          status:'0',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'1',
          content:doc
        });
      }
    });
  };
  comment(req,res,next){
    var self=this;
    var param = {
      content:req.body.content,
      date:formatterDateTime(new Date())
    };

    article.findOne({_id:req.body.id},function(err,doc){
      if(err){

        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        if(doc){
          var paperData = doc
          paperData.comment.push(param)
          article.update({_id:req.body.id},paperData,function(err,doc){
            if(err){
              res.json({
                status:'1',
                msg:err.message
              })
            }else{
              if(doc){
                res.json({
                  status:'1',
                })
              }else{
                res.json({
                  status:'0',
                  msg:"评论失败"
                })
              }
            }
          })
        }else{
          res.json({
            status:'0',
            msg:"评论失败"
          })
        }
      }
    })
  };


}
function  formatterDateTime(date){
  var year = date.getFullYear();
  var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports = new Article();
