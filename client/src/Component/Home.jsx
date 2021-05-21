
import React from 'react';
import { useState,useEffect ,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  "../App.css";
import background from "../image/backgroundImage.jpeg";
import {Link,useHistory} from "react-router-dom";
import AddExpense from "./expenseAdd"
import { UserContext } from "../App";


const Home=()=>

{
    const {state,dispatch} =useContext(UserContext);
    
    const history = useHistory();
     const [userName,setuserName] = useState("");
     const [show,setShow] =useState(false);
    const userHomePage= async ()=> 
         {
     
     try{
         const res = await fetch('/getdata',{
             method: "get",
             headers: {      
             "Content-Type" : "application/json"
             },
       
         });

         const data = await res.json();
            //   console.log(data);
           setuserName(data.name);
           setShow(true);
     }
     
      catch(err)
     {  
          console.log("inside catch/HOME PAGE"+err);
      
     }
 }

 useEffect(() => 
  {
     userHomePage();
},[]);

function gotoExpense()
{
   history.push("/addexpense");
}
function gotologin()
{
   history.push("/login");
}

const  XenderMenu = ()=>
  {
    if(state)
    {return (
            <>
    <div style={{
        backgroundImage: 'url('+background+')',
        backgroundSize: "cover",
        height: "92.4vh",
      }}>

             <div className="">
                 <div className=" home-div">
                     <h4 className="pt-15 ">WELCOME</h4>
                     <div >
                     <h1 className=""  ><i>{userName}</i></h1>
                     <h4 className="">Happy To See You Back 🙂 </h4>
                     </div>
                  
                                 
                      
                     <button type="button" id="btn" onClick={gotoExpense}
                     className="btnHome btn btn-lg mt-10 btn-outline-primary">ADD Expense HERE</button>

                 </div>
             </div>
          
   </div>
  </>    
  )}
else
  {
    return(
        <>
        <div style={{
            backgroundImage: 'url('+background+')',
            backgroundSize: "cover",
            height: "92.4vh",
          }}>
    
                 <div className="home-page">
                     <div className=" home-div">
                     <h4 className="pt-15 row">WELCOME </h4>
            
                         <h4 className="row">You Need To Login First!!</h4>
                          
                         <button type="button" id="btn" onClick={gotologin}
                         className="btnHome btn btn-lg mt-10 btn-outline-primary">Please Login First</button>
    
                     </div>
                 </div>
              
       </div>
      </>

    )

  }
}

    return(

<XenderMenu/> 
    
    )
}
export default Home;