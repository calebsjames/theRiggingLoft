import React, { useState, useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./CustomerCard"
import "./Customer.css"
import "../rigs/Rig.css"

import { useHistory } from "react-router-dom"
import { CustomerSearch } from "./CustomerSearch"
import { RigContext } from "../rigs/RigProvider"



export const CustomerList = () => {
    const { getCustomers, customers, searchTerms } = useContext(CustomerContext)
    // Since you are no longer ALWAYS displaying all of the customers
    const [ filteredCustomers, setFiltered ] = useState([])
    const { getRigs, rigs } = useContext(RigContext)
    const history = useHistory()
    const x = rigs.filter(r => r.id === 1)
    console.log(x)
  
    // Initialization effect hook -> Go get customer data
    let allrigs = {}
    useEffect(()=>{
      getRigs()
      .then(getCustomers)
      
      .then(res => allrigs = res)
      .then(console.log(allrigs))
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

      console.log("rigs", rigs)


      return (
        <>
            <h2>Customers</h2>
            <button onClick={() => history.push("/newcustomer")}>
                New Customer
            </button>
            {/* <CustomerSearch /> */}
            <div className="customers">
                {
                  
                  filteredCustomers.map(customerObject => {
                    const customerRig = rigs.filter(rig => parseInt(rig.customerId) === parseInt(customerObject.id))
                        return <CustomerCard key={customerObject.id} 
                        customerInstance={customerObject}
                        customerRig = {customerRig}
                        />
                    })
                }
            </div>
        </>
    )
}


