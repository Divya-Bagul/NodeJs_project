var mysql      = require('mysql');
module.exports = connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'AppData'
});
connection.connect((err)=>{
    if(err){
        console.log('err');
    }else{
        console.log('connect');
    }   
});