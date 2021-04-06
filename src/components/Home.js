import React from "react";
import { CustomerAsideList } from "./aside/CustomerAsideList";
import { Header } from "./Header";
import "./aside/home.css"
import { InspectionList } from "./Inspections/InspectionList";
import { ServiceBulletinAsideList } from "./seviceBulletins/sbList";



export const Home = () => (
    <>
        <div id="homeMain">
            <article id="leftAside">
                <CustomerAsideList />  
            </article>
            <article id="centerAside">
                <InspectionList />
            </article>
            <article id="rightAside">
                <ServiceBulletinAsideList />
            </article>
        </div>
    </>
)