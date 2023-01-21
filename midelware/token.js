var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secrettoken ='secrettoken';
const varify = async (req,res,next)=>{
    try {
        const header = req.headers['authorization'];
        if(header  !== 'undefined'){
            jwt.verify(header, secrettoken, function(err, decoded) {
              if(err){
              
                res.send('Invalid user ID');
              }else{
               
                next();
              
              }
            });
        
        }  else{
            res.send('token is neccesary');
        } 
      
    }catch{

    }
}

const islogin= async (req,res,next)=>{
        if(req.session.user_id){
          next();
        }else{
          res.render('loginpage');
        }

}

module.exports = {varify,islogin};