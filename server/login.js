const express = require('express');
const app=express();

function getlogin(req,res){
    const id=req.query.id;
    res.send("Hello From Login Page ${id}");

}

app.get("/login",getlogin)
app.listen(3001,()=>{
    console.log("App Is Running On Port 3001")
});