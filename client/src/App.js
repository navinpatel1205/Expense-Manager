
import Home from './Component/Home'
import About from "./Component/About"
import Contactus from "./Component/Contactus"
import Login from "./Component/Login"
import Signup from "./Component/Signup"
import Navbar from "./Component/Navbar.jsx"
import AddExpense from "./Component/expenseAdd"
import {Route,Switch} from "react-router-dom";
import  "./App.css";
import Errorpage from './Component/Error'
import DetailView from "./Component/detailView";
import Logout from "./Component/logout"
import React, { createContext, useReducer } from 'react'
import {initialState, reducer  } from "../src/reducer/UseReducer";


// /  context API
 export const UserContext = createContext();

const Routing = ()=>
 {
   return(
    <Switch> 
          <Route  exact path="/">
                   <Home/>
          </Route>
          <Route  exact path="/addexpense">
                   <AddExpense/>
          </Route>
          <Route  exact path="/detailview">
                   <DetailView/>
          </Route>
         <Route  path="/aboutus">
                   <About/>
        </Route>
        <Route path="/contactus">
                 <Contactus/>
        </Route>
        <Route path="/login">
                  <Login/>
        </Route>
        <Route path="/signup"> 
                  <Signup/>
        </Route>
        <Route path="/logout"> 
                   <Logout/>
        </Route>
        <Route path="/" > 
                <Errorpage/>
        </Route>
</Switch>

   )
 }

const App=()=>
{
  const [state,dispatch] =useReducer(reducer, initialState)
 
  return(
    <>
<UserContext.Provider value={{state,dispatch}}>
      <div>
        <Navbar/>
        <Routing/>
      </div>
 </UserContext.Provider>
     
      </>
   
  )
  
}
export default  App;