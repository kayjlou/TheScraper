// const { Schema, Model } = require('mongoose')

module.exports = (Schema, model) => {
  const Comment = new Schema({
    title: String,
    body: String
  })

  //Make the comment model
  return model('Comment', Comment)

}