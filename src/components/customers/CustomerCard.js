import React from "react"
import { Link } from "react-router-dom"
import "./Customer.css"



//Called in CutomerList.js
export const CustomerCard = ({ customerInstance }) => {
    
    return(<section className="customer">
        <h4 className="customer__name">
          <Link to={`/customers/detail/${customerInstance.id}`}> 
            { customerInstance?.name }
          </Link>
        </h4>
        <p className="phone">{ customerInstance?.phone }</p>
    </section>
    )
}


