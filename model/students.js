const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const { Schema } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/AppData");
const StudentSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        }, 
        class:{
            type:String,
            required:true
        },
        roll_no:{
            type:Number,
            required:true
        },
    });


module.exports = mongoose.model('students',StudentSchema);

