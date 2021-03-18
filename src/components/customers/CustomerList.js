import React, { useState, useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
// import { CustomerCard } from "./CustomerCard"
// import "./Customer.css"
// import "../rigs/Rig.css"

import { useHistory } from "react-router-dom"
// import { CustomerSearch } from "./CustomerSearch"



export const CustomerList = () => {
    const { getCustomers, customers, searchTerms } = useContext(CustomerContext)
    // Since you are no longer ALWAYS displaying all of the customers
    const [ filteredCustomers, setFiltered ] = useState([])

    const history = useHistory()

   // Initialization effect hook -> Go get customer data 
    useEffect(()=>{
      getCustomers()
      
      
    }, [])
  
    useEffect(() => {
        if (searchTerms !== undefined) {
         
          // If the search field is not blank, display matching customers
          const subset = customers.filter(customer => customer.name.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all customers
          setFiltered(customers)
        }
      }, [searchTerms, customers])


      return (
        <>
            <h2>Customers</h2>
            <button onClick={() => history.push("/newcustomer")}>
                New Customer
            </button>
            {/* <CustomerSearch /> */}
            {/* <div className="customers">
                {
                  
                  filteredCustomers.map(customerObject => {
                    const customerRig = rigs.filter(rig => parseInt(rig.customerId) === parseInt(customerObject.id))
                        return <CustomerCard key={customerObject.id} 
                        customerInstance={customerObject}
                        customerRig = {customerRig}
                        />
                    })
                }
            </div> */}
        </>
    )
}


