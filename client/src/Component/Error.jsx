import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () =>
{
    return  (
           <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                   <h1> 404</h1>
                   <p>We Are Sorry, Page not Found</p>
                   <NavLink to="/">Back To Home..</NavLink>
                </div>
            </div>
        </div>

        
    )
}
export default Errorpage