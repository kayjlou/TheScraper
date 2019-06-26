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
    axios.get('https://www.nytimes.com/')
      .then(({ data }) => {
        console.log('Scraping NY times')
        const $ = require('cheerio').load(data)
        const results = []

        $('article').each((i, elem) => results.push({
          title: $(elem)
            .find('h2')
            .text(),

          summary: $(elem).find('p').text(),
          link: "https://www.nytimes.com" + $(elem).find('a').attr('href')
        }))
        console.log(results)
        Article.create(results)
        res.send(results)
      })
  })

  //Returns all favorite articles
  app.get('/favorites', (req, res) => {
    Article.find({ favorite: true })
      .then(articles => res.json(articles))
      .catch(e => console.log(e))
  })

  //Updates articles to favorite 
  app.put('/articles/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, { favorite: true })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  //Deletes 
  app.delete('/articles/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })



  app.get('/', (req, res) => {
    Article.find({})
      .then(articles => {
        console.log('Retrieving articles')
        res.json(articles)
      })
      .catch(e => console.log(e))
  })




}