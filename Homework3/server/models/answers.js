// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answer_schema = new Schema({
  text: { type: String, required: true },
  ans_by: { type: String, required: true },
  ans_date_time: { type: Date, default: Date.now },
});

answer_schema.virtual('url').get(function(){
  return 'posts/answer/'+this._id;
});

module.exports = mongoose.model("Answers", answer_schema);
