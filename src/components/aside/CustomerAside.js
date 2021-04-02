import React from "react"
import { Link } from "react-router-dom"



//Called in CutomerList.js
export const CustomerAside = ({ customerInstance }) => {
    
    return(<section className="customer">
        <h3 className="customer__name">
          <Link to={`/customers/detail/${customerInstance?.id}`}> 
            { customerInstance?.name }
          </Link>
        </h3>
        
    </section>
    )
}