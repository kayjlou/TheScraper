const { Article } = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = app => {

  //Get all articles
  app.get('/articles', (req, res) => {
    Article.find({})
      // .populate('comments')
      .then(articles => res.json(articles))
      .catch(e => console.log(e))
  })

  //Scrape website and push to database
  app.get('/scrape', (req, res) => {
    axios.get('https://stackoverflow.com')
      .then(({ data }) => {
        console.log('Scraping Stack Overflow')
        const $ = require('cheerio').load(data)
        const results = []
        $('div.summary').each((i, elem) => results.push({
          title: $(elem).children('h3').children('a').text()
        }))
        // console.log(results)
        Article.create(results)
        res.send(results)
      })
  })

  app.get('/', (req, res) => {
    Article.find({})
      .then(articles => {
        console.log('Retrieving articles')
        res.json(articles)
      })
  })




}