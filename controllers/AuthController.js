var usermodel = require('../model/users');
var studentmodel = require('../model/students');

var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const secrettoken = 'secrettoken';
var session = require('express-session');
const path = require("path")
var multer = require('multer');

const csvParser = require("csv-parser");

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const url = require('url');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());


const fs = require("fs");
const ExcelJS = require('exceljs');
const CSVToJSON = require("csvtojson");
const { convertCSVToArray } = require('convert-csv-to-array');
const csvtoarray = require('convert-csv-to-array');


app.use(bodyParser.json());
const LoginPage = async (req, res) => {

    if (typeof req.session.user_id !== "undefined") {
        console.log('asasas');
        res.render('userhome', {
            name: req.session.user_id
        });
    } else {
        res.render('loginpage');
    }


}
const registerpage = async (req, res) => {

    res.render('registerpage');
}
const register = async (req, res) => {
    try {
        const saltRounds = 10;
        const HashPass = await bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
            // Store hash in your password DB.
            return hash;
        });
        const user = new usermodel({
            name: req.body.username,
            email: req.body.useremail,
            password: HashPass,
        })
        const userdata = await user.save();
        res.render('loginpage');

    } catch (error) {
        res.send(error);
    }

}

const login = async (req, res) => {
    try {




        if (req.body.useremail != null || req.body.useremail != '') {
            const checkuser = await usermodel.findOne({ email: req.body.useremail });

            if (checkuser != null) {

                const resultHash = await bcrypt.compare(req.body.password, checkuser.password).then(function (result) {
                    return result;
                });

                if (resultHash == true) {
                    req.session.user_id = checkuser.name;
                    res.render('userhome', { name: checkuser.name })
                } else {
                    res.render('loginpage', { error: 'Password is not correct' })
                }
            } else {
                res.render('loginpage', { error: 'user not found plase try again' });
            }

        } else {

            res.send('loginpage', { error: 'please enter useremail and password' });
        }
    } catch (error) {
        res.send(error);
    }
}
const logout = async (req, res) => {
    req.session.destroy((err) => {
        res.redirect('loginpage') // will always fire after session is destroyed
    })
    // res.render('loginpage');
}




const csvfile = async (req, res) => {
    const csvFilePath = 'data.csv';
    // console.log('csvFilePath');
    ///////////////////////////////////////////csv to json 
    // CSVToJSON()
    // .fromFile('data.csv')
    // .then(users => {
    //   // users is a JSON array
    //   // log the JSON array
    //   console.log(users)
    // //   res.send(users)
    // })
    // .catch(err => {
    //   // log error if any
    //   console.log(err)
    // }
    ////
    const users = await CSVToJSON({
        noheader: true,
        output: "csv"
    }).fromFile('data.csv');
    // res.send(users);
    //////////////////////////////////////////////////////////////////////////
    ///////////////////////csv to array

    // const data = 'number;first;last;handle\n1;Mark;Otto;@mdo\n2;Jacob;Thornton;@fat\n3;Larry;the Bird;@twitter\n';
    ////////read csv file and push data in array 
    const fs = require("fs");
    const readline = require("readline");
    const stream = fs.createReadStream("./data.csv");
    const rl = readline.createInterface({ input: stream });
    let data1 = [];
    rl.on("line", (row) => {
        data1.push(row.split(","));
    });

    rl.on("close", () => {
        // console.log(data1);

        // it will return only data arary
        // res.send(data1);
    });

    //////////////////////////////////////////


    //////////////////////////read csv file 


    // const csvParser = require("csv-parser");

    const result = [];

    fs.createReadStream("./data.csv")
        .pipe(csvParser())
        .on("data", (datacsv) => {
            result.push(datacsv);
        })
        .on("end", () => {
            // console.log(result);
            ////it will return associtivve array header is key and  another lies arae value 
            result.forEach(element => {
                console.log(element['id']);

            });
            // res.send(result);
        });



    ///////////////////////////////


    // const data = "./data.csv";
    // const arrayofArrays = convertCSVToArray(data, {
    //     type: 'array',
    //     separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
    //   });
    //   res.send(arrayofArrays);
    // res.send(JSON.stringify(users, null, 4));

}

const studentCSVUpload = async (req, res) => {
    res.render('students');

}



// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it	
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + "-" + Date.now() + ".csv")
    }
})

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {

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


const studentCSV = async (req, res) => {

    // error occurs, the image would not be uploaded!
    upload(req, res, function (err) {
        // console.log(req.file.path);
        if (err) {

            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)

        }
        else {

            // SUCCESS, image successfully uploaded
            // res.send("Success, your file uploaded!")
        }
        // console.log(req.file.path);
        var resResult = 0;
        var availRoll_no = 0;

        const csvParser = require("csv-parser");
        const result = [];
        // const student = '' ;
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on("data", async (datacsv) => {
                // console.log(datacsv.id);


                result.push(datacsv);



            })
            .on("end", async () => {
                ////it will return associtivve array header is key and  another lies arae value
                result.forEach(element => {

                    var sdata = new studentmodel({
                        roll_no: element['id'],
                        name: element['name'],
                        class: element['class'],
                        phone: element['phone_no'],
                    });
                    const studentdata = sdata.save();
                    studentdata.then(function (result) { //sing then promise resolved
                        // console.log(result);// save data show // "Some User token" 
                    })
                    resResult++;
                });

                if (result.length == resResult) {
                    res.render('students', { msg: 'Your Data Saved Successfully' });
                } else {
                    res.render('students', { msg: 'Please try Again!!!!' });


                }




            });
    })

}


module.exports = { LoginPage, registerpage, register, login, logout, csvfile, studentCSVUpload, studentCSV};