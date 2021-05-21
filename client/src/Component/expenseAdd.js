import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";
import background from "../image/backgroundImage.jpeg";

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
import  "../App.css";



const AddExpense = () => 
     {
        const history = useHistory();
        const[userExpense, setUserExpense] =useState({ammount:"", type:"",date:"", message:""});
      
      
      
      const getdata= async ()=> 
               {
           
           try{
               const res = await fetch('/getdata',{
                   method: "get",
                   headers: {      
                   "Content-Type" : "application/json"
                   },
             
               });
      
               const data = await res.json();
               
                    console.log(data);
                    // setUserExpense({...userExpense, ammount:data.ammount,  :data.email, phone:data.phone });
               if(!res.status === 200)
               {   
                    console.log("status check inside add expense");
                   const error = new Error(res.error);
                   throw error;
               }
           }
           
            catch(err)
           {   console.log("inside catch"+err);
            
            //    history.push("/login");
           }
       }
      
       useEffect(() => {
           getdata();
      },[]);
      
      const handleInput=(e)=>
      {
        const name=e.target.name;
        const value= e.target.value;
      
        setUserExpense({...userExpense, [name]:value });
      
      }
      
      // send data to backend
      
      const addExpense = async (e) => 
      {
        e.preventDefault();
      
        const {ammount,type,date,message} = userExpense;
        const res= await fetch('/addexpense', {
          method: "post",
          headers: {      
          "Content-Type" : "application/json"
          },
      body : JSON.stringify({
        ammount, type, date, message
      })
          
        })
        const data=await res.json();
        if(res.status==401)
        {
         window.alert("Please Fill All The Required Fields!!");
         window.alert("Expense Not Added");
        
        }else
           if(res.status==201)
        {
         window.alert("Expense Succesfully added!!  👍 ");
         setUserExpense({...userExpense, ammount:" ",type:"",date:"", message:"Null"});
         history.push("detailview")
      
        }
        
      
      }
    
       
        return (
            <>
          <div style={{
        backgroundImage: 'url('+background+')',
        backgroundSize: "cover",
        height: "92.4vh",
      }}>
          <div className="add-div">
          <form method="POST" id="add-form">
                        <div className=" ">
                           <input type="number" id="contact_form_name" className="form-control add-ammount m-2" 
                           name="ammount" value={userExpense.ammount}
                    onChange={handleInput} placeholder="Enter Ammount"
                
                          />
                         
                          <select value={userExpense.type} className="form-control m-2"
                          onChange={handleInput} name="type" placeholder="type Of Expense">
                            <option value="Food">Food</option>
                            <option value="Travell">Travell</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Party">Party</option>
                            <option value="Recharge">Recharge</option>
                            <option value="Other">Other</option>
                          </select>
             {/* <DropdownButton
                            alignRight
                            title="Type Of Expense"
                            id="dropdown-menu-align-right"
                            name="type"
                            placeholder=""
                            value={userExpense.type}
                            onSelect={handleInput}
               >
              <Dropdown.Item value="Food">Food</Dropdown.Item>
              <Dropdown.Item value="Travell">Travell</Dropdown.Item>
              <Dropdown.Item value="Party">Party</Dropdown.Item>
              <Dropdown.Item value="Stationary">Stationary</Dropdown.Item>
              <Dropdown.Item value="Grocery">Grocery</Dropdown.Item>
              <Dropdown.Item value="Other">Other</Dropdown.Item>
              <Dropdown.Divider />
              
      </DropdownButton> */}
                           <input type="date" id="add-date" className="form-control m-2   "
                           name="date"  value={userExpense.date}
                    onChange={handleInput} placeholder="Enter Date"
                    
                          />
                           
                        </div>
                        
                        <div className="contact_form_text">
                          <textarea className="form-control m-2" 
                          name="message" value={userExpense.message} onChange={handleInput} 
                           placeholder="Description" cols="40" rows="1"/>

                          <div className="add-button">
                          <button type="submit" onClick={addExpense} className="add-btn btn-lg  btn btn-primary">
                            Click To Add 
                          </button>
                        </div>
                        </div>
                        
                   </form>
          </div>
          </div>
              </>
        );
      };

 
export default AddExpense;