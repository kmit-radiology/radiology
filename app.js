const express =  require("express");
var bodyParser = require('body-parser')

const path=require("path")
const app=express();
require("./db/conn")
const hbs=require("hbs")
const Register=require("./models/register");
const exp = require("constants");
const { __express } = require("hbs");
const ejs=require('ejs');

const port=process.env.PORT || 3000
const static_path =path.join(__dirname,'/public/');
const template_path =path.join(__dirname,'/templates/views');
app.use(express.static(static_path))


app.set("view engine","ejs");
app.set("views",template_path)
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    res.render('index')

})
app.get("/admin",(req,res)=>{
    Register.find({Validation:false},function(err,invusers){
        
        res.render('admin',{
            users:invusers
        })})

})
app.get("/register",(req,res)=>{
    res.render('registe')
})
app.post("/signup",async(req,res)=> {
    try{
        const user=new Register({
            Name :req.body.name,
            Email:req.body.email,
            phone :req.body.phno,
            Organisation:req.body.Organisation,
            Occupation:req.body.ocpt,
            Admin:false
        })
        const register =await user.save();
        res.status(201).redirect('/');

    }catch(error){
        res.status(400).send(error);
    }
})
app.post("/home",async(req,res)=>{
    try{
        const email=req.body.email;
        const pswd=req.body.password;
        const uemail =await Register.findOne({Email:email});
        if(uemail.Password === pswd &&  pswd!="") {
            if(uemail.Admin=== true){
                      
                res.status(201).redirect('/admin')
            }


             
            
            else if(uemail.Validation===false){
                res.send("Admin yet to provide Access");
            }
            else{
                res.status(201).render('main');
            }
        }


    }

    catch(error){
        res.status(400).send("invalid email")
    }
})
app.post("/chan",async(req,res)=>{
    console.log("abc");
    console.log(req.body)
    
    Register.update({Email:req.body.Email}, { $set:{Validation:true,Password:req.body.password}},function(err, result) {
        if (err)
        {
          console.log(err);
  
        }
        else{
          console.log(result);
        }
    }
    );
   
    console.log(req.body);
    res.redirect('/admin');
})
app.listen(port,()=>{
    console.log(`Server is running`);
})
