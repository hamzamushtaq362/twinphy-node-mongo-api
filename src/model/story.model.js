const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  mediaUrls: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    timestamp: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Story = new mongoose.model("Story", storySchema);

module.exports = { Story };
