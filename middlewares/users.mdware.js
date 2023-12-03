const { usersDocs } = require("../mocks/usersDocs");
const createError = require("http-errors");

const userExists = (req, res, next) => {
  const userEmail = req.params.email;
  const user = usersDocs.find((user) => user.email === userEmail);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user;
  next();
};

const validateUserPayload = (req, res, next) => {
  const newUser = req.body;

  if (!newUser) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  req.validatedUser = newUser;
  next();
};

const validateBody = (req, res, next) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "age",
    "address",
    "createdAt",
    "tags",
  ];

  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    const errorMessage = `Bad Request: Missing required fields - ${missingFields.join(
      ", "
    )}`;
    return next(createError(400, errorMessage));
  }

  next();
};

module.exports = {
  userExists,
  validateUserPayload,
  validateBody,
};
