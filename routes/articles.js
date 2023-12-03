const express = require("express");
const router = express.Router();
const {
  getArticles,
  addNewArticle,
  updateArticle,
} = require("../controllers/articles.controller");
const { validateArticleBody } = require("../middlewares/articles.mdware");

router.get("/", getArticles);
router.post("/", validateArticleBody, addNewArticle);
router.put("/:name", updateArticle);

module.exports = router;
