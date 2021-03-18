//import statements
import React, { useContext, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ContainerContext } from "../containers/ContainerProvider";


//export function to display form for new container
export const ContainerForm = () => {
    
    const { addContainer } = useContext(ContainerContext)
    
   

    //Define the intial state of the form inputs with useState()
    const [container, setContainer] = useState({
      manufacturer: "",
      model: "",
      size: "",
      serialNumber: "",
      color: "",
      dom: "",
      notes: "",
      userId: sessionStorage.getItem("app_user_id")      
    });



    const history = useHistory();

    //when something changes, save it with setContainer
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newContainer = { ...container }
        let selectedVal = event.target.value




        /* Container is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newContainer[event.target.id] = selectedVal
        // update state
       
        setContainer(newContainer)   
    }


    const handleClickSaveContainer = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       
       
        //invoke addContainer passing container as an argument.
        //once complete, change the url and display the container list
        addContainer(container)
        .then(() => history.push("/newreserve"))
      
    }

    return (
        <>
        <section className="main">
        <form className="containerForm">
            <h2 className="rigForm__title">New Rig</h2>
            <h3>Container</h3>
            <div className="intakeBox" id="container">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerManufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={container.manufacturer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerModel">Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={container.model}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerSize">Size:</label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={container.size}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerSerial">Serial:</label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={container.serialNumber}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerColor">Color:</label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={container.color}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerColor">DOM:</label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="DOM" value={container.Dom}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="containerNotes">Notes:</label>
                    <input type="text" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={container.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                onClick={handleClickSaveContainer}>
                Save Container
            </button>
        </form>

        </section>
        </>
    )
    }
