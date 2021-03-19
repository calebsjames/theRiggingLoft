import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"





export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/inspections">Inspections</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link"  to="/">Log Out</Link>
            </li>

        </ul>
    )
}