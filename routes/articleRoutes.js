const { Article } = require('../models')
const axios = require('axios')

module.exports = app => {


  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
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
        const $ = require('cheerio').load(data)
        const results = []

        getSummary = (elem) => {
          let summary = ""
          if ($(elem).find("ul").length) {
            summary = $(elem).find("li").first().text();
          } else {
            summary = $(elem).find("p").text();
          }
          return summary
        }

        $('article').each((i, elem) => {
          Article.find({ link: `https://www.nytimes.com${$(elem).find('a').attr('href')}` })
            .then(article => {
              if (article.length === 0) {
                Article.create({
                  title: $(elem).find('h2').text(),
                  summary: getSummary(elem),
                  link: `https://www.nytimes.com${$(elem).find('a').attr('href')}`,
                })
              }
            })
        })
        res.sendStatus(200)

        // $('article').each((i, elem) => results.push({
        //   title: $(elem)
        //     .find('h2')
        //     .text(),

        //   summary: getSummary(elem),
        //   link: "https://www.nytimes.com" + $(elem).find('a').attr('href')
        // }))
        // console.log(results)
        // Article.create(results)
        // res.send(results)
      })
      .catch(e => console.log(e))
  })



  //Returns all favorite articles
  app.get('/favorites', (req, res) => {
    Article.find({ saved: true })
      .then(articles => res.json(articles))
      .catch(e => console.log(e))
  })

  //Updates articles to favorite 
  app.put('/articles/:id', (req, res) => {
    console.log(`updating favorite at ${req.params.id}`)

    Article.findByIdAndUpdate(req.params.id, { saved: true })
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  //Updates articles to remove from favorite
  app.put('/favorites/:id', (req, res) => {
    console.log(`removing favorite at ${req.params.id}`)

    Article.findByIdAndUpdate(req.params.id, { saved: false })
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