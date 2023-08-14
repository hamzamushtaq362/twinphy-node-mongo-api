const Response = require("./Response");
const { User } = require("../model");
const mongoose = require("mongoose");

class Following extends Response {

    addFollowing = async (req, res) => {
    try {
      const following_id = null; // Get this from token
      const { user_id } = req.body; // Person to follow
      const userExist = await User.findOne({ _id: user_id });
      if (!userExist)
        return this.sendResponse(res, "User not found", null, 404);
      const { following } = userExist;
      if (following.includes(following_id))
        return this.sendResponse(res, "Already following this user", null, 400);
      following.push(following_id);
      const addFollowing = User.updateOne(
        { _id: user_id },
        { $set: { following } }
      );
      return this.sendResponse(
        res,
        `Started following ${userExist?.firstName} ${userExist?.lastName}`,
        addFollowing,
        200
      );
    } catch (err) {
      return this.sendResponse(res, "User Not Added!", err, 500);
    }
  };
}

module.exports = {
    Following,
};
