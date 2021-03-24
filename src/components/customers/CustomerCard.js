import React from "react"
import { Link } from "react-router-dom"
import "./Customer.css"




export const CustomerCard = ({ customerInstance }) => {
    
    return(<section className="customer">
        <h3 className="customer__name">
          <Link to={`/customers/detail/${customerInstance.id}`}> 
            { customerInstance?.name }
          </Link>
        </h3>
        <p>{ customerInstance?.phone }</p>
    </section>
    )
}


