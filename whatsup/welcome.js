var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// require('dotenv').config()
const { sendMessage, getTextMessageInput } = require("./messageHelper");

router.use(bodyParser.json());

router.get('/api', function(req, res, next) {
    console.log('asas');
  var data = getTextMessageInput(8511224041, 'Welcome to the Movie Ticket Demo App for Node.js!');
//   res.send('asas');
  sendMessage(data)
    .then(function (response) {
      res.redirect('/');
      res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error);
      res.sendStatus(500);
      return;
    });
});


module.exports = router;