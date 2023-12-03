const { usersDocs } = require("../mocks/usersDocs");
const createError = require("http-errors");

const userExists = (req, res, next) => {
  const userEmail = req.params.email;
  const user = usersDocs.find((user) => user.email === userEmail);

  if (!user) {
    return next(createError(404, "User not found"));
  }

  req.user = user;
  next();
};

const validateUserPayload = (req, res, next) => {
  const newUser = req.body;

  if (!newUser) {
    return next(createError(400, "Invalid JSON payload"));
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

  const { firstName, lastName, email, age, createdAt, tags, address } = req.body;

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return next(
      createError(400, "Bad Request: Name should contain only letters")
    );
  }

  if (email && !isValidEmail(email)) {
    return next(createError(400, "Bad Request: Invalid email format"));
  }

  if (age && !isValidAge(age)) {
    return next(createError(400, "Bad Request: Invalid age format"));
  }

  if (createdAt && !isValidDate(createdAt)) {
    return next(createError(400, "Bad Request: Invalid createdAt format"));
  }

  if (tags && !Array.isArray(tags)) {
    return next(createError(400, "Bad Request: Tags must be an array"));
  }

  if (address && typeof address !== "object") {
    return next(createError(400, "Bad Request: Address must be an object"));
  }

  next();
};

const isValidName = (name) => {
  return /^[A-Za-z]+$/.test(name);
};

const isValidEmail = (email) => {
  if (typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
    return false;
  }
  return true;
};

const isValidAge = (age) => {
  return typeof age === "number" && age > 0;
};

const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

module.exports = {
  userExists,
  validateUserPayload,
  validateBody,
};
