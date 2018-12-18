
var User = require('./../models/user');


class Admin {
  login(req,res,next){
    var param = {
      userName:req.body.name,
      userPwd:req.body.password
    }
    User.findOne(param,function(err,doc){
      if(err){
        console.log(err);
        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        if(doc){
          console.log(doc);
          res.cookie("userPwd",doc.userPwd,{
            path:'/',
            maxAge:1000*60*60
          });
          res.cookie("userName",doc.userName,{
            path:'/',
            maxAge:1000*60*60
          })
          res.json({
            status:'1',
            msg:'',
            result:{
              userName:doc.userName,
              userPwd:doc.userPwd
            }
          })
        }else{
          User.create(param,function(err,doc){
            console.log(err,doc)
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
        }
      }
    })
  }
}
module.exports = new Admin();
