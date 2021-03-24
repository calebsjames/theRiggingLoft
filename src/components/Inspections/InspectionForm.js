import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { InspectionContext } from "./InspectionProvider";
import "./Inspection.css"
import { CustomerContext } from "../customers/CustomerProvider";
import { ReserveContext } from "../reserves/ReserveProvider";
import { ContainerContext } from "../containers/ContainerProvider";
import { AADContext } from "../aads/AADProvider";
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider";


//InspectionForm called to make a new inspection or edit an existing one
export const InspectionForm = () => {
    const { addInspection, inspections, getInspections, getInspectionById, editInspection, deleteInspection } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspectionId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory()

    useEffect(() => {
        getInspections()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getContainers)
    }, [])

    
    // Get Inspections. If InspectionId is in the URL, getInspectionById and display edit info
    useEffect(() => {        
        getInspections().then(() => {
    
        // if there is data
        if (inspectionId) {
            getInspectionById(inspectionId)
            .then(Inspection => {
                setInspection(Inspection)
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])
    
    //useState to return correct objects based on whether user is saving new equipment or editing
    const [components, setComponents] = useState({
        container: {},
        aad: {},
        reserve: {},
        mainParachute: {},
        customer: {}
    })
   
    //useEffect to house if() statement that sets components object based on URL    
    useEffect(() => {
        
        if(inspectionId) {
            const newComponents = { ...components }
            
            //logic that runs if it's an edit
            const currentInspection = inspections.find(insp => parseInt(insp.id) === parseInt(inspectionId))
            const customer = customers.find(c => parseInt(c.id) === parseInt(currentInspection.customerId))
            const container = containers.find(cont => parseInt(cont.id) === parseInt(currentInspection.containerId))
            const reserve = reserves.find(c => parseInt(c.id) === parseInt(currentInspection.reserveId))
            const aad = aads.find(c => parseInt(c.id) === parseInt(currentInspection.aadId))
            const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(currentInspection.mainParachuteId))
            
            newComponents.container = container
            newComponents.reserve = reserve
            newComponents.aad = aad
            newComponents.mainParachute = mainParachute
            newComponents.customer = customer
            setComponents(newComponents)    
       
        } else {
            const newComponents = { ...components }

            //logic that runs if it's a new form
            const customer = customers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("customerId")))
            const container = containers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("containerId")))
            const reserve = reserves.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("reserveId")))
            const aad = aads.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("aadId")))
            const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("mainParachuteId")))
            
            newComponents.container = container
            newComponents.reserve = reserve
            newComponents.aad = aad
            newComponents.mainParachute = mainParachute
            newComponents.customer = customer

            setComponents(newComponents)  
        }  
        //runs after getContainers updates containers
        }, [containers])
    




    //Define the intial state of the form inputs with useState()
    const [inspection, setInspection] = useState({
        
      userId: sessionStorage.getItem("app_user_id"),
      customerId: sessionStorage.getItem("customerId"),
      date: new Date,
      containerId: sessionStorage.getItem("containerId"),
      containerMainTray: false,
      containerReserveTray: false,
      containerHardware: false,
      containerChestStrap: false,
      containerLegStraps: false,
      containerRisers: false,
      containerStitching: false,
      containerGrommets: false,
      containerReserveHandle: false,
      containerCutawayHandle: false,
      containerWebbing: false,
      containerNotes: "",
      reserveDBag: false,
      reserveLinks: false,
      reserveSuspensionLines: false,
      reserveBridlePilotchute: false,
      reserveCrossports: false,
      reserveSeamFabric: false,
      reserveSlider: false,
      reserveNotes: "",
      reserveId: sessionStorage.getItem("reserveId"),
      mainDBag: false,
      mainLinks: false,
      mainSuspensionLines: false,
      mainBridlePilotchute: false,
      mainCrossports: false,
      mainSeamFabric: false,
      mainSlider: false,
      mainNotes: "",
      mainParachuteId: sessionStorage.getItem("mainParachuteId"),
      aadInstallation: false,
      aadCables: false,
      aadInService: false,
      aadNotes: "",
      aadId: sessionStorage.getItem("aadId"),
      
    });
   
  

    //handle input change for text
    const handleControlledInputChange = (event) => {
        //make a copy of inspection
        const newInspection = { ...inspection }

        //get value of field that was changed
        let selectedVal = event.target.value
        
        //Set the property to the new value
        newInspection[event.target.id] = selectedVal

        // update state
        setInspection(newInspection)   
    }

    //handle input changes for checkboxes
    const handleCheckboxChange = (event) => {
        //make a copy of inspection
        const newInspection = { ...inspection }

        //get boolean of whether box is checked
        let selectedVal = event.target.checked

        //Set the property to the new boolean value of checked
        newInspection[event.target.id] = selectedVal
        // update state
        setInspection(newInspection)   
    }

    //edits inspection if on the edit pages, saves if it's a new inspection
    const handleClickSaveInspection = (event) => {
       //Prevents the browser from submitting the form
        event.preventDefault() 
       
       //if inspectionId exists, edit
       if (inspectionId) {
           editInspection(inspection)
           .then(history.push("/inspections"))
       } else {
        //if inspectionId does not exists, clear session storage and save inspection
        addInspection(inspection)
        .then(() => history.push("/home"))
        sessionStorage.removeItem("mainParachuteId")
        sessionStorage.removeItem("aadId")
        sessionStorage.removeItem("reserveId")
        sessionStorage.removeItem("containerId")
        sessionStorage.removeItem("customerId")
       }
    }
    


    //delete an inspection by ID then return back to inspections
    const handleDelete = () => {
        deleteInspection(inspectionId)
            .then(getInspections)
            .then(() => {
            history.push("/inspections")
            })
    } 

    //logic for edit buttons that show up on inpsection review
    const handleClickEditContainer = () => {
        history.push(`/container/edit/${components.container?.id}`)
    }
    const handleClickEditReserve = () => {
        history.push(`/reserve/edit/${components.reserve?.id}`)
    }
    const handleClickEditAAD = () => {
        history.push(`/aad/edit/${components.aad?.id}`)
    }
    const handleClickEditMainParachute = () => {
        history.push(`/mainParachute/edit/${components.mainParachute?.id}`)
    }

    //return statement
    return<>
        <h2 id="inspectionTitle">
            {inspectionId ? "Inspection Details" : "New Inspection"}
        </h2>
        <section id="inspectionPage">    
            <article className="inspectionBox">
                <form className="containerInspectionForm">
                <article className="inspectionBox">
                
                {/* container portion */}
                <h3>Container</h3>
                <div className="componentDetails">
                    <p> {components.container?.manufacturer} {components.container?.model}</p>
                    <p><b>Size: </b>{components.container?.size} </p>
                    <p>Serial #: {components.container?.serialNumber} </p>
                    <p>Color: {components.container?.color} </p>
                    <p>DOM: {components.container?.dom} </p>
                    <p>Notes: {components.container?.notes} </p>
                    {inspectionId ? <button className="btn btn-primary"
                        disabled={isLoading}
                        onClick={handleClickEditContainer}>
                        Edit</button> : ""}
                </div>

                <div className="componentBoxInspectionList">
                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerMainTray">Main tray:</label>
                            <input type="checkbox" id="containerMainTray" onChange={handleCheckboxChange} name="containerMainTray" checked={inspection.containerMainTray} required  className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerReserveTray">Reserve tray:</label>
                            <input type="checkbox" id="containerReserveTray" onChange={handleCheckboxChange} checked={inspection.containerReserveTray} required  className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerLegStraps">Leg straps:</label>
                            <input type="checkbox" id="containerLegStraps" onChange={handleCheckboxChange} checked={inspection.containerLegStraps} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerChestStrap">Chest strap:</label>
                            <input type="checkbox" id="containerChestStrap" onChange={handleCheckboxChange} checked={inspection.containerChestStrap} required  className="form-control" />
                        </div>
                    </fieldset>
                    
                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerRisers">Risers:</label>
                            <input type="checkbox" id="containerRisers" onChange={handleCheckboxChange} checked={inspection.containerRisers} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerHardware">Hardware:</label>
                            <input type="checkbox" id="containerHardware" onChange={handleCheckboxChange} checked={inspection.containerHardware} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerGrommets">Grommets:</label>
                            <input type="checkbox" id="containerGrommets" onChange={handleCheckboxChange} checked={inspection.containerGrommets} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerWebbing">Webbing:</label>
                            <input type="checkbox" id="containerWebbing" onChange={handleCheckboxChange} checked={inspection.containerWebbing} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerStitching">Stitching:</label>
                            <input type="checkbox" id="containerStitching" onChange={handleCheckboxChange} checked={inspection.containerStitching} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerCutawayHandle">Cutaway handle:</label>
                            <input type="checkbox" id="containerCutawayHandle" onChange={handleCheckboxChange} checked={inspection.containerCutawayHandle} required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerReserveHandle">Reserve handle:</label>
                            <input type="checkbox" id="containerReserveHandle" onChange={handleCheckboxChange} checked={inspection.containerReserveHandle} required  className="form-control" />
                        </div>
                    </fieldset>
                </div>

                    <fieldset className="checkbox">
                        <div className="form-group">
                            <label htmlFor="containerNotes">Notes:</label>
                            <input type="text" id="containerNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.containerNotes}/>
                        </div>
                    </fieldset> 
                    </article>
                    <article className="inspectionBox">

                        {/* reserve portion */}
                        <h3>Reserve</h3>
                        <div className="componentDetails">
                            <p> {components.reserve?.manufacturer} {components.reserve?.model} </p>
                            <p><b>Size: </b> {components.reserve?.size} </p>
                            <p>Serial #: {components.reserve?.serialNumber} </p>
                            <p>Color: {components.reserve?.color} </p>
                            <p>DOM: {components.reserve?.dom} </p>
                           <p>Notes: {components.reserve?.notes} </p>
                           {inspectionId ? <button className="btn btn-primary"
                                disabled={isLoading}
                                onClick={handleClickEditReserve}>
                                Edit</button> : ""}
                        </div>
                        <div className="componentBoxInspectionList">
                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveDBag">D-Bag:</label>
                                    <input type="checkbox" id="reserveDBag" onChange={handleCheckboxChange} required className="form-control" placeholder="D-Bag" checked={inspection.reserve}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveLinks">Links:</label>
                                    <input type="checkbox" id="reserveLinks" onChange={handleCheckboxChange} required className="form-control" placeholder="Links" checked={inspection.reserve}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveSuspensionLines">Suspension Lines:</label>
                                    <input type="checkbox" id="reserveSuspensionLines" onChange={handleCheckboxChange} required className="form-control" placeholder="Suspension Lines" checked={inspection.reserveSuspensionLines}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveBridlePilotchute">Bridle and Pilotchute:</label>
                                    <input type="checkbox" id="reserveBridlePilotchute" onChange={handleCheckboxChange} required className="form-control" placeholder="Bridle and Pilotchute" checked={inspection.reserveBridlePilotchute}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveCrossports">Crossports:</label>
                                    <input type="checkbox" id="reserveCrossports" onChange={handleCheckboxChange} required className="form-control" placeholder="Crossports" checked={inspection.reserveCrossports}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveSeamFabric">Seams and Fabric:</label>
                                    <input type="checkbox" id="reserveSeamFabric" onChange={handleCheckboxChange} required className="form-control" placeholder="Seams and Fabric" checked={inspection.reserveSeamFabric}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveSlider">Slider:</label>
                                    <input type="checkbox" id="reserveSlider" onChange={handleCheckboxChange} required className="form-control" placeholder="Slider" checked={inspection.reserveSlider}/>
                                </div>
                            </fieldset> 
                            
                        </div>
                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="reserveNotes">Notes:</label>
                                    <input type="text" id="reserveNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.reserveNotes}/>
                                </div>
                            </fieldset>
                    </article>
                    <article className="inspectionBox">

                    {/* aad portion */}
                    <h3>AAD</h3>
                    <div className="componentDetails">
                        <p> {components.aad?.manufacturer} {components.aad?.model} </p>
                        <p>Serial #: {components.aad?.serialNumber} </p>
                        <p>Next Service Date: {components.aad?.nextServiceDate} </p>
                        <p>DOM: {components.aad?.dom} </p>
                        <p>Notes: {components.aad?.notes} </p>
                        {inspectionId ? <button className="btn btn-primary"
                        disabled={isLoading}
                        onClick={handleClickEditAAD}>
                        Edit</button> : ""}
                    </div>

                    <div className="componentBoxInspectionList">
                    <fieldset className="checkbox">
                        <div className="form-group">
                            <label htmlFor="aadInstallation">Installation:</label>
                            <input type="checkbox" id="aadInstallation" onChange={handleCheckboxChange} required className="form-control" placeholder="AAD Installation" checked={inspection.aadInstallation}/>
                        </div>
                    </fieldset> 

                    <fieldset className="checkbox">
                        <div className="form-group">
                            <label htmlFor="aadCables">Cables:</label>
                            <input type="checkbox" id="aadCables" onChange={handleCheckboxChange} required className="form-control" placeholder="Cables" checked={inspection.aadCables}/>
                        </div>
                    </fieldset> 

                    <fieldset className="checkbox">
                        <div className="form-group">
                            <label htmlFor="aadInService">In Service:</label>
                            <input type="checkbox" id="aadInService" onChange={handleCheckboxChange} required className="form-control" placeholder="In Service" checked={inspection.aadInService}/>
                        </div>
                    </fieldset> 
                    </div>

                    <fieldset className="checkbox">
                        <div className="form-group">
                            <label htmlFor="aadNotes">Notes:</label>
                            <input type="text" id="aadNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.aadNotes}/>
                        </div>
                    </fieldset>
                    </article>
                    <article className="inspectionBox">

                        {/* reserve portion */}
                        <h3>Main Parachute</h3>
                        <div className="componentDetails">
                            <p> {components.mainParachute?.manufacturer} {components.mainParachute?.model} </p>
                            <p><b>Size: </b> {components.mainParachute?.size} </p>
                            <p>Serial #: {components.mainParachute?.serialNumber} </p>
                            <p>Color: {components.mainParachute?.color} </p>
                            <p>DOM: {components.mainParachute?.dom} </p>
                            <p>Notes: {components.mainParachute?.notes} </p>
                            {inspectionId ? <button className="btn btn-primary"
                            disabled={isLoading}
                            onClick={handleClickEditMainParachute}>
                        Edit</button> : ""}
                        </div>
                        <div className="componentBoxInspectionList">
                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainDBag">D-Bag:</label>
                                    <input type="checkbox" id="mainDBag" onChange={handleCheckboxChange} required className="form-control" placeholder="D-Bag" checked={inspection.mainDBag}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainLinks">Links:</label>
                                    <input type="checkbox" id="mainLinks" onChange={handleCheckboxChange} required className="form-control" placeholder="Links" checked={inspection.mainLinks}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainSuspensionLines">Suspension Lines:</label>
                                    <input type="checkbox" id="mainSuspensionLines" onChange={handleCheckboxChange} required className="form-control" placeholder="Suspension Lines" checked={inspection.mainSuspensionLines}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainBridlePilotchute">Bridle and Pilotchute:</label>
                                    <input type="checkbox" id="mainBridlePilotchute" onChange={handleCheckboxChange} required className="form-control" placeholder="Bridle and Pilotchute" checked={inspection.mainBridlePilotchute}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainCrossports">Crossports:</label>
                                    <input type="checkbox" id="mainCrossports" onChange={handleCheckboxChange} required className="form-control" placeholder="Crossports" checked={inspection.mainCrossports}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainSeamFabric">Seams and Fabric:</label>
                                    <input type="checkbox" id="mainSeamFabric" onChange={handleCheckboxChange} required className="form-control" placeholder="Seams and Fabric" checked={inspection.mainSeamFabric}/>
                                </div>
                            </fieldset> 

                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainSlider">Slider:</label>
                                    <input type="checkbox" id="mainSlider" onChange={handleCheckboxChange} required className="form-control" placeholder="Slider" checked={inspection.mainSlider}/>
                                </div>
                            </fieldset> 
                        </div>
                            
                            <fieldset className="checkbox">
                                <div className="form-group">
                                    <label htmlFor="mainNotes">Notes:</label>
                                    <input type="text" id="mainNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.mainNotes}/>
                                </div>
                            </fieldset>
                    </article>
                </form>   
        </article>
        </section>
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={handleClickSaveInspection}>
            {inspectionId ? "Save" : "Complete"}</button>
    
        
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={handleDelete}>
            {inspectionId ? "Delete" : "Cancel"}</button>'
    </>
}