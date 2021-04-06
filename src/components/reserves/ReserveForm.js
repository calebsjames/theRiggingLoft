//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { ReserveContext } from "../reserves/ReserveProvider";


//export function to display form for new reserve
export const ReserveForm = () => {
    
    const { addReserve, getReserveById, editReserve, getReserves } = useContext(ReserveContext)
    const { reserveId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    
   

    //Define the intial state of the form inputs with useState()
    const [reserve, setReserve] = useState({
      
      manufacturer: "",
      model: "",
      size: "",
      serialNumber: "",
      color: "",
      dom: "",
      notes: "",
      userId: parseInt(sessionStorage.getItem("app_user_id"))
      
    });



    const history = useHistory();

    //when something changes, save it with setReserve
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newReserve = { ...reserve }
        let selectedVal = event.target.value




        /* Reserve is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newReserve[event.target.id] = selectedVal
        // update state
       
        setReserve(newReserve)   
    }


    const handleClickSaveReserve = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       if (reserveId) {
        editReserve(reserve)
        .then(history.goBack)
        } else {
       
        //invoke addReserve passing reserve as an argument.
        //once complete, change the url and display the reserve list
        addReserve(reserve)
        .then(() => history.push("/newaad"))
      
    }}

     // Get Reserves. If CustomerId is in the URL, getReserveById
     useEffect(() => {
        getReserves().then(() => {

            // if there is data
        if (reserveId) {
            getReserveById(reserveId)
            .then(Reserve => {
                setReserve(Reserve)
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
        <section className="main modal--parent">
        <article className="containerRight modal--content">
        <form className="reserveForm">
            
            <h2 className="formTitle">Reserve</h2>
            <div className="intakeBox" id="reserve">
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="Manufacturer">Manufacturer: </label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={reserve.manufacturer}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="Model">Model: </label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={reserve.model}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="Size">Size: </label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={reserve.size}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="Serial">Serial: </label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={reserve.serial}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="Color">Color: </label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={reserve.color}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="dom">DOM: </label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="dom" value={reserve.dom}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <textarea cols="50" rows="10" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={reserve.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={handleClickSaveReserve}>
                {reserveId ? "Save" : "Add"}</button>
        </form>
        </article>
        </section>
        </>
    )
    }
