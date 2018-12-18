var mongoose = require('mongoose');
var albumSchema = new mongoose.Schema({
  "albumName":String,
  "albumDesc":String,
  "images":Array,
})
module.exports = mongoose.model('Album',albumSchema);
