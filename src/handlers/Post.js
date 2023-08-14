const Response = require("./Response");
const { Post: PostModel, User } = require("../model");
const mongoose = require("mongoose");

class Post extends Response {
  getPost = async (req, res) => {
    try {
      const post = await PostModel.find({});
      if (!post) {
        return this.sendResponse(res, "post not found", null, 404);
      }
      return this.sendResponse(res, "list of post", post, 200);
    } catch (err) {
      return this.sendResponse(res, "internal server error", err, 500);
    }
  };

  getUserPost = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const postData = await PostModel.find({ user_id: userId });

      if (!postData) {
        return this.sendResponse(res, "post not found", null, 404);
      }

      return this.sendResponse(
        res,
        "Post Reterived successfully",
        postData,
        200
      );
    } catch (err) {
      return this.sendResponse(res, "Internal server error!", err, 500);
    }
  };

  createPost = async (req, res) => {
    try {
      const { mediaUrls, text } = req.body;
      const userId = req.params.user_id;
      const user = await User.findOne({ _id: userId });
      //   const user_id = new ObjectId(req.params.user_id);
      console.log(req.body, user._id);

      const newPost = new PostModel({
        mediaUrls,
        text,
        user_id: user._id,
      });

      await newPost.save();
      console.log(newPost);

      return this.sendResponse(res, "User Added successfully", newPost, 201);
    } catch (err) {
      return this.sendResponse(res, "User Not Added!", err, 500);
    }
  };
  //   updatePost = async (req, res) => {
  //     try {
  //       const postId = req.params.post_id;
  //       console.log(postId);
  //       const updatedData = req.body;

  //       const post = await PostModel.findOne({ _id: postId });

  //       if (!post) {
  //         return res.status(404).json({ error: "Post not found" });
  //       }

  //       await PostModel.updateOne({ _id: postId }, { $set: updatedData });
  //       console.log("Data updated successfully");
  //       return this.sendResponse(
  //         res,
  //         "Post Updated successfully",
  //         updatedData,
  //         202
  //       );
  //     } catch (err) {
  //       return this.sendResponse(
  //         res,
  //         "Internal server error!",
  //         err,
  //         500
  //       )
  //     }
  //   };

  deletePost = async (req, res) => {
    try {
      const postId = req.params.post_id;
      const postData = await PostModel.find({ _id: postId });

      const result = await PostModel.deleteOne({ _id: postId });

      if (result.deletedCount === 0) {
       return this.sendResponse(res, "post not found", null, 404);
      }

      return this.sendResponse(res, "Post Removed successfully", postData, 202);
    } catch (err) {
      return this.sendResponse(res, "Internal server error!", err, 500);
    }
  };
}

module.exports = {
  Post,
};
