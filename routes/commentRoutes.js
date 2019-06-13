const { Comment, Article } = require('../models')

module.exports = app => {

  //Get all articles
  app.get('/comments', (req, res) => {
    Comment.find({})
      .populate('comment')
      .then(comments => {
        res.json(comments)
      })
      .catch(e => console.log(e))
  })


  // app.get('/comments', (req, res) => {
  //   Comment.find({}, (e, comments) => {
  //     if (e) throw e
  //     res.json(comments)
  //   })
  // })



  //Post a comment
  app.post('/comments', (req, res) => {
    Comment.create(req.body, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
}