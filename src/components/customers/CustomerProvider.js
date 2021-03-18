import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const CustomerContext = createContext()

// This component establishes what data can be used.
export const CustomerProvider = (props) => {
    const [Customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/Customers")
        .then(res => res.json())
        .then(setCustomers)
    }

    const addCustomer = CustomerObj => {
        return fetch("http://localhost:8088/Customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(CustomerObj)
        })
        .then(getCustomers)
    }

    //function to get Customer by ID
    const getCustomerById = (id) => {
        return fetch(`http://localhost:8088/Customers/${id}`)
            .then(res => res.json())
    }

    //function to delete an Customer
    const deleteCustomer = CustomerId => {
        return fetch(`http://localhost:8088/Customers/${CustomerId}`, {
            method: "DELETE"
        })
            .then(getCustomers)
    }

    const editCustomer = Customer => {
        return fetch(`http://localhost:8088/Customers/${Customer.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Customer)
        })
          .then(getCustomers)
      }

   

      const [ searchTerms, setSearchTerms ] = useState("")

    return (
        <CustomerContext.Provider value={{
            Customers, getCustomers, addCustomer, getCustomerById, deleteCustomer, editCustomer, searchTerms, setSearchTerms
        }}>
            {props.children}
        </CustomerContext.Provider>
    )

}