const express =require("express");
const app= express();
const mongoose= require('mongoose');
const dotenv =require("dotenv");
var cookieParser = require('cookie-parser');
dotenv.config({path:'./config.env'});
const authenticate = require('./middleware/authenticate');

   require('./db/conn');
   
// const User =require("./model/userScema");

app.use(express.json());
app.use(cookieParser());

// we link our router files to make our route easy
app.use(require('./router/auth'));

const PORT= process.env.PORT;


// app.get('/aboutus',(req,res)=>{
//     res.send("Hello From About Us Page");
//  })

//  app.get('/contactus',(req,res)=>{
//     res.send("Hello From Contact Us");
//  })

//  app.post('/login',(req,res)=>{
//     const x=JSON.stringify(req.body);
//     console.log(x);
//     res.json(req.body);
//  })

app.get('/cookie',authenticate ,(req, res)=>{
   //it will clear the userData cookie
   console.log(req.cookies.jwtoken);
   res.send();
   // res.json(req.cookie);
   });
 app.get('/signup',(req,res)=>{
    res.send("Hello From Sign Up Page");
 })

app.listen(PORT,()=>{
console.log(`App Is running on ${PORT} Port`);
})
