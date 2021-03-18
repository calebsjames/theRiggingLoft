//import statements
import React, { useContext, useState } from "react"
import { useHistory } from 'react-router-dom';

import { ReserveContext } from "../reserves/ReserveProvider";


//export function to display form for new reserve
export const ReserveForm = () => {
    
    const { addReserve } = useContext(ReserveContext)
    
   

    //Define the intial state of the form inputs with useState()
    const [reserve, setReserve] = useState({
      
      manufacturer: "",
      model: "",
      size: "",
      serialNumber: "",
      color: "",
      dom: "",
      userId: sessionStorage.getItem("app_user_id")


      
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
       
       
       
        //invoke addReserve passing reserve as an argument.
        //once complete, change the url and display the reserve list
        addReserve(reserve)
        .then(() => history.push("/newaad"))
      
    }

    return (
        <>
        <section className="main">
        <article className="containerRight">
        <form className="reserveForm">
            <h2 className="rigForm__title">New Rig</h2>
            <h3>Reserve</h3>
            <div className="intakeBox" id="reserve">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reserveManufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={reserve.manufacturer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reserveModel">Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={reserve.model}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reserveSize">Size:</label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={reserve.size}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reserveSerial">Serial:</label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={reserve.serial}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reserveColor">Color:</label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={reserve.color}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={reserve.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                onClick={handleClickSaveReserve}>
                Save Reserve
            </button>
        </form>
        </article>
        </section>
        </>
    )
    }