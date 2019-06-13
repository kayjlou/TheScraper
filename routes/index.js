module.exports = app => {

  //Require in route js files here
  require('./articleRoutes.js')(app)
  require('./commentRoutes.js')(app)
}