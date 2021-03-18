//import statements
import React, { useContext, useState } from "react"
import { useHistory } from 'react-router-dom';
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider";


//export function to display form for new mainParachute
export const MainParachuteForm = () => {
    
    const { addMainParachute } = useContext(MainParachuteContext)
    
   

    //Define the intial state of the form inputs with useState()
    const [mainParachute, setMainParachute] = useState({
     
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

    //when something changes, save it with setMainParachute
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newMainParachute = { ...mainParachute }
        let selectedVal = event.target.value




        /* MainParachute is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newMainParachute[event.target.id] = selectedVal
        // update state
       
        setMainParachute(newMainParachute)   
    }


    const handleClickSaveMainParachute = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       
       
        //invoke addMainParachute passing mainParachute as an argument.
        //once complete, change the url and display the mainParachute list
        addMainParachute(mainParachute)
        .then(() => history.push("/newinspection"))
      
    }

    return (
        <>
        <section className="main">
        <article className="containerRight">
        <form className="mainParachuteForm">
            <h2 className="rigForm__title">New Rig</h2>
            <h3>Main Parachute</h3>
            <div className="intakeBox" id="mainParachute">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={mainParachute.manufacturer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={mainParachute.model}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={mainParachute.size}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial #:</label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={mainParachute.serialNumber}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={mainParachute.color}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dom">DOM:</label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="DOM" value={mainParachute.dom}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={mainParachute.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                onClick={handleClickSaveMainParachute}>
                Save Main Parachute
            </button>
        </form>
        </article>
        </section>
        </>
    )
    }
