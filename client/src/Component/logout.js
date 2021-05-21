import React, { useEffect,useContext } from "react";
import {useHistory} from "react-router-dom"
import { UserContext } from "../App";

const Logout = () =>
{
    
    const {state,dispatch} =useContext(UserContext);

 const history =useHistory()
    useEffect(()=>
    {
        fetch('/logout',{
            method: "get",
            headers: {      
            "Content-Type" : "application/json",
            Accept: "application/json"
            },
            credentials: "include"
        }).then((res)=>
        {    dispatch({type:"USER",payload:false})
        if(res.status===200 )
    {
      window.alert("SuccesFully Logout");
      history.push('/login');
    }
               
        }).catch((err)=>{
            console.log(err);
        })
    })
    return(
        <>
        <h1></h1>
        </>

    )
}
export default Logout;