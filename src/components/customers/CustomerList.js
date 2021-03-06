import React, { useState, useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./CustomerCard"
import { useHistory } from "react-router-dom"
import { CustomerSearch } from "./CustomerSearch"
import "./Customer.css"



export const CustomerList = () => {
    const { getCustomers, customers, searchTerms } = useContext(CustomerContext)
    // Since you are no longer ALWAYS displaying all of the customers
    const [ filteredCustomers, setFiltered ] = useState([])
  debugger
    const userCustomers = customers.filter(cust => parseInt(cust.userId) === parseInt(sessionStorage.getItem("app_user_id")))
    const sortedCustomers  = userCustomers.sort()
    console.log("sorted", sortedCustomers)
    
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
        setFiltered(sortedCustomers)
      }
    }, [searchTerms, customers])
    
  
    return (
        <>
            <h2>Customers</h2>
            <div className="customerNav">
            <button className="btn" onClick={() => history.push("/newcustomer")}>
                New Customer
            </button>
            <CustomerSearch />
            </div>
            <div className="customers">
                {
                  
                  filteredCustomers.map(customerObject => {
                    
                      return <CustomerCard key={customerObject.id} 
                      customerInstance={customerObject}
                      />
                    })
                }
            </div> 
        </>
    )
}


