const express = require('express');
const userRoute = express();
const { json } = require('express');
var session = require('express-session');
userRoute.use(express.json());
userRoute.use(session({secret:'secretkey',resave: false,
saveUninitialized: true
}));
const token_verify = require('../midelware/token');
const user = require('../controllers/usersController');

userRoute.post('/insert',user.insertuser);

userRoute.get('/show',user.showuser);

userRoute.put('/update/:_id', user.updateuser);
userRoute.delete('/delete/:_id', user.deleteuser);
userRoute.post('/login', user.login);


userRoute.post('/profile', user.profile);
userRoute.post('/userprofile',token_verify.varify, user.userProfile);

userRoute.get('/adduser',token_verify.islogin, user.adduser);
userRoute.get('/export', user.exportusers);



userRoute.get('/loginpage', user.loginpage);



module.exports = userRoute;