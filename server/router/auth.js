const express = require('express');
const router = express.Router();
require ('../db/conn');
const User= require('../model/userScema');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


router.get('/',(req,res)=>{
    res.send("Hello From Home Page router.js");
    console.log("/HomePage")
 })
 
//  using promises
//  router.post('/register', (req,res)=>{
//   const  {name,email,phone,work,password,cpassword } =req.body;

//    if(!name || !email || !phone || !work || !password || !cpassword)
//      {
//       return  res.status(422).json({error:"Plz Fill All the fields"});
//      }

//      User.findOne({email:email})
//             .then((userExist)=>{
//             if(userExist){
//               return  res.status(422).json("Email Already exist");
//             }

//       const user = new User({name,email,phone,work,password,cpassword})
//         user.save().then(()=>{
//         res.status(201).json({msg:"User Added Succesfully!!"});
//       }).catch((err)=>{
//         res.status(500).json({error:"Failed to Register"})
//         console.log(err);
//      })
//     }).catch(err => {console.log(err);  
//       });
//     })
//Using Async Await

router.post('/register', async (req,res)=>{
  console.log("/register");
  // console.log(req.body);
  // res.json({message:req.body});
  const  {name,email,phone,work,password,cpassword } =req.body;

   if(!name || !email || !phone || !work || !password || !cpassword)
     {
      // console.log("inside if1");
      return  res.status(422).json({error:"Plz Fill All the fields"});
     }
try{
  // console.log("inside try");
  const userExist= await User.findOne({email:email});

    if(userExist)
  {
    // console.log("inside if2");
    return  res.status(402).json({error:"Email Already exist"});
  }
  else
      if(!(password === cpassword))
    {    
      
      return  res.status(401).json({error:"Password Mismatch!!"});
    }   
  else
  {
    const user = new User({name,email,phone,work,password,cpassword});

    //hashing of password and confirmpassword


const userRegister = await user.save();

// return  res.status(201).json({message:"User  SuccesFully Added "});
if(userRegister)
{
   return  res.status(201).json({message:"User  SuccesFully Added "});
}  
else
{
  return  res.status(500).json({error:"Failed To Register "});
} 
  }
      
}  
catch(err)
{
  console.log(err);
  res.json(err); 
}
}
);
    
//  router.get('/about',(req,res)=>{
//   res.cookie("jwt", 'navin') 
//   res.json("About Us Page");
// }
//  );

//  router.get('/contact',(req,res)=>{
//   res.cookie("jwt", 'navin') 
//   res.json("Contact Us Page");
// }
//  );

// Login Route

router.post('/login', async (req,res)=>{
    // const userReq= req.body;
    console.log("/login")
    try{

      const {email, password}= req.body;

      if(!email || !password)
      {
        res.status(400).json({error:" Plz Fill The data "})
      }

      const userdata =await User.findOne({email:email})
      if(!userdata)
      {
        res.status(401).json({error:"User Not Found"});
      }
      
      else{
        const ismatch = await bcrypt.compare(password , userdata.password);
        if(!ismatch){
          res.status(402).json({Error:"Wrong Password"});
        
        }
        else{
          const token = await userdata.generateAuthToken();
           // storing cookie
          //  console.log("abd")
          res.cookie("jwtoken", token, {
            expires:new Date(Date.now()+900000),
            // httpOnly:true
          } );
          // console.log("def")
          res.status(201).json({message:"User SignIn SuccesFully"});
        }
       
        
      }

    } catch(err)
    {
      console.log(`Error : ${err}`);
    }

})


// About Us Page
router.get('/aboutus',authenticate,(req,res)=>{
    console.log("/aboutus");
    res.send(req.rootUser);
 })

// Get User data For ContactPageand home
router.get('/getdata',authenticate,(req,res)=>{
    console.log("/getdata");
    res.send(req.rootUser);
 })
//  contactus Page
router.post('/contact',authenticate,async (req,res)=>{
  console.log("/contact");
  try{
     const {name,email,phone,message} =req.body;
     if( !message)
     { 
       return res.status(401).json({error:"Please Fill Contact form"});
      
     }
     const userContact =await User.findOne({_id:req.userID});


     if(userContact)
     {
       const userMessage= await userContact.addMessage(name,email,phone,message);
       await userContact.save();
       res.status(201).json({message:"user Contact SuccesFully"});
     }

  }
  catch(err)
  {
    console.log(err);
  }
  
})


// Add expences
router.post('/addexpense',authenticate,async (req,res)=>{
  console.log("/addexpense")
  try{
     const {ammount,type,date,message} =req.body;
     if(!ammount  || !type  || !date  )
     {
       return res.status(401).json({error:"Please Fill all fields form"});
       
     }
     const userfound =await User.findOne({_id:req.userID});


     if(userfound)
     {  
       const userexpense= await userfound.addExpense(ammount,type,date,message);

       await userfound.save();
       
      res.status(201).json({message:"user Expense Added"});
     
    }
  }
  catch(err)
  {
    res.status(401).json({message:"user Expense NOT Added"});
    console.log(err);
  }
  
})

// router.get('/cookie', (req, res)=>{
//   //it will clear the userData cookie
//   console.log(req.cookies.jwtoken);
//   res.send();
//   res.json(req.cookie);
//   });

// Logout api
router.get('/logout', (req, res)=>{
  //it will clear the userData cookie

  console.log("/logout")
  res.clearCookie('jwtoken',{path:"/"});
  res.status(200).send('user logout successfully');
  // console.log("Logou Successfully");
  });


// DetailView API
router.get('/detailview',authenticate,(req,res)=>{
  console.log("/getdata");
  res.send(req.rootUser.expenses);
  // console.log(req.rootUser.expenses)
  // res.status(200).send(req.rootUser);
})

 module.exports = router;