const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  mediaUrls: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const Post = mongoose.model("posts", postSchema);

module.exports = {Post};
