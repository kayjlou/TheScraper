const { Article } = require('../models')

module.exports = app => {

  //Get all articles
  app.get('/articles', (req, res) => {
    Article.find({}, (e, articles) => {
      if (e) throw e
      res.json(articles)
    })
  })
}