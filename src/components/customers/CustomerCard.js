import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { CustomerContext } from "./CustomerProvider"




export const CustomerCard = ({ customerInstance }) => {
    
    const history = useHistory()

    const { getCustomers, deleteCustomer } = useContext(CustomerContext)

    const handleDelete = () => {
        deleteCustomer(customerInstance.id)
          .then(getCustomers)
          .then(() => {
            history.push("/customers")
          })
      }
    
    return(<section className="customer">
        <h3 className="customer__name">
          <Link to={`/customers/detail/${customerInstance.id}`}> 
            { customerInstance.name }
          </Link>
        </h3>
        <p>{ customerInstance.phone }</p>
        <button onClick={(handleDelete)}>
                Delete
            </button>
        
      
    </section>
    )
}


