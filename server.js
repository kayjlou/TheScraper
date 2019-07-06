const express = require('express')
const { join } = require('path')
const app = express()
require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperdb'



// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname + '/public/index.html'))
// })

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

require('mongoose').connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
  .then(_ => app.listen(process.env.PORT || 8080))
  .catch(e => console.log(e))

app.get('/', (req, res) => {
  res.sendFile('__dirname' + '/public/index.html')
})



//Next write out schemas(blue print) for the article it will be under models

