import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { InspectionContext } from "./InspectionProvider"
import "./Inspection.css"

//InspectionCard is called in InspectionList.js and CustomerInspections.js
//This displays basic information about the inspection
export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    const { getInspections, deleteInspection } = useContext(InspectionContext)
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
        sessionStorage.setItem("customerId", customerInstance.id)
        sessionStorage.setItem("containerId", containerInstance.id)
        sessionStorage.setItem("reserveId", reserveInstance.id)
        sessionStorage.setItem("mainParachuteId", mainParachuteInstance.id)
        sessionStorage.setItem("aadId", aadInstance.id)
        history.push("/newinspection")
    }

    
    //return this HTML
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
        <button className="inspectionButton" onClick={(handleDelete)}>
                Delete
            </button>
        <button className="inspectionButton" onClick={(handleNewInspection)}>
                New Inpection
            </button>
      
    </section>
    </>
    )
}