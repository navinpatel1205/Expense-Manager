import React, { useEffect, useState,Component } from 'react';
import {  Table } from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import background from "../image/backgroundImage.jpeg";
import Piggy from "../image/piggybank.jpg";
import { UserContext } from "../App";
const DetailView = () =>
{      
     const history = useHistory();
     const[userData, setUserData] =useState([]);

     const  DetailView= async()=> 
     {
 // e.preventDefault();
 try{
     const res = await fetch("/detailview",{
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
          console.log("status check inside detailView");
         const error = new Error(res.error);
         throw error;
     }
 }
 
  catch(err)
 {   console.log("inside catch"+err);
 }
}

  function sumAmmount()
  { var sum=0;
    console.log(userData);
    for(var i=0;i<userData.length;i++)
    {
      sum+=userData[i].expense.ammount;
    }
    return sum;
  }

    useEffect(() => {
       DetailView()
   },[]);
   return(
    <>
     <div style={{
            backgroundImage: 'url('+Piggy+')',
            backgroundSize: "cover",
            height: "100vh",
          }}>
            <div className="detail-div">
              <h1 style={{fontFamily: "Girassol, cursive"}}><strong><i>OUTLAY</i></strong></h1>
              </div>
              <h5>Total Expenses : {userData.length}</h5>
              <h5>Total Ammount : {sumAmmount()}</h5>
             
            <div >
	 <Table singleLine className="view-detail">
        <Table.Header>
          <Table.Row>
		  <Table.HeaderCell><strong><em>ID</em></strong></Table.HeaderCell>
            <Table.HeaderCell><strong><em>Expenses</em></strong></Table.HeaderCell>
            <Table.HeaderCell><strong><em>Type</em></strong></Table.HeaderCell>
            <Table.HeaderCell><strong><em>Date:</em></strong></Table.HeaderCell>
            <Table.HeaderCell><strong><em>Description</em></strong></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userData.map(el => {
            return (
              <Table.Row key={el._id}>
                <Table.Cell>{el._id}</Table.Cell>
                <Table.Cell>
                  {el.expense.ammount}
                </Table.Cell>
                <Table.Cell>{el.expense.type}</Table.Cell>
                <Table.Cell>{el.expense.date}</Table.Cell>
				<Table.Cell>{el.expense.message}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      

      </Table>
      </div>
    </div>
    </>
    )
}
export default DetailView;
