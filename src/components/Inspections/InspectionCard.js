import React, { useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { InspectionContext } from "./InspectionProvider"
import "./Inspection.css"

//InspectionCard is called in InspectionList.js and CustomerInspections.js
//This displays basic information about the inspection
export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    const { inspections, getInspections, deleteInspection, addInspection } = useContext(InspectionContext)
    
    const history = useHistory()

    //if user presses "details" button, they will be taken to details page
    const handleDetails = () => {
        history.push(`/inspections/detail/${inspectionInstance.id}`) 
    }

    //delete button functionality
    const handleDelete = () => {
        deleteInspection(inspectionInstance.id)
          .then(getInspections)
          .then(() => {
            history.push("/inspections")
          })
      }

    /*if user presses "New Inspection" button, the IDs of the referenced 
    inspection are captured and held in sessionStorage until inspection is saved*/
    const handleNewInspection = () => {
        // sessionStorage.setItem("customerId", customerInstance.id)
        // sessionStorage.setItem("containerId", containerInstance.id)
        // sessionStorage.setItem("reserveId", reserveInstance.id)
        // sessionStorage.setItem("mainParachuteId", mainParachuteInstance.id)
        // sessionStorage.setItem("aadId", aadInstance.id)
        
        const inspection = {
            
            userId: parseInt(sessionStorage.getItem("app_user_id")),
            customerId: customerInstance.id,
            date: new Date,
            containerId: containerInstance?.id ? containerInstance?.id : 0,
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
            reserveId: reserveInstance?.id ? reserveInstance?.id : 0,
            mainDBag: false,
            mainLinks: false,
            mainSuspensionLines: false,
            mainBridlePilotchute: false,
            mainCrossports: false,
            mainSeamFabric: false,
            mainSlider: false,
            mainNotes: "",
            mainParachuteId: mainParachuteInstance?.id ? mainParachuteInstance?.id : 0,
            aadInstallation: false,
            aadCables: false,
            aadInService: false,
            aadNotes: "",
            aadId: aadInstance?.id ? aadInstance?.id : 0
            
        }
        addInspection(inspection)
        const inspectionIndex = parseInt(inspections.length)
        const inspectionId = inspections[inspectionIndex-1].id
        
        history.push(`/inspections/detail/${inspectionId+1}`)
        
        
    }
    
    
    
    return(
    <>
    <h3 className="inspection">
        { customerInstance?.name } { inspectionInstance?.date }
    </h3>
    <section className="inspectionCard" id={`inspectionId--${inspectionInstance.id}`}>
        <div className="componentBox">
            <h3>{ containerInstance?.manufacturer } </h3> 
            <p>{ containerInstance?.model }</p>
            <p>Serial #: { containerInstance?.serialNumber }</p>
        </div>
        <div className="componentBox">
            <h3>{ reserveInstance?.manufacturer }</h3>
            <p>{ reserveInstance?.model }</p>
            <p>Serial #: { reserveInstance?.serialNumber }</p>
        </div>
        <div className="componentBox">
            <h3>{ aadInstance?.manufacturer } </h3>
            <p>{ aadInstance?.model }</p>
            <p>Serial #: { aadInstance?.serialNumber }</p>
        </div>
        <div className="componentBox">
            <h3>{ mainParachuteInstance?.manufacturer } </h3>
            <p>{ mainParachuteInstance?.model }</p>
            <p>Serial #: { mainParachuteInstance?.serialNumber }</p>
        </div>
        <button className="inspectionButton" onClick={(handleDetails)}>
                Details
            </button>
        {/* <button className="inspectionButton" onClick={(handleDelete)}>
                Delete
            </button> */}
        <button className="inspectionButton" onClick={(handleNewInspection)}>
                New Inpection
            </button>
      
    </section>
    </>
    )
}