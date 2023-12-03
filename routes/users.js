const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

const { userExists, validateUserPayload } = usersController.middleware;
const { validateBody } = require("../middlewares/users.mdware");

const logRequestDetails = (req, res, next) => {
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  console.log(`Request Params: ${JSON.stringify(req.params)}`);
  next();
};

router.get("/", logRequestDetails, usersController.getUsers);
router.post("/", logRequestDetails, validateBody, validateUserPayload, usersController.addUser);
router.get("/:email", userExists, usersController.getUserByEmail);
router.put("/:email", logRequestDetails, validateBody, userExists, validateUserPayload, usersController.updateUser);
router.delete("/:email", userExists, usersController.deleteUser);

module.exports = router;
