//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { ContainerContext } from "../containers/ContainerProvider";


//export function to display form for new container
export const ContainerForm = () => {
    
    const { addContainer, getContainerById, editContainer, getContainers } = useContext(ContainerContext)
    const { containerId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    
   

    //Define the intial state of the form inputs with useState()
    const [container, setContainer] = useState({
      manufacturer: "Sunpath",
      model: "Javelin",
      size: "TJNK",
      serialNumber: "",
      color: "",
      dom: "",
      notes: "",
      userId: parseInt(sessionStorage.getItem("app_user_id"))      
    });



    const history = useHistory();

    //when something changes, save it with setContainer
    const handleControlledInputChange = (event) => {
        //make a new copy of container
        const newContainer = { ...container }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newContainer[event.target.id] = selectedVal
        
        // update state
        setContainer(newContainer)   
    }

    //handle save function
    const handleClickSaveContainer = (event) => {
       //Prevents the browser from submitting the form
        event.preventDefault() 
        
       //if in the edit page, editcontainerId() then navigate to inspections 
       if (containerId) {
        editContainer(container)
        .then(history.goBack)
        
        } else {
       
        //create a new container then move to newReserve()
        addContainer(container)
        .then(() => history.push("/newreserve"))
      
    }}


     // Get Containers. If CustomerId is in the URL, getContainerById
     useEffect(() => {
        //get all Containers
        getContainers().then(() => {

        // if containerID exists
        if (containerId) {
            //get that container
            getContainerById(containerId)
            //then setContainer to that found Container
            .then(Container => {
                setContainer(Container)
                
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
        <section className="main modal--parent">
        <form className="containerForm modal--content">
            <h2 className="formTitle">Container</h2>
            <div className="intakeBox" id="container">
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerManufacturer">Manufacturer: </label>
                    <input type="text" id="manufacturer" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Manufacturer" value={container?.manufacturer}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerModel">Model: </label>
                    <input type="text" id="model" onChange={handleControlledInputChange} className="form-control" placeholder="Model" value={container.model}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerSize">Size: </label>
                    <input type="text" id="size" onChange={handleControlledInputChange} className="form-control" placeholder="Size" value={container.size}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerSerial">Serial: </label>
                    <input type="text" id="serialNumber" onChange={handleControlledInputChange} className="form-control" placeholder="Serial #" value={container.serialNumber}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerColor">Color: </label>
                    <input type="text" id="color" onChange={handleControlledInputChange} className="form-control" placeholder="Color" value={container.color}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="containerColor">DOM: </label>
                    <input type="text" id="dom" onChange={handleControlledInputChange} className="form-control" placeholder="DOM" value={container.Dom}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    <textarea cols="50" rows="10" id="notes" onChange={handleControlledInputChange} className="form-control" placeholder="Notes" value={container.notes}/>
                </div>
            </fieldset>
            </div>
            
            
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={handleClickSaveContainer}>
                {containerId ? "Save" : "Add"}</button>
            
        </form>

        </section>
        </>
    )
    }
