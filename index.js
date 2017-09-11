var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.use(express.static('public'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.redirect('/public/index.html');
})



app.listen(3000)