const { articlesDocs } = require("../mocks/articlesDocs");

exports.getArticles = (req, res) => {
  res.json(articlesDocs);
};

exports.addNewArticle = (req, res) => {
  const newArticle = req.body;

  if (!newArticle) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  articlesDocs.push(newArticle);
  res
    .status(201)
    .json({ message: "Article added successfully", article: newArticle });
};

exports.updateArticle = (req, res) => {
  const articleName = req.params.name;
  const updatedTags = req.body;

  const articleIndex = articlesDocs.findIndex(
    (article) => article.name === articleName
  );

  if (articleIndex === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  articlesDocs[articleIndex].tags = updatedTags;

  res.json({
    message: "Article updated successfully",
    article: articlesDocs[articleIndex],
  });
};
