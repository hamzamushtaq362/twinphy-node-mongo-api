const Response = require("./Response");
const { Follower: FollwerModel, User } = require("../model");
const mongoose = require("mongoose");

class Follower extends Response {
  //   getPost = async (req, res) => {
  //     try {
  //       const post = await FollwerModel.find({});
  //       if (!post) {
  //         return this.sendResponse(res, "post not found", null, 404);
  //       }
  //       return this.sendResponse(res, "list of post", post, 200);
  //     } catch (err) {
  //       return this.sendResponse(res, "internal server error", err, 500);
  //     }
  //   };

  //   getUserPost = async (req, res) => {
  //     try {
  //       const userId = req.params.user_id;
  //       const postData = await FollwerModel.find({ user_id: userId });

  //       if (!postData) {
  //         return this.sendResponse(res, "post not found", null, 404);
  //       }

  //       return this.sendResponse(
  //         res,
  //         "Post Reterived successfully",
  //         postData,
  //         200
  //       );
  //     } catch (err) {
  //       return this.sendResponse(res, "Internal server error!", err, 500);
  //     }
  //   };

  addFollower = async (req, res) => {
    try {
      const follower_id = null; // Get this from token
      const { user_id } = req.body; // Person to follow
      const userExist = await User.findOne({ _id: user_id });
      if (!userExist)
        return this.sendResponse(res, "User not found", null, 404);
      const { followers } = userExist;
      if (followers.includes(follower_id))
        return this.sendResponse(res, "Already following this user", null, 400);
      followers.push(follower_id);
      const addFollower = User.updateOne(
        { _id: user_id },
        { $set: { followers } }
      );
      return this.sendResponse(
        res,
        `Started following ${userExist?.firstName} ${userExist?.lastName}`,
        addFollower,
        200
      );
    } catch (err) {
      return this.sendResponse(res, "User Not Added!", err, 500);
    }
  };
  //   updatePost = async (req, res) => {
  //     try {
  //       const postId = req.params.post_id;
  //       console.log(postId);
  //       const updatedData = req.body;

  //       const post = await FollwerModel.findOne({ _id: postId });

  //       if (!post) {
  //         return res.status(404).json({ error: "Post not found" });
  //       }

  //       await FollwerModel.updateOne({ _id: postId }, { $set: updatedData });
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

  //   deletePost = async (req, res) => {
  //     try {
  //       const postId = req.params.post_id;
  //       const postData = await FollwerModel.find({ _id: postId });

  //       const result = await FollwerModel.deleteOne({ _id: postId });

  //       if (result.deletedCount === 0) {
  //        return this.sendResponse(res, "post not found", null, 404);
  //       }

  //       return this.sendResponse(res, "Post Removed successfully", postData, 202);
  //     } catch (err) {
  //       return this.sendResponse(res, "Internal server error!", err, 500);
  //     }
  //   };
}

module.exports = {
  Follower,
};
