const router = require("express").Router();
const { Story } = require("../handlers");

const handler = new Story();

router.get("/", handler.getStory);
router.get("/:user_id", handler.getUserStory);
router.post("/:user_id", handler.createStory);
router.delete("/:story_id", handler.deleteStories);

module.exports = {
  stories: router,
};
