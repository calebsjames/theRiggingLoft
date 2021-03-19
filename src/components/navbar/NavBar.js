import React from "react"
import { Link } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"
import "./NavBar.css"

const Logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
        sessionStorage.setItem(userStorageKey, "")
    }
}



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
                <Link className="navbar__link"  onClick={Logout} to="/">Log Out</Link>
            </li>

        </ul>
    )
}