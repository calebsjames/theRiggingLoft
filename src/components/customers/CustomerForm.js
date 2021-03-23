import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CustomerContext } from "./CustomerProvider";


export const CustomerForm = () => {
    const { addCustomer, getCustomerById, editCustomer, getCustomers, deleteCustomer } = useContext(CustomerContext)    
    const { customerId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    //Define the intial state of the form inputs with useState()
    const [customer, setCustomer] = useState({
      name: "",
      phone: "",
      customerNotes: "",
      userId: sessionStorage.getItem("app_user_id")
      
    });
    
    const history = useHistory();

    //when some changes, save it
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newCustomer = { ...customer }
        let selectedVal = event.target.value




        /* Customer is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newCustomer[event.target.id] = selectedVal
        // update state
        setCustomer(newCustomer)   
    }


    const handleDelete = () => {
        deleteCustomer(customerId)
          .then(getCustomers)
          .then(() => {
            history.push("/customers")
          })
      }

    const handleClickSaveCustomer = (event) => {
        
       //Prevents the browser from submitting the form
         
        if (customerId) {
            editCustomer(customer)
            .then(history.push(`/customers/detail/${customerId}`))
        } else {
        //invoke addCustomer passing customer as an argument.
        addCustomer(customer)
        //change the url and display the customer list
        .then(() => history.push("/newcontainer"))
        }
    }

         // Get Customers. If CustomerId is in the URL, getCustomerById
    useEffect(() => {
        getCustomers().then(() => {

            // if there is data
        if (customerId) {
            getCustomerById(customerId)
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
            





            <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveCustomer()
          }}>


        {customerId ? "Save" : "Add"}</button>
            




            <button className="deleteButton" onClick={(handleDelete)}>
                Delete
            </button>
        
        </form>
        </article>
        </section>
        </>
    )
    }
