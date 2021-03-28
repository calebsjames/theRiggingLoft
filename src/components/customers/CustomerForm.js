import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CustomerContext } from "./CustomerProvider";

//function for taking in and editing customers
export const CustomerForm = () => {
    const { addCustomer, getCustomerById, editCustomer, getCustomers, deleteCustomer } = useContext(CustomerContext)    
    const { customerId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory();
    
    //Define the intial state of the customer form with useState()
    const [customer, setCustomer] = useState({
      name: "",
      phone: "",
      customerNotes: "",
      userId: parseInt(sessionStorage.getItem("app_user_id"))
      
    });
    

    //when some changes, save it
    const handleControlledInputChange = (event) => {
        //make a new copy of newCustomer
        const newCustomer = { ...customer }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newCustomer[event.target.id] = selectedVal
       
        // update state
        setCustomer(newCustomer)   
    }

    //handle delete customer
    const handleDelete = () => {
        deleteCustomer(customerId)
          .then(getCustomers)
          .then(() => {
            history.push("/customers")
          })
      }

    //handle save customer
    const handleClickSaveCustomer = (event) => {
        //if customerId is Param, edit the customer
        if (customerId) {
            editCustomer(customer)
            .then(history.push(`/customers/detail/${customerId}`))
        } else {
        //save the customer
        addCustomer(customer)
        //change the url and display the customer list
        .then(() => history.push("/customers"))
        }
    }

    // Get Customers
    useEffect(() => {
        getCustomers().then(() => {

        //If CustomerId is in the URL, getCustomerById
        if (customerId) {
            getCustomerById(customerId)
            //then setAAD to that found AAD
            .then(Customer => {
                setCustomer(Customer)
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])

    //return this HTML
    return (
        <>
        <section className="main">
        <article className="containerRight">
        <form className="customerForm">
            <h2 className="customerForm__title">{customerId ? "Edit Customer" : "New Customer"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer name" value={customer.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone">Phone #:</label>
                    <input type="text" id="phone" onChange={handleControlledInputChange} required className="form-control" placeholder="Phone #" value={customer.phone}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customerNotes">Notes:</label>
                    <input type="text" id="customerNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={customer.customerNotes}/>
                </div>
            </fieldset>
            




            //save
            <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
            // Prevent browser from submitting the form and refreshing the page
            event.preventDefault() 
            handleClickSaveCustomer()
          }}>

        
            {/* "Save" or "Add" button depending on edit or input   */}
            {customerId ? "Save" : "Add"}</button>
            



            {/* button to delete customer if in customer edit*/}
            {customerId ? <button className="deleteButton" onClick={(handleDelete)}>
                Delete
            </button> : "" }
        
        </form>
        </article>
        </section>
        </>
    )
    }
