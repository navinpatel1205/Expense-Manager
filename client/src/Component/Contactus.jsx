// import react from 'react';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import {useHistory} from "react-router-dom";
import background from "../image/backgroundImage.jpeg";

  
const Contactus=()=>
{
  const history = useHistory();
  const[userData, setUserData] =useState({name:"", email:"",phone:"", message:""});



const userContact= async ()=> 
         {
     
     try{
         const res = await fetch('/getdata',{
             method: "get",
             headers: {      
             "Content-Type" : "application/json"
             },
       
         });

         const data = await res.json();
              // console.log(data);
           setUserData({...userData, name:data.name,  email:data.email, phone:data.phone });
         if(!res.status === 200)
         {   
              // console.log("status check inside aboutus");
             const error = new Error(res.error);
             throw error;
         }
     }
     
      catch(err)
     {   console.log("inside catch"+err);
      
         history.push("/login");
     }
 }

 useEffect(() => {
     userContact();
},[]);

const handleInput=(e)=>
{
  const name=e.target.name;
  const value= e.target.value;

  setUserData({...userData, [name]:value });

}

// send data to backend

const contactForm = async (e) => 
{
  e.preventDefault();

  const {name,email,phone,message} = userData;
  const res= await fetch('/contact', {
    method: "POST",
    headers: {      
    "Content-Type" : "application/json"
    },
body : JSON.stringify({
  name, email, phone, message
})
    
  })
  const data=await res.json();
if(res.status === 401)
{
  alert("Please Enter Message First");
}
else
  if(!data)
  {
    alert("Message Not send");

  }else
   if(res.status==201)
  {
    alert("Message Send Succesfull");
    setUserData({...userData, message:" "});
  }

}

    return(
    < >
    <div style={{
        backgroundImage: 'url('+background+')',
        backgroundSize: "cover",
        height: "92.4vh",
      }}>
    <div className="contactall">
      < div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1  ">
              {/* phone number */}
              <div className="contact_info_item align-items-center d-flex">
              <PhoneRoundedIcon  color="primary" />
                  <div className="contact_info_contact  m-2">
                      <div className="contact_info_title">
                        Phone
                      </div>
                      <div className="contact_info_text">
                      {userData.phone}
                      </div>
                  </div>
                  
              </div>
          
               {/* Email number */}
               <div className="contact_info_item d-flex">
               <EmailRoundedIcon  color="primary" />
                  <div className="contact_info_email m-2 ">
                      <div className="contact_info_title d-flex">
                        Email
                      </div>
                      <div className="contact_info_text d-flex">
                     {userData.email}
                      </div>
                  </div>
                  
              </div>  
               {/* Address number */}
           <div className="contact_info_item d-flex justify-content-start align-items-center">
                   <HomeWorkRoundedIcon  color="primary" />
                  <div className="contact_info_address">
                      <div className="contact_info_title  m-2">
                        Address
                      </div>
                      <div className="contact_info_text">
                      {userData._id}
                      </div>
                  </div>
                  
              </div>  
            </div>
          </div>
        </div>

      </div>
      {/* contact Us Form
       */}
       <div className="contact_form">
         <div className="container ">
           <div className="row">
               <div className="col-lg-10-offset-1 ">
                 <div className="contact_form_container py-5">
                   <div className="contact_form_title">
                     <h1><strong>Get In Touch</strong></h1>
                   </div>
                   <form method="POST" id="contact_form">
                        <div className="contact_form_name  d-flex justify-content-between align-items-between">
                           <input type="text" id="contact_form_name" className=" form-control m-1  contact_form_name input_field" 
                           name="name" value={userData.name}
                    onChange={handleInput} placeholder="Name"
                          />
                          
                           <input type="email" id="contact_form_email" className=" form-control m-1  contact_form_email input_field"  
                           name="email" value={userData.email}
                    onChange={handleInput} placeholder="Email"
                          />
                           
                           <input type="number" id="contact_form_phone" className="form-control m-1  contact_form_phone input_field"
                           name="phone"  value={userData.phone}
                    onChange={handleInput} placeholder="Phone"
                          />
                        </div>
                        <div className="contact_form_text">
                          <textarea className="form-control m-1  text_field contact_form_message" 
                          name="message" value={userData.message} onChange={handleInput} 
                           placeholder="Message" cols="40" rows="5"/>
                          <div className="contact_form_button">
                          <button type="submit" onClick={contactForm} className="btn-lg mt-10 btn btn-primary button contact_submit_button mt-2">
                            Send Message
                          </button>
                        </div>
                        </div>
                        
                   </form>

                 </div>
               </div>
           </div>
         </div>
       </div>
       </div>
       </div>
    </>

    )
}
export default Contactus;