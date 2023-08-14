const router = require("express").Router();
const { Following } = require("../handlers");

const handler = new Following();

router.post("/", handler.addFollowing);

module.exports = {
  followings: router,
};
