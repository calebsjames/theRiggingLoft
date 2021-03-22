//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { AADContext } from "../aads/AADProvider";


//export function to display form for new aad
export const AADForm = () => {
    
    const { addAAD, getAADById, editAAD, getAADs } = useContext(AADContext)
    const { aadId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    
   

    //Define the intial state of the form inputs with useState()
    const [aad, setAAD] = useState({
        manufacturer: "",
        model: "",
        serialNumber: "",
        dom: "",
        nextServiceDate: "",
        notes: "",
        userId: sessionStorage.getItem("app_user_id")      
    });



    const history = useHistory();

    //when something changes, save it with setAAD
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newAAD = { ...aad }
        let selectedVal = event.target.value




        /* AAD is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newAAD[event.target.id] = selectedVal
        // update state
       
        setAAD(newAAD)   
    }


    const handleClickSaveAAD = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       if (aadId) {
        editAAD(aad)
        .then(history.push("/inspections/"))
        } else {
       
    
        //invoke addAAD passing aad as an argument.
        //once complete, change the url and display the aad list
        addAAD(aad)
        .then(() => history.push("/newmainparachute"))
      
    }}

    useEffect(() => {
        getAADs().then(() => {

            // if there is data
        if (aadId) {
            getAADById(aadId)
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
