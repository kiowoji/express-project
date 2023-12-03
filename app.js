const express = require("express");
const app = express();
const port = 3000;
const indexRouter = require("./routes/index");

app.use(express.json());
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
