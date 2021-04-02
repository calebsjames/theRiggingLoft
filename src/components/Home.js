import React from "react";
import { CustomerAsideList } from "./aside/CustomerAsideList";
import { Header } from "./Header";
import "./aside/home.css"
import { InspectionList } from "./Inspections/InspectionList";



export const Home = () => (
    <>
        <div id="homeMain">
            <article id="leftAside">
                <CustomerAsideList />  
            </article>
            <article id="rightAside">
                <InspectionList />
            </article>
        </div>
    </>
)