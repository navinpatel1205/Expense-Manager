import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import  icon from "../image/icon.ico";
import { UserContext } from "../App";

const Navbar=()=>
{
const {state,dispatch} =useContext(UserContext);


  const  RenderMenu = ()=>
  {
    
  if(state)
  {
    return(
      <>
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/" >Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/addexpense" >ADD EXPENSE</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/detailview" > View Expenses</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/aboutus">AboutUs</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contactus" >ContactUs</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/logout" >Logout</Link>
      </li>
      </ul>
      </>
    )
  }else
  {
    return(
      <>
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/" >Home</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/aboutus">AboutUs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contactus" >ContactUs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" >Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup" >Register</Link>
          </li>
      </ul>
      </>
    )
  }
  }
    return(
<>
<nav className="navbar navbar-expand-sm bg-dark ">

  <Link className="navbar-brand " to="/">
    <img src={icon}  alt="logo" style={{width:"50px", height:"50px" }}/>
  </Link>
 <h2 className="nav-title">Expense-Manager</h2>
        <RenderMenu/>   
</nav>

</>
    )
 
    }
export default Navbar;