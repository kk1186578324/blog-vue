var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
  "title":String,
  "tag":Array,
  "content":String,
  "date":String,
  "comment":[
    {
      "content":String,
      "date":String,
      "back":String
    }


  ]
})
module.exports = mongoose.model('article',articleSchema);
