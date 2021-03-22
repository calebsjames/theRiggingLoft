import React, { useContext, useEffect } from "react"
import { InspectionContext } from "./InspectionProvider.js"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"
import "./Inspection.css"
import { useHistory, useParams } from "react-router-dom"



export const InspectionDetails = () => {
    
    const { inspectionId } = useParams()
    const { inspections, getInspections, deleteInspection, editInspection } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)

    useEffect(() => {
        getInspections()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getContainers)
    }, [])

    const history = useHistory()
    
    const inspection = inspections.find(i => parseInt(i.id) === parseInt(inspectionId))
    console.log(inspection)
    const customer = customers.find(c => parseInt(c.id) === parseInt(inspection.customerId))
    const container = containers.find(cont => parseInt(cont.id) === parseInt(inspection.containerId))
    const reserve = reserves.find(r => parseInt(r.id) === parseInt(inspection.reserveId))
    const main = mainParachutes.find(mp => parseInt(mp.id) === parseInt(inspection.mainParachuteId))
    const aad = aads.find(a => parseInt(a.id) === parseInt(inspection.aadId))
  
    const handleDelete = () => {
        deleteInspection(inspection.id)
          .then(getInspections)
          .then(() => {
            history.push("/inspections")
          })
      }
    const handleEdit = () => {
        editInspection(inspection)
          .then(getInspections)
          .then(() => 
            history.push("/inspections")
          )
      }
  
  return (
    <div className="inspections">
      <h2>Inspection for {customer ? customer.name : ""} on {inspection ? inspection.date : ""}</h2>
      
      <div className="inspectionDetails">
          <div className="inspectionDetailsBox">
          <h3>Container</h3>
            <div className="componentDetails">
              <p> {container ? container.manufacturer : ""} {container ? container.model : ""}</p>
              <p><b>Size: </b>{container ? container.size : ""} </p>
              <p>Serial #: {container ? container.serialNumber : ""} </p>
              <p>Color: {container ? container.color : ""} </p>
              <p>DOM: {container ? container.dom : ""} </p>
              <p>Notes: {container ? container.notes : ""} </p>
            </div>
            <div className="inspectionDetails">
              <p>Main tray: {inspection ? inspection.containerMainTray : ""} </p>
            </div>
          </div>
          <div className="inspectionDetailsBox">
          <h3>Reserve</h3>
            <div className="componentDetails">
              <p> {reserve ? reserve.manufacturer : ""} {reserve ? reserve.model : ""} </p>
              <p><b>Size: </b> {reserve ? reserve.size : ""} </p>
              <p>Serial #: {reserve ? reserve.serialNumber : ""} </p>
              <p>Color: {reserve ? reserve.color : ""} </p>
              <p>DOM: {reserve ? reserve.dom : ""} </p>
              <p>Notes: {reserve ? reserve.notes : ""} </p>
            </div>
          </div>
          <div className="inspectionDetailsBox">
          <h3>AAD</h3>
          <div className="componentDetails">
              <p> {aad ? aad.manufacturer : ""} </p>
              <p> {aad ? aad.model : ""} </p>
              <p>Serial #: {aad ? aad.serialNumber : ""} </p>
              <p>Next Service Date: {aad ? aad.nextServiceDate : ""} </p>
              <p>DOM: {aad ? aad.dom : ""} </p>
              <p>Notes: {aad ? aad.notes : ""} </p>
              </div>
          </div>
          <div className="inspectionDetailsBox">
          <h3>Main</h3>
          <div className="componentDetails">
              <p> {main ? main.manufacturer : ""} </p>
              <p> {main ? main.model : ""} </p>
              <p><b>Size: </b> {main ? main.size : ""} </p>
              <p>Serial #: {main ? main.serialNumber : ""} </p>
              <p>Color: {main ? main.color : ""} </p>
              <p>DOM: {main ? main.dom : ""} </p>
              <p>Notes: {main ? main.notes : ""} </p>
            </div>
          </div>
      </div>
      <button onClick={(handleEdit)}>
                Edit
            </button>
         <button onClick={(handleDelete)}>
                Delete
            </button>
    </div>
    
  )
}
