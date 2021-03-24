//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider";


//export function to display form for new mainParachute
export const MainParachuteForm = () => {
    
    const { addMainParachute, getMainParachuteById, editMainParachute, getMainParachutes } = useContext(MainParachuteContext)
    const { mainParachuteId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    
   

    //Define the intial state of the form inputs with useState()
    const [mainParachute, setMainParachute] = useState({
      
      manufacturer: "",
      model: "",
      size: "",
      serialNumber: "",
      color: "",
      dom: "",
      userId: parseInt(sessionStorage.getItem("app_user_id"))


      
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
       
       if (mainParachuteId) {
        editMainParachute(mainParachute)
        .then(history.push("/inspections/"))
        } else {
       
        //invoke addMainParachute passing mainParachute as an argument.
        //once complete, change the url and display the mainParachute list
        addMainParachute(mainParachute)
        .then(() => history.push("/newinspection"))
      
    }}

     // Get MainParachutes. If CustomerId is in the URL, getMainParachuteById
     useEffect(() => {
        getMainParachutes().then(() => {

            // if there is data
        if (mainParachuteId) {
            getMainParachuteById(mainParachuteId)
            .then(MainParachute => {
                setMainParachute(MainParachute)
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
        <form className="mainParachuteForm">
            <h2 className="rigForm__title">New Rig</h2>
            <h3>MainParachute</h3>
            <div className="intakeBox" id="mainParachute">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={mainParachute.manufacturer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Model">Model:</label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={mainParachute.model}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Size">Size:</label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={mainParachute.size}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Serial">Serial:</label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={mainParachute.serial}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Color">Color:</label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={mainParachute.color}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dom">DOM:</label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="dom" value={mainParachute.dom}/>
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
                disabled={isLoading}
                onClick={handleClickSaveMainParachute}>
                {mainParachuteId ? "Save" : "Add"}</button>
        </form>
        </article>
        </section>
        </>
    )
    }
