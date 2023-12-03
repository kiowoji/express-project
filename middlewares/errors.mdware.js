const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    console.error(err.stack);
    err = createError(500, "Internal Server Error");
  }

  res.status(err.status).json({ error: err.message });
};

module.exports = errorHandler;
