const mongoose = require('mongoose')

let CommentSchema = new mongoose.Schema({
  title: String,
  body: String
})

//Make the comment model
let Comment = mongoose.model('Comment', CommentSchema)

//Export Comment model
module.exports = Comment