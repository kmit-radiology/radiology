const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    Name :{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    phone :{
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        default:""
    },
    Organisation:{
        type:String,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    Admin:{
        type:Boolean,
        default:'false'
    },
    Validation:{
        type:Boolean,
        default:'false'
    }
})

const Register = new mongoose.model("Register",userSchema);
module.exports=Register;