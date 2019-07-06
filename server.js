const express = require('express')
const { join } = require('path')
const app = express()


app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/scraperdb', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
  .then(_ => app.listen(3000))
  .catch(e => console.log(e))


//Next write out schemas(blue print) for the article it will be under models

