import React from "react"
import { Link } from "react-router-dom"



//Called in CutomerList.js
export const ServiceBulletinsAside = ({ serviceBulletinInstance }) => {
    
    return(<section className="serviceBulletin">
        <p className="serviceBulletin__name">
            <h4>{serviceBulletinInstance?.date}</h4>
          * <a href={serviceBulletinInstance?.file} target="_blank"> 
            { serviceBulletinInstance?.title }
            </a>
          
        </p>
        
    </section>
    )
}

