
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

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
const user_route = require('./route/userRoute');
const auth_route = require('./route/authRoute');
const token_verify = require('./midelware/token');

// app.use('/',user_route);

app.use('/',auth_route);
// const user = require('./controllers/usersController');

// app.post('/insert',user.insertuser);

// app.get('/show',user.showuser);

// app.put('/update/:_id', user.updateuser);
// app.delete('/delete/:_id', user.deleteuser);



app.listen(5000);