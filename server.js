var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var sequelize = require('sequelize');
var Categories = require('./models')['Categories'];
var Posts = require('./models')['Posts'];

var models = require('./models');
var sequelizeConnection = models.sequelize;

Posts.sync();

.then(function() {
  return sequelizeConnection.sync({})
}).then(function() {
  Categories.findAll({}).then(function(results) {
    console.log(results);
  });
})

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended:false
}));

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//home page
app.get('/', function(req, res) {

  Posts.findAll({
    order: 'score DESC'
  }).then(function(result) {
    console.log(result);
    return res.render('index', {
      posts: result
    });
  });

});

//form page
app.get('/new-post', function(req, res) {
  res.render('new');
});

app.post('/new-post', function(req, res) {
  var body = req.body;
  Posts.create({
    title: body.title,
    url: body.url,
    image: body.image,
    score: 0,
    description: body.description
  }).then(function(data) {
    console.log('data', data);
    //redirect to the posts/:id page
    res.redirect('/posts/' + data.dataValues.id);
  });
});

app.get('/posts/:id', function(req, res) {
  var id = req.params.id;
  Posts.findOne({
    where: {
      id: id
    }
  }).then(function(post) {
    console.log('post', post);
    res.render('post', {
      post: post
    });
  });
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("Connected to port: " + PORT)
});