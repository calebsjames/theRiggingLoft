import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const CustomerContext = createContext()

// This component establishes what data can be used.
export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
   //Possibly remove.
    const [customerId, setCustomerId] = useState(0)

    //function to get all customers
    const getCustomers = () => {
        return fetch("https://theriggingloft-api.herokuapp.com/customers")
        .then(res => res.json())
        .then(setCustomers)
    }

    //function to add customer and return the object of the new customer with ID
    const addCustomer = customerObj => {
        return fetch("https://theriggingloft-api.herokuapp.com/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        //get the new object back
        .then(res => res.json())
        //set useState variable to new object
        .then(customerObject => {
            setCustomerId(customerObject.id)
            //put the item id in session storage
        })
        .then(getCustomers)
    }

    //function to get customer by ID
    const getCustomerById = (id) => {
        return fetch(`https://theriggingloft-api.herokuapp.com/customers/${id}`)
            .then(res => res.json())
    }

    //function to delete an customer
    const deleteCustomer = customerId => {
        return fetch(`https://theriggingloft-api.herokuapp.com/customers/${customerId}`, {
            method: "DELETE"
        })
        .then(getCustomers)
    }
    
    //function to edit an customer
    const editCustomer = (customer) => {
        return fetch(`https://theriggingloft-api.herokuapp.com/customers/${customer.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        })
          .then(getCustomers)
      }

    
    
    //return all of the functions available through InspectionContext
    return (
        <CustomerContext.Provider value={{
            customers, getCustomers, addCustomer, getCustomerById, deleteCustomer, editCustomer, searchTerms, setSearchTerms, customerId
        }}>
            {props.children}
        </CustomerContext.Provider>
    )

    }