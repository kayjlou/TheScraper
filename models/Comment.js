// const { Schema, Model } = require('mongoose')

module.exports = (Schema, model) => {
  const Comment = new Schema({
    body: {
      type: String
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  })

  //Make the comment model
  return model('Comment', Comment)

}