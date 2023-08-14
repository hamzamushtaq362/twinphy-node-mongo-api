const router = require("express").Router();
const { User } = require("../handlers");

const handler = new User();

router.post("/", handler.createProfile);
router.put("/:user_id", handler.updateUser);
router.delete("/:user_id", handler.deleteUser);

module.exports = {
  users: router,
};
