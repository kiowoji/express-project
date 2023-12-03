const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

const { userExists, validateUserPayload } = usersController.middleware;
const { validateBody } = require("../middlewares/users.mdware");

router.get("/", usersController.getUsers);
router.post("/", validateBody, validateUserPayload, usersController.addUser);
router.get("/:email", userExists, usersController.getUserByEmail);
router.put(
  "/:email",
  validateBody,
  userExists,
  validateUserPayload,
  usersController.updateUser
);
router.delete("/:email", userExists, usersController.deleteUser);

module.exports = router;
