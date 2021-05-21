// import react from 'react';
import  loginpic from "../image/loginpic.png"
import {Link, useHistory} from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";

  const Login=()=>{

    const {state,dispatch} =useContext(UserContext);

    const history =useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");


    const userData =  async(e) =>
    {
      e.preventDefault();

    const response= await  fetch("/login",{
   method:"post",
   headers:{
   "Content-Type" : "application/json"
   },
   body: JSON.stringify({
     email,password
   })
    });

    const data =response.json();

    if(response.status===400 )
    {
      window.alert("Please Fill required field Carefully");
    }
    else
      if(response.status===401 || !data)
    {
      window.alert("User Not Found");
    }
    else
      if(response.status===402 || !data)
    {
      window.alert("Incorrect Password!!");
    }
    else
    { 
       dispatch({type:"USER",payload:true})
      window.alert("Login Succesfull!!   👍 ");
      history.push("/")   ;
     }
    }
   
      return(
      <>
      <section className="login " >
      <div className="container mt-2">
        <div className="login-content" >
        <div className="login-image ">
                <figure>
                   <img src={loginpic} alt="profilepic"></img>
                </figure>
                <Link to="/signup" className="login-image-link"> Don't Have An Account? Register here! </Link>
              </div>
            <div className="login-form " >
              <h2 className="form-title-login">LOG IN</h2>
              <form method="POST" className="loginin-form" id="login-form " >
                <div className="form-group input-group mb-3">
                  <label htmlFor="name">
                  <span className="material-icons">account_circle</span>
                  </label>
                  <input type="email"  required className="form-control" 
                      value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" aria-label="email"/>
                </div>
               
                <div className="form-group input-group mb-3">
                  <label htmlFor="Password">
                   <span className="material-icons">lock</span>
                  </label>
                  <input type="password"  required  className="form-control" name="Password" id="Password" autoComplete="off"
                  
                      value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your Password" ></input>
                </div>
                
                <div className="form-group-form-button " >
                  <input type="submit" name="login" id="login" onClick={userData}
                   className=" btn-signin btn btn-primary "
                    value="Log In"/>

                </div>
              </form>
              </div>
            </div>
      </div>
    </section>
      </>     

      )
  }
export default Login;