const Response = require("./Response");
const { Story: StoryModel, User } = require("../model");

class Story extends Response {
    
  getStory = async (req, res) => {
    try {
      const story = await StoryModel.find({});
      if (!story) {
        return this.sendResponse(res, "story not found", null, 404);
      }
      return this.sendResponse(res, "list of story", story, 200);
    } catch (err) {
      return this.sendResponse(res, "internal server error", err, 500);
    }
  };

  getUserStory = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const storyData = await StoryModel.find({ user_id: userId });

      if (!storyData) {
        return this.sendResponse(res, "Story not found", null, 404);
      }

      return this.sendResponse(
        res,
        "Story Reterived successfully",
        storyData,
        200
      );
    } catch (err) {
      return this.sendResponse(res, "Internal server error!", err, 500);
    }
  };

  createStory = async (req, res) => {
    try {
      const { mediaUrls, text, timeStamp } = req.body;
      const userId = req.params.user_id;
      const user = await User.findOne({ _id: userId });
      console.log(req.body, user._id);

      const newStory = new StoryModel({
        mediaUrls,
        text,
        timeStamp,
        user_id: user._id,
      });

      await newStory.save();
      console.log(newStory);

      return this.sendResponse(res, "Story Added successfully", newStory, 201);
    } catch (err) {
      return this.sendResponse(res, "story Not Added!", err, 500);
    }
  };

  deleteStories = async (req, res) => {
    try {
      const storyId = req.params.story_id;
      const storyData = await StoryModel.find({ _id: storyId });

      const result = await StoryModel.deleteOne({ _id: storyId });

      if (result.deletedCount === 0) {
        return this.sendResponse(res, "story not found", null, 404);
      }

      return this.sendResponse(
        res,
        "story Removed successfully",
        storyData,
        202
      );
    } catch (err) {
      return this.sendResponse(res, "Internal server error!", err, 500);
    }
  };
}

module.exports = {
  Story,
};
