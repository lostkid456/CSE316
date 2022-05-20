// Question Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var questions_schema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  text: { type: String, required: true },
  tags: [{type: Schema.Types.ObjectId,ref:'Tags',required:true}],
  answers: [{type:Schema.Types.ObjectId,ref:'Answers'}],
  asked_by: { type: String },
  ask_date_time: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

questions_schema.virtual('url').get(function(){
  return 'posts/question/'+this._id;
});

module.exports = mongoose.model("Questions", questions_schema);
