import React, { useContext, useEffect } from "react"
import { InspectionContext } from "./InspectionProvider.js"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"
import "./Inspection.css"
import { useParams } from "react-router-dom"



export const InspectionDetails = () => {
    
    const { inspections, getInspections } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)

    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [])
  
    
    debugger
    const { inspectionId } = useParams()
    const inspection = inspections.find(i => parseInt(i.id) === parseInt(inspectionId))
    const customer = customers.find(c => parseInt(c.id) === parseInt(inspection.customerId))
    const container = containers.find(cont => parseInt(cont.id) === parseInt(inspection.containerId))
    const reserve = reserves.find(r => parseInt(r.id) === parseInt(inspection.reserveId))
    const main = mainParachutes.find(mp => parseInt(mp.id) === parseInt(inspection.mainParachuteId))
    const aad = aads.find(a => parseInt(a.id) === parseInt(inspection.aadId))
  
    console.log(customer)
  
  return (<>
    <div className="inspections">
      <h1>!!!!!</h1>
    </div>
    </>
  )
}
