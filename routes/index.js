const express = require("express");
const usersRouter = require("./users");
const studentsRouter = require("./students");
const articlesRouter = require("./articles");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/users", usersRouter);
router.use("/students", studentsRouter);
router.use("/articles", articlesRouter);

module.exports = router;
