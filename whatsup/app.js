var mysql      = require('mysql');
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const { json } = require('express');
app.use(express.json());
// for parsing application/json
app.use(bodyParser.json()); 

var welcomeRouter = require('./welcome');
app.use('/welcome', welcomeRouter);

const axios = require('axios');
const http = require('http');

// http.post('http://truesender.xyz/wapp/api/send?apikey=69543508165d4c72a7b1bef116ea14c0&mobile=7283947790&msg="testmsg"', (resp) => {
//   let data = '';

//   console.log(resp);
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(data);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });
app.post('/http://truesender.xyz/wapp/api/send?apikey=69543508165d4c72a7b1bef116ea14c0&mobile=7283947790&msg="testmsg"', function(req, res, next) {
    res.send("done");

});
app.listen(5000);