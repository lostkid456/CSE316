// Tag Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tags_schema = new Schema({
  name: { type: String, required: true },
});

tags_schema.virtual('url').get(function(){
  return 'posts/tag/'+this._id;
});

module.exports = mongoose.model("Tags", tags_schema);
