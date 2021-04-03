import React, { useState, useContext, useEffect } from "react"
import { CustomerContext } from "../customers/CustomerProvider"
import { CustomerAside } from "./CustomerAside"
import { useHistory } from "react-router-dom"
import { CustomerSearch } from "../customers/CustomerSearch"



export const CustomerAsideList = () => {
    
    const { getCustomers, customers, searchTerms } = useContext(CustomerContext)
    // Since you are no longer ALWAYS displaying all of the customers
    const [ filteredCustomers, setFiltered ] = useState([])
    const userCustomers = customers.filter(cust => parseInt(cust.userId) === parseInt(sessionStorage.getItem("app_user_id")))
    const sortedCustomers  = userCustomers.sort((a, b) => a.name.localeCompare(b.name))
    // users.sort((a, b) => a.firstname.localeCompare(b.firstname))

    console.log("SORTED!", sortedCustomers)
    // Initialization effect hook -> Go get customer data 
     useEffect(() => {
       getCustomers()
     }, [])
    
    const history = useHistory()

  
    useEffect(() => {
        if (searchTerms !== undefined) {
         
          // If the search field is not blank, display matching customers
          const subset = sortedCustomers.filter(customer => customer.name.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all customers
          setFiltered(userCustomers)
        }
      }, [searchTerms, customers])


      return (
        <>
            <h2>Customers</h2>
            <div className="customerNav">
            <CustomerSearch />
            <button onClick={() => history.push("/newcustomer")}>
                +
            </button>
            </div>
            <div className="customers">
                {
                  
                  filteredCustomers.map(customerObject => {
                    
                      return <CustomerAside key={customerObject.id} 
                      customerInstance={customerObject}
                      />
                    })
                }
            </div> 
        </>
    )
}


