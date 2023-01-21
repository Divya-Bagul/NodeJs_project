const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const { Schema } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/AppData");
const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        // phone:{
        //     type:Number,
        //     required:true
        // }, 
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
    });


module.exports = mongoose.model('users',UserSchema);

