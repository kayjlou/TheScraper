const mongoose = require('mongoose')
const Comment = require('./Comment.js')

let ArticleSchema = new mongoose.Schema({
  title: {
    title: String,
    require: true
  },
  summary: {
    type: String
  },
  // link: {
  //   type:
  //   ref:
  // }
  saved: {
    type: Boolean,
    default: false
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

})

//Creates our model from the above schema andnames it Article
let Article = mongoose.model('Article', ArticleSchema)

//Export the Article Model
module.exports = Article