var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "userName":String,
  "userPwd":String,
  "avatar":String,
})
module.exports = mongoose.model('User',userSchema);
