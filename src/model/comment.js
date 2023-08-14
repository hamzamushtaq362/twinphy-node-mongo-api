var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Comment = new Schema({
  post_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
var Model = mongoose.model("Comment", Comment);
module.exports = Model;
