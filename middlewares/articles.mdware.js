const createError = require("http-errors");

const validateArticleBody = (req, res, next) => {
  const requiredFields = ["name", "description", "type", "tags"]; 

  for (const field of requiredFields) {
    if (!(field in req.body)) {
      return next(createError(400, `Bad Request: ${field} is required`));
    }
  }

  next();
};

module.exports = {
  validateArticleBody,
};