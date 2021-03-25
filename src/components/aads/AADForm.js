//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { AADContext } from "../aads/AADProvider";


//export function to display form for new aad
export const AADForm = () => {
    
    const { addAAD, getAADById, editAAD, getAADs } = useContext(AADContext)
    const { aadId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory();
    
    //Define the intial state of the AAD with useState()
    const [aad, setAAD] = useState({
        manufacturer: "",
        model: "",
        serialNumber: "",
        dom: "",
        nextServiceDate: "",
        notes: "",
        userId: parseInt(sessionStorage.getItem("app_user_id"))      
    });




    //when something changes, save it with setAAD
    const handleControlledInputChange = (event) => {
        //make a new copy of aad
        const newAAD = { ...aad }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newAAD[event.target.id] = selectedVal
        
        // update state
        setAAD(newAAD)   
    }

    //handle save function
    const handleClickSaveAAD = (event) => {
        //Prevents the browser from submitting the form
        event.preventDefault() 
        
       //if in the edit page, editAAD() then navigate to inspections 
       if (aadId) {
        editAAD(aad)
        .then(history.push("/inspections/"))
        
        } else {
       
        //create a new AAD then move to newMainParachute()
        addAAD(aad)
        .then(() => history.push("/newmainparachute"))
      
    }}


    useEffect(() => {
        //get all AADs
        getAADs().then(() => {

        // if aadID exists
        if (aadId) {
            //get that aad
            getAADById(aadId)
            //then setAAD to that found AAD
            .then(AAD => {
                setAAD(AAD)
                
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])


    //Return this HTML
    return (
        <>
        <section className="main">
        <article className="containerRight">
        <form className="aadForm">
            <h2 className="rigForm__title">New Rig</h2>
            <h3>AAD</h3>
            <div className="intakeBox" id="aad">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={aad.manufacturer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={aad.model}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial:</label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={aad.serialNumber}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dom">DOM:</label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="DOM" value={aad.dom}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="nextServiceDate">Next Service:</label>
                    <input type="text" id="nextServiceDate" onChange={handleControlledInputChange} className="form-control" placeholder="Next Service Date" value={aad.nextServiceDate}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={aad.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                onClick={handleClickSaveAAD}>
                Save AAD
            </button>
        </form>
        </article>
        </section>
        </>
    )
    }
