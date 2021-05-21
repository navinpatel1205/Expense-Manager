const mongoose= require("mongoose");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const userScema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    password:{
            type: String,
            required:true
        },
  cpassword:{
            type: String,
            required:true
        },
     date:{
            type:Date,
            default:Date.now
        },
        messages:[
            {
                name:{
                    type: String,
                    required:true
                },
                email:{
                    type: String,
                    required:true
                },
                phone:{
                    type: Number,
                    required:true
                },
                email:{
                    type: String,
                    required:true
                },
                message:{
                    type: String,
                    required:true
                }
            }
        ],
        expenses:[{
           expense: {
                ammount:{
                    type: Number,
                    required:true
                },
                type:{
                    type: String,
                    required:true
                },
                date:{
                    type: String,
                    required:true
                },
                
                message:{
                    type: String,
                    required:true
                }
            }
        }
        ],
     tokens : [{
         token :{
             type : String,
             required :true
         }
     }]
})

// Hashing the password
userScema.pre('save', async function(next){
   
  if(this.isModified('password'))
  {
    // console.log("Hello from bcrypt");
      this.password =await  bcrypt.hash(this.password, 12);
      this.cpassword =await bcrypt.hash(this.cpassword, 12);
  }
  next();
});


//Generating the Jwt Token

userScema.methods.generateAuthToken = async function ()
{
    try{
            let token =jwt.sign({_id:this._id}, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token : token});
            await this.save();
            console.log(token);
            return token;
    } catch(err)
    {
        console.log(err);
    }
}

// storeing message
userScema.methods.addMessage =async function(name,email,phone,message){
    try{
  this.messages =this.messages.concat({name,email,phone,message});
  await this.save();
  return this.messages;
    }catch(error)
    {
        console.log(error);
    }
}

//add expences
userScema.methods.addExpense = async function (ammount,type,date,message)
{
    try{
        let expense ={ammount,type,date,message};
        this.expenses = this.expenses.concat({expense});
        await this.save();
        console.log(expense);
    } catch(err)
    {
        console.log(err);
    }
}
const User = mongoose.model('USER',userScema);

module.exports = User;

