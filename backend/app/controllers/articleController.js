const db = require("../models");
const Article = db.articles
exports.getAllArticles = (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(articles);
    }
  });
};

exports.addArticle = (req, res) => {
    console.log(req.body)
  const newArticle = new Article(req.body);
  newArticle.save((err, savedArticle) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(savedArticle);
    }
  });
};
