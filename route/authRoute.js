const express = require('express');
const authRoute = express();
const { json } = require('express');
var session = require('express-session');
authRoute.use(express.json());
authRoute.use(session({secret:'secretkey',resave: false,
saveUninitialized: true
}));
const token_verify = require('../midelware/token');
const auth = require('../controllers/AuthController');

authRoute.get('/registerpage',auth.registerpage);
authRoute.get('/loginpage',auth.LoginPage);
authRoute.post('/register',auth.register);
authRoute.post('/user/login',auth.login);
authRoute.get('/logout',auth.logout);
authRoute.get('/csvdemo',auth.csvfile);
authRoute.get('/student',auth.studentCSVUpload);
authRoute.post('/studentcsv',auth.studentCSV);



// const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()


/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/

    //// it is  use req.file  saev  you can get file and use it
        // var upload = multer({ dest: 'uploads/'});
        // var fs = require('fs');
        // var type = upload.single('studentfile');
        // authRoute.post("/studentcsv",type,function (req, res, next) {});
//////////////////////////////	

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {

		// Uploads is the Upload_folder_name
		cb(null, "uploads")
	},
	filename: function (req, file, cb) {
        console.log(file);
	cb(null, file.fieldname + "-" + Date.now()+".csv")
	}
})
	
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
	
		// Set the filetypes, it is optional
		var filetypes = /csv/;
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (mimetype && extname) {
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}

// mypic is the name of file attribute //studentfile is file name 
}).single("studentfile");	

authRoute.post("/studentcsv1",function (req, res, next) {
  
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
	upload(req,res,function(err) {
    console.log(req.file);
		if(err) {

			// ERROR occurred (here it can be occurred due
			// to uploading image of size greater than
			// 1MB or uploading different file type)
			res.send(err)
		}
		else {

			// SUCCESS, image successfully uploaded
			res.send("Success, Image uploaded!")
		}
	})
});
	













module.exports = authRoute;