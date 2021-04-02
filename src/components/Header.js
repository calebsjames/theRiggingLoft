import React from "react";
import { Link } from "react-router-dom"



export const Header = () => {
    return(
    <>
    <header>
        <h1 id="pageHeader">
            <Link to="/home"> 
            The Rigging Loft
          </Link></h1>
        <div id="slogan">An electornic logbook</div>
    </header>
    </>
    )
}