import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { InspectionContext } from "./InspectionProvider";
import "./Inspection.css"



export const InspectionForm = () => {
    const { addInspection } = useContext(InspectionContext)
    

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
    console.log(sessionStorage.getItem("app_user_id"))
    const history = useHistory();

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


    const handleClickSaveInspection = (event) => {
       event.preventDefault() //Prevents the browser from submitting the form
       
       
       
       
        //invoke addInspection passing inspection as an argument.
        //once complete, change the url and display the inspection list
        addInspection(inspection)
        .then(sessionStorage.removeItem("newMainParachuteId"))
        .then(sessionStorage.removeItem("newAADId"))
        .then(sessionStorage.removeItem("newReserveId"))
        .then(sessionStorage.removeItem("newContainerId"))
        .then(sessionStorage.removeItem("newCustomerId"))
        .then(() => history.push("/home"))
      
    }
    
    
    return<>
        <h2 id="inspectionTitle">
            New Inspection
        </h2>
        <section id="inspectionPage">    
            <article className="inspectionBox">
                <form className="containerInspectionForm">
                <article className="inspectionBox">
                <h3>Container</h3>
                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerMainTray">Main tray:</label>
                            <input type="checkbox" id="containerMainTray"  value="containerMainTray" required  className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerReserveTray">Reserve tray:</label>
                            <input type="checkbox" id="containerReserveTray"  value="containerReserveTray" required  className="form-control" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerLegStraps">Leg straps:</label>
                            <input type="checkbox" id="containerLegStraps"  value="containerLegStraps" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerChestStrap">Chest strap:</label>
                            <input type="checkbox" id="containerChestStrap"  value="containerChestStrap" required  className="form-control" />
                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerRisers">Risers:</label>
                            <input type="checkbox" id="containerRisers"  value="containerRisers" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerHardware">Hardware:</label>
                            <input type="checkbox" id="containerHardware"  value="containerHardware" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerGrommets">Grommets:</label>
                            <input type="checkbox" id="containerGrommets"  value="containerGrommets" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerWebbing">Webbing:</label>
                            <input type="checkbox" id="containerWebbing"  value="containerWebbing" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerStitching">Stitching:</label>
                            <input type="checkbox" id="containerStitching"  value="containerStitching" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerCutawayHandle">Cutaway handle:</label>
                            <input type="checkbox" id="containerCutawayHandle"  value="containerCutawayHandle" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="inspection-form-group">
                            <label htmlFor="containerReserveHandle">Reserve handle:</label>
                            <input type="checkbox" id="containerReserveHandle"  value="containerReserveHandle" required  className="form-control" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="containerNotes">Notes:</label>
                            <input type="text" id="containerNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.containerNotes}/>
                        </div>
                    </fieldset> 
                    </article>
                    <article className="inspectionBox">
                    <h3>Reserve</h3>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveDBag">D-Bag:</label>
                            <input type="checkbox" id="reserveDBag" onChange={handleControlledInputChange} required className="form-control" placeholder="D-Bag" value={inspection.reserveDBag}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveLinks">Links:</label>
                            <input type="checkbox" id="reserveLinks" onChange={handleControlledInputChange} required className="form-control" placeholder="Links" value={inspection.reserveLinks}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveSuspensionLines">Suspension Lines:</label>
                            <input type="checkbox" id="reserveSuspensionLines" onChange={handleControlledInputChange} required className="form-control" placeholder="Suspension Lines" value={inspection.reserveSuspensionLines}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveBridlePilotchute">Bridle and Pilotchute:</label>
                            <input type="checkbox" id="reserveBridlePilotchute" onChange={handleControlledInputChange} required className="form-control" placeholder="Bridle and Pilotchute" value={inspection.reserveBridlePilotchute}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveCrossports">Crossports:</label>
                            <input type="checkbox" id="reserveCrossports" onChange={handleControlledInputChange} required className="form-control" placeholder="Crossports" value={inspection.reserveCrossports}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveSeamFabric">Seams and Fabric:</label>
                            <input type="checkbox" id="reserveSeamFabric" onChange={handleControlledInputChange} required className="form-control" placeholder="Seams and Fabric" value={inspection.reserveSeamFabric}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveSlider">Slider:</label>
                            <input type="checkbox" id="reserveSlider" onChange={handleControlledInputChange} required className="form-control" placeholder="Slider" value={inspection.reserveSlider}/>
                        </div>
                    </fieldset> 
                    
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="reserveNotes">Notes:</label>
                            <input type="text" id="reserveNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.reserveNotes}/>
                        </div>
                    </fieldset>
                    </article>
                    <article className="inspectionBox">
                    <h3>AAD</h3>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="aadInstallation">Installation:</label>
                            <input type="checkbox" id="aadInstallation" onChange={handleControlledInputChange} required className="form-control" placeholder="AAD Installation" value={inspection.aadInstallation}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="aadCables">Cables:</label>
                            <input type="checkbox" id="aadCables" onChange={handleControlledInputChange} required className="form-control" placeholder="Cables" value={inspection.aadCables}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="aadInService">In Service:</label>
                            <input type="checkbox" id="aadInService" onChange={handleControlledInputChange} required className="form-control" placeholder="In Service" value={inspection.aadInService}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="aadNotes">Notes:</label>
                            <input type="text" id="aadNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.aadNotes}/>
                        </div>
                    </fieldset>
                    </article>
                    <article className="inspectionBox">
                    <h3>Main Parachute</h3>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainDBag">D-Bag:</label>
                            <input type="checkbox" id="mainDBag" onChange={handleControlledInputChange} required className="form-control" placeholder="D-Bag" value={inspection.mainDBag}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainLinks">Links:</label>
                            <input type="checkbox" id="mainLinks" onChange={handleControlledInputChange} required className="form-control" placeholder="Links" value={inspection.mainLinks}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainSuspensionLines">Suspension Lines:</label>
                            <input type="checkbox" id="mainSuspensionLines" onChange={handleControlledInputChange} required className="form-control" placeholder="Suspension Lines" value={inspection.mainSuspensionLines}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainBridlePilotchute">Bridle and Pilotchute:</label>
                            <input type="checkbox" id="mainBridlePilotchute" onChange={handleControlledInputChange} required className="form-control" placeholder="Bridle and Pilotchute" value={inspection.mainBridlePilotchute}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainCrossports">Crossports:</label>
                            <input type="checkbox" id="mainCrossports" onChange={handleControlledInputChange} required className="form-control" placeholder="Crossports" value={inspection.mainCrossports}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainSeamFabric">Seams and Fabric:</label>
                            <input type="checkbox" id="mainSeamFabric" onChange={handleControlledInputChange} required className="form-control" placeholder="Seams and Fabric" value={inspection.mainSeamFabric}/>
                        </div>
                    </fieldset> 

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainSlider">Slider:</label>
                            <input type="checkbox" id="mainSlider" onChange={handleControlledInputChange} required className="form-control" placeholder="Slider" value={inspection.mainSlider}/>
                        </div>
                    </fieldset> 
                    
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="mainNotes">Notes:</label>
                            <input type="text" id="mainNotes" onChange={handleControlledInputChange} required className="form-control" placeholder="Notes" value={inspection.mainNotes}/>
                        </div>
                    </fieldset>
                    </article>

                </form>   
</article>
<article className="inspectionBox">
                <p>AAD</p>
            </article>
            <article className="inspectionBox">
                <p>Reserve</p>
            </article>
            <article className="inspectionBox">
                <p>Main</p>
            </article>
        </section>
        <button className="btn btn-primary"
            onClick={handleClickSaveInspection}>
            Save Inspection
        </button>
    </>
}