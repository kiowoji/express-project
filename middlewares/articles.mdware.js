const createError = require("http-errors");

const validateArticleBody = (req, res, next) => {
  const requiredFields = ["name", "description", "type", "tags"];
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
  validateArticleBody,
};