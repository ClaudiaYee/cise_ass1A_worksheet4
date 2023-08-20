module.exports = app => {
    const articleController = require("../controllers/articleController.js")
  
    var router = require("express").Router();
  

    router.get('/', articleController.getAllArticles);
    router.post('/', articleController.addArticle);
  
    app.use("/api/article", router);
  };
  