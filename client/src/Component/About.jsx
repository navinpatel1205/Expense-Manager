import React, { useEffect, useState } from 'react';
import profilepic from "../image/profilepic.jpg";
import empty from  "../image/empty.jpg";
import {useHistory} from "react-router-dom";
import background from "../image/backgroundImage.jpeg";
const About=()=>
{     
     const history = useHistory();
     const[userData, setUserData] =useState({});

     const AboutPage= async()=> 
     {
 // e.preventDefault();
 try{
     const res = await fetch("/aboutus",{
         method: "get",
         headers: {
             Accept : "application/json", 
         "Content-Type" : "application/json"
          
         },
     credentials: "include"
     });

     const data = await res.json();
        //   console.log(data);
       setUserData(data);
     if(!res.status === 200)
     {   
          console.log("status check inside aboutus");
         const error = new Error(res.error);
         throw error;
     }
 }
 
  catch(err)
 {   console.log("inside catch"+err);
     // console.log(err);
     history.push("/login");
 }
}

  function rankCount()
  {
       var rank = Math.floor(Math.random()*10);
       return rank;
  }

    useEffect(() => {
       AboutPage()
   },[]);
    return(
    <>
    <div style={{
        backgroundImage: 'url('+background+')',
        backgroundSize: "cover",
        height: "92.4vh",
      }}>
       <div className="container about-div">
           <form method="GET">
              
                   <div >
                          
                       <img src={userData.name==="Navin Patel" ? profilepic : empty } id="profile-pic" className="img-circle" width="304" height="236"  alt="profile-pic"/>
                   </div>
                   
                          <div className="profile-head">
                          <h5>USERNAME :   <strong><i>  {userData.name}</i></strong></h5>
                          <h5>EMAIL :   <strong><i>{userData.email}</i></strong></h5>
                          <h5>PHONE :  <strong><i>{userData.phone}</i></strong></h5>
                          <h5>PROFESSION :  <strong><i>{userData.work}</i></strong></h5>
                          
                          <h5>Profile Ranking :  <strong><i>{rankCount()}/10</i></strong></h5>
                          <button type="button" onClick={rankCount()} className=" btn-abt btn btn-primary">
                            Edit Profile
                          </button>

                                 </div>

               </form>
           </div>
           </div>
           </>

    )
}
export default About;