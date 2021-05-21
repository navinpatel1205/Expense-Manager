const jwt =require("jsonwebtoken");
const User = require("../model/userScema");

let cookieParser = require('cookie-parser');
// const app=app.use(cookieParser());
const Authenticate = async (req,res,next)=>{
    console.log("B");
    try{

        console.log("A");
   const accessToken = req.cookies.jwtoken
   if (!accessToken){
    return res.status(403).send();
}
   console.log("c");
   let verifyToken =jwt.verify( accessToken,process.env.SECRET_KEY);
   

   const rootUser =  await User.findOne({_id:verifyToken._id,  "tokens.token" :  accessToken});
// console.log(rootUser);

   if(!rootUser)
   {
       throw new Error("User Not Found");    
   }
   console.log("d");
   req.token = accessToken;
   req.rootUser = rootUser ;
   req.userID = rootUser._id;
   console.log("S");
   
   next();

    }
    catch(err){
        console.log("E"+err);
        console.log("inside athentication page");  
        res.status(401).send("UnAuthorized: No token provided");
        console.log(err);  
    }

}
module.exports = Authenticate;