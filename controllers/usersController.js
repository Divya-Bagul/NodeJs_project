var usermodel = require('../model/users');
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const secrettoken ='secrettoken';
var session = require('express-session');

const ExcelJS = require('exceljs');
const { count } = require('../model/users');

// const res = require('express/lib/response');
const insertuser = async (req,res)=>{
    try {
        const saltRounds = 10;
       const HashPass = await   bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
            // Store hash in your password DB.
          return hash;
        });

        const user = new usermodel({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password:HashPass,
        });

        const result = await user.save();
        res.send(result); 
    } catch (error) {
        res.send(error);
    }
  
}
const showuser = async (req,res)=>{
    try {

        const user = await usermodel.find();
        res.send(user); 
    } catch (error) {
        res.send(error);
    }
}
const updateuser = async (req,res)=>{
    try {

        const user = await usermodel.updateMany(
            {
                _id:req.params._id
            },
            {$set:{
                    name:req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                }}
        );
        res.send(user); 
    } catch (error) {
        res.send(error);
    }
}
const deleteuser = async (req,res)=>{
    try {

        const user = await usermodel.deleteMany({
                _id:req.params._id
            });
        res.send(user); 
    } catch (error) {
        res.send(error);
    }
}


const login = async (req,res)=>{
    try {
       
        const email = req.body.email;
        const userData = await usermodel.findOne({'email':email});

        if(userData !== null){

            const resultHash =  await bcrypt.compare(req.body.password,userData.password).then(function(result) {
                return result;
            });
            if(resultHash == true){
               
                const token = jwt.sign({
                    name: userData.name,
                    email: userData.email,
                    }, secrettoken, { expiresIn: '24h' });
                
                    const result = {
                        name: userData.name,
                        email: userData.email,
                        token: token
                    }

                    if(req.body.notapi == 1){
                        req.session.user_id=userData._id;
                        res.render('profile',{name:userData.name}); 
                    }else{
                        res.send(result); 
                    }
                
            }else{
              
                res.send("email and password not martching"); 
            }

        }else{
            res.send("You are not registerd user"); 
        }
     
    } catch (error) {
        res.send(error);
    }
}

const profile = async (req,res)=>{
    try {
        const header = req.headers['authorization'];
        if(header  !== 'undefined'){
            jwt.verify(header, secrettoken, function(err, decoded) {
              if(err){
                    res.send('inavalid token');
              }else{
                res.send(decoded);
              }
              });
         res.send(header);
        }  else{
            res.send('token is neccesary');
        } 
        res.send('asasas');
    }catch{

    }
}

//use in express using middelware 
const userProfile = async (req,res)=>{
   
    try {
       
         res.render("profile",{name:req.body.email});
        
                    // res.send('asasas');
    }catch{
        
    }
}
const loginpage = async (req,res)=>{
    try {
        if(req.session.user_id){
            res.render('profile',{name:req.session.user_id});
          }else{
            res.render('login');
          }  
       
    }catch{

    }
}

const adduser = async (req,res)=>{
    try {
            
        res.render('home',{name:req.session.user_id});
       
    }catch{

    }
}




const exportusers = async (req,res)=>{
    try {
          
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");


        worksheet.columns = [
            {header: 'Id', key: '_id', width: 10},
            {header: 'Name', key: 'name', width: 32}, 
            {header: 'Email', key: 'email', width: 32}, 
            {header: 'password', key: 'password', width: 32}, 
            

          
          ];
          const user = await usermodel.find();
        
          
            const counter = 1;
             user.forEach(userData => {
         
            worksheet.addRow(userData);
            
          });
          worksheet.getRow(1).eachCell((cell) => {
                cell.font ={bold:true}

          });
        //   worksheet.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

        res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition','attachment; filename=sample.xlsx');
          // save workbook to disk
            return  workbook.xlsx
                .write(res)
                .then(() => {
                    res.status(200);
                    console.log("saved");
                    
                })
                .catch((err) => {
                    console.log("err", err);
                });
      
       
    }catch{

    }
}
module.exports = {insertuser,showuser,updateuser,deleteuser,login,profile,loginpage,userProfile,adduser,exportusers};

