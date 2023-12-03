const { usersDocs } = require("../mocks/usersDocs");
const usersMiddleware = require("../middlewares/users.mdware");
const { userExists, validateUserPayload } = usersMiddleware;

exports.getUsers = (req, res) => {
  res.json(usersDocs);
};

exports.addUser = (req, res) => {
  const newUser = req.validatedUser;

  usersDocs.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
};

exports.getUserByEmail = (req, res) => {
  const user = req.user;
  res.json(user);
};

exports.updateUser = (req, res) => {
  const userEmail = req.params.email;
  const updatedData = req.validatedUser;

  const userIndex = usersDocs.findIndex((user) => user.email === userEmail);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  usersDocs[userIndex] = { ...usersDocs[userIndex], ...updatedData };

  res.json({
    message: "User updated successfully",
    user: usersDocs[userIndex],
  });
};

exports.deleteUser = (req, res) => {
  const userEmail = req.params.email;
  const userIndex = usersDocs.findIndex((user) => user.email === userEmail);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = usersDocs.splice(userIndex, 1)[0];

  res.json({ message: "User deleted successfully", usersDocs });
};

exports.middleware = {
  userExists,
  validateUserPayload,
};