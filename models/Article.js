module.exports = (Schema, model) => {

  const Article = new Schema({
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String
    },
    link: {
      type: String
      // ref:
    },
    saved: {
      type: Boolean,
      default: false
    },
    //Each comment referenes comments -- from object
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]

  })

  //Creates our model from the above schema andnames it Article
  return model('Article', Article)
}


