const router = require("express").Router();
const { Post } = require("../handlers");

const handler = new Post();

router.get("/", handler.getPost);
router.get("/:user_id", handler.getUserPost);
router.post("/:user_id", handler.createPost);
// router.put("/:post_id", handler.updatePost);
router.delete("/:post_id", handler.deletePost);

module.exports = {
  posts: router,
};
