const router = require("express").Router();
const { Follower } = require("../handlers");

const handler = new Follower();

router.post("/", handler.addFollower);
// router.delete("/:user_id", handler.deleteFollower);

module.exports = {
  followers: router,
};
