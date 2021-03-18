import React, { useContext, useState } from "react"
import { useHistory } from 'react-router-dom';
import { CustomerContext } from "./CustomerProvider";

export const CustomerForm = () => {
    const { addCustomer } = useContext(CustomerContext)
   

    //Define the intial state of the form inputs with useState()
    const [customer, setCustomer] = useState({
      name: "",
      phone: "",
      customerNotes: "",
      userId: sessionStorage.getItem("app_user_id")
      
    });
    console.log(sessionStorage.getItem("app_user_id"))
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


    const handleClickSaveCustomer = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       
       
       
        //invoke addCustomer passing customer as an argument.
        //once complete, change the url and display the customer list
        addCustomer(customer)
        .then(() => history.push("/newcontainer"))
      
    }

    return (
        <>
        <section className="main">
        <article className="containerRight">
        <form className="customerForm">
            <h2 className="customerForm__title">New Customer</h2>
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
                onClick={handleClickSaveCustomer}>
                Save Customer
            </button>
        </form>
        </article>
        </section>
        </>
    )
    }
