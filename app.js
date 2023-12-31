const express = require("express");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/errors.mdware");

app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;
  console.log(`${timestamp} - ${method} ${url}`);
  next();
});

app.use(express.json());
app.use("/", indexRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
