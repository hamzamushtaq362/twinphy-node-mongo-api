const Response = require("./Response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User: UserModel } = require('../model');

class User extends Response {
  createProfile = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        userName,
        profileImage,
        email,
        password,
        gender,
        dateOfBirth,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstName,
        lastName,
        userName,
        profileImage,
        email,
        password: hashedPassword,
        gender,
        dateOfBirth,
      });
      await newUser.save();

      console.log(newUser);

      // Create a JWT token
      const token = jwt.sign(
        { userName: newUser.userName, email: newUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return this.sendResponse(
        res,
        "User Added successfully",
        {
          user: newUser,
          token,
        },
        201
      );
    } catch (err) {
      return this.sendResponse(
        res,
        "User Not Added!",
        err,
        500
      )
    }
  };

  updateUser = async (req, res) => {
    try {
      const userId = req.params.user_id;
      console.log(userId);
      const updatedData = req.body;
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData["password"] = hashedPassword;

      const user = await UserModel.findOne({ _id: userId });
      // console.log(user);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await UserModel.updateOne({ _id: userId }, { $set: updatedData });
      console.log("Data updated successfully");
      return this.sendResponse(
        res,
        "User Updated successfully",
        {
          user: newUser,
          token,
        },
        202
      );
    } catch (err) {
      return this.sendResponse(
        res,
        "Internal server error!",
        err,
        500
      )
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const userData=await UserModel.find({ _id: userId });

      const result = await UserModel.deleteOne({ _id: userId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return this.sendResponse(
      res,
      "User Removed successfully",
      userData,
      202
    );
    } catch (err) {
      return this.sendResponse(
        res,
        "Internal server error!",
        err,
        500
      )
    }
  };
}

module.exports = {
  User,
};
