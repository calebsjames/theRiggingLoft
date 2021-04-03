import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { InspectionContext } from "./InspectionProvider"
import { Accordion, Card } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import "./Inspection.css"

//InspectionCard is called in InspectionList.js and CustomerInspections.js
//This displays basic information about the inspection
export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    const { inspections, getInspections, deleteInspection, patchInspection, addInspection } = useContext(InspectionContext)
    
    const history = useHistory()

    //if user presses "details" button, they will be taken to details page
    const handleDetails = () => {
        history.push(`/inspections/detail/${inspectionInstance.id}`) 
    }


    const date = new Date
    
    const handleNewInspection = () => {
        
        const inspection = {    
            userId: parseInt(sessionStorage.getItem("app_user_id")),
            customerId: parseInt(customerInstance.id),
            date: date.toLocaleDateString(),
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
            mainDBag: false,
            mainLinks: false,
            mainSuspensionLines: false,
            mainBridlePilotchute: false,
            mainCrossports: false,
            mainSeamFabric: false,
            mainSlider: false,
            mainNotes: "",
            aadInstallation: false,
            aadCables: false,
            aadInService: false,
            aadNotes: "",
            
        }
        
        addInspection(inspection)
        // Must check if instance.id exists. Anything with a zero gets deleted.
        .then( insp => {
            let currentInspection = insp
            if (containerInstance?.id)  {
                currentInspection.containerId = parseInt(containerInstance?.id)}
            if (reserveInstance?.id)  {
                currentInspection.reserveId = parseInt(reserveInstance?.id)}
            if (mainParachuteInstance?.id)  {
                currentInspection.mainParachuteId = parseInt(mainParachuteInstance?.id)}
            if (aadInstance?.id)  {
                currentInspection.aadId = parseInt(aadInstance?.id)}
            patchInspection(currentInspection) 
            console.log(currentInspection?.id)
            history.push(`/inspections/detail/${currentInspection?.id}`)
        })
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
        <button className="inspectionButton" onClick={(handleNewInspection)}>
                New Inpection
            </button>
      
    </section>
    {/* <Card>
        <Accordion.Toggle as={Card.Header} eventKey={customerInstance?.id}>
          <div className="customer__name">{customerInstance?.name}</div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={customerInstance?.name}>
          <Card.Body><Button variant="danger" className="friend__removeFriend friends__btn" id={`btn--${customerInstance?.name}`} onClick={handleNewInspection} >New Inspection</Button></Card.Body>
        </Accordion.Collapse>
      </Card> */}
    </>
    )
}