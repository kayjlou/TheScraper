const express = require('express')
const { join } = require('path')
const app = express()
// const axios = require('axios')
// const cheerio = require('cheerio')
// const db = require('mongojs')('scraper_db')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

require('mongoose').connect('mongodb://localhost/scraper_db', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
  .then(_ => app.listen(3000))
  .catch(e => console.log(e))

