import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { InspectionContext } from "./InspectionProvider";
import "./Inspection.css"
import { CustomerContext } from "../customers/CustomerProvider";
import { ReserveContext } from "../reserves/ReserveProvider";
import { ContainerContext } from "../containers/ContainerProvider";
import { AADContext } from "../aads/AADProvider";
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider";



export const InspectionForm = () => {
    const { addInspection, inspections, getInspections, getInspectionById, editInspection } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspectionId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);



    useEffect(() => {
        getInspections()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getContainers)
    }, [])

    const history = useHistory()
    
    

    // if(inspectionId) {
    //     const currentInspection = inspections.find(insp => parseInt(insp.id) === parseInt(inspectionId))
    //     const customer = customers.find(c => parseInt(c.id) === parseInt(currentInspection.customerId))
    //     const container = containers.find(c => parseInt(c.id) === parseInt(currentInspection.containerId))
    //     const reserve = reserves.find(c => parseInt(c.id) === parseInt(currentInspection.reserveId))
    //     const aad = aads.find(c => parseInt(c.id) === parseInt(currentInspection.aadId))
    //     const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(currentInspection.mainParachuteId))
    // } else {
        const customer = customers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("customerId")))
        const container = containers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("containerId")))
        const reserve = reserves.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("reserveId")))
        const aad = aads.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("aadId")))
        const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("mainParachuteId")))
    

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
      containerNotes: false,
      reserveDBag: false,
      reserveLinks: false,
      reserveSuspensionLines: false,
      reserveBridlePilotchute: false,
      reserveCrossports: false,
      reserveSeamFabric: false,
      reserveSlider: false,
      reserveNotes: false,
      reserveId: sessionStorage.getItem("reserveId"),
      mainDBag: false,
      mainLinks: false,
      mainSuspensionLines: false,
      mainBridlePilotchute: false,
      mainCrossports: false,
      mainSeamFabric: false,
      mainSlider: false,
      mainNotes: false,
      mainParachuteId: sessionStorage.getItem("mainParachuteId"),
      aadInstallation: false,
      aadCables: false,
      aadInService: false,
      aadNotes: false,
      aadId: sessionStorage.getItem("aadId"),
      
    });
   
  

    //when some changes, save it
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newInspection = { ...inspection }
        let selectedVal = event.target.value




        /* Inspection is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newInspection[event.target.id] = selectedVal
        // update state
        setInspection(newInspection)   
    }
    //when some changes, save it
    const handleCheckboxChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newInspection = { ...inspection }
        let selectedVal = event.target.checked




        /* Inspection is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newInspection[event.target.id] = selectedVal
        // update state
        setInspection(newInspection)   
    }


    const handleClickSaveInspection = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       
       if (inspectionId) {
           editInspection(inspection)
           .then(history.push/"/inspections")
       } else {
       
        //invoke addInspection passing inspection as an argument.
        //once complete, change the url and display the inspection list
        addInspection(inspection)
        .then(sessionStorage.removeItem("mainParachuteId"))
        .then(sessionStorage.removeItem("aadId"))
        .then(sessionStorage.removeItem("reserveId"))
        .then(sessionStorage.removeItem("containerId"))
        .then(sessionStorage.removeItem("customerId"))
        .then(() => history.push("/home"))
       }
    }
    
        // Get Inspections. If InspectionId is in the URL, getInspectionById
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

       
    const handleClickEditContainer = () => {
        history.push(`/container/edit/${container.id}`)
    }
    const handleClickEditReserve = () => {
        history.push(`/reserve/edit/${reserve.id}`)
    }
    const handleClickEditAAD = () => {
        history.push(`/aad/edit/${aad.id}`)
    }
    const handleClickEditMainParachute = () => {
        history.push(`/mainParachute/edit/${mainParachute.id}`)
    }

    const checked = (item) => {
        if (inspection.item =! "") {
            <input type="checkbox" id="containerMainTray" onChange={handleControlledInputChange} name={item} value="true" required  className="form-control" checked/>
        } else {
             <input type="checkbox" id="containerMainTray" onChange={handleControlledInputChange} name={item} value="true" required  className="form-control" />                
        }
    }
        

    return<>
        <h2 id="inspectionTitle">
            {inspectionId ? "Inspection Details" : "New Inspection"}
        </h2>
        <section id="inspectionPage">    
            <article className="inspectionBox">
                <form className="containerInspectionForm">
                <article className="inspectionBox">
                <h3>Container</h3>

                <div className="componentDetails">
                    <p> {container ? container.manufacturer : ""} {container ? container.model : ""}</p>
                    <p><b>Size: </b>{container ? container.size : ""} </p>
                    <p>Serial #: {container ? container.serialNumber : ""} </p>
                    <p>Color: {container ? container.color : ""} </p>
                    <p>DOM: {container ? container.dom : ""} </p>
                    <p>Notes: {container ? container.notes : ""} </p>
                    {inspectionId ? <button className="btn btn-primary"
                        disabled={isLoading}
                        onClick={handleClickEditContainer}>
                        Edit</button> : ""}
                </div>

                <div className="componentBox">
                    <fieldset className="checkbox">
                        <div className="inspection-form-group">
                            <label htmlFor="containerMainTray">Main tray:</label>
                            {/* {checked(containerMainTray)} */}
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
                        <h3>Reserve</h3>
                        <div className="componentDetails">
                            <p> {reserve ? reserve.manufacturer : ""} {reserve ? reserve.model : ""} </p>
                            <p><b>Size: </b> {reserve ? reserve.size : ""} </p>
                            <p>Serial #: {reserve ? reserve.serialNumber : ""} </p>
                            <p>Color: {reserve ? reserve.color : ""} </p>
                            <p>DOM: {reserve ? reserve.dom : ""} </p>
                           <p>Notes: {reserve ? reserve.notes : ""} </p>
                           {inspectionId ? <button className="btn btn-primary"
                                disabled={isLoading}
                                onClick={handleClickEditReserve}>
                                Edit</button> : ""}
                        </div>
                        <div className="componentBox">
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
                    <h3>AAD</h3>
                    <div className="componentDetails">
                        <p> {aad ? aad.manufacturer : ""} {aad ? aad.model : ""} </p>
                        <p>Serial #: {aad ? aad.serialNumber : ""} </p>
                        <p>Next Service Date: {aad ? aad.nextServiceDate : ""} </p>
                        <p>DOM: {aad ? aad.dom : ""} </p>
                        <p>Notes: {aad ? aad.notes : ""} </p>
                        {inspectionId ? <button className="btn btn-primary"
                        disabled={isLoading}
                        onClick={handleClickEditAAD}>
                        Edit</button> : ""}
                    </div>

                    <div className="componentBox">
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
                        <h3>Main Parachute</h3>
                        <div className="componentDetails">
                            <p> {mainParachute ? mainParachute.manufacturer : ""} {mainParachute ? mainParachute.model : ""} </p>
                            <p><b>Size: </b> {mainParachute ? mainParachute.size : ""} </p>
                            <p>Serial #: {mainParachute ? mainParachute.serialNumber : ""} </p>
                            <p>Color: {mainParachute ? mainParachute.color : ""} </p>
                            <p>DOM: {mainParachute ? mainParachute.dom : ""} </p>
                            <p>Notes: {mainParachute ? mainParachute.notes : ""} </p>
                            {inspectionId ? <button className="btn btn-primary"
                            disabled={isLoading}
                            onClick={handleClickEditMainParachute}>
                        Edit</button> : ""}
                        </div>
                        <div className="componentBox">
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
    </>
}