import React, { useContext, useEffect } from "react"
import { InspectionContext } from "./InspectionProvider.js"
import { InspectionCard } from "./InspectionCard.js"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"
import "./Inspection.css"
import Accordion from "react-bootstrap/Accordion"



export const InspectionList = () => {

    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspections, getInspections } = useContext(InspectionContext)
    
    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [])
    
    //gets inspections that are specific to the logged in user
    const userInspections = inspections.filter(insp => parseInt(insp.userId) === parseInt(sessionStorage.getItem("app_user_id")))
    //returns inspection entries sorted by date
    
    //sort inspections by date
    const inspectionsSorted = userInspections.sort(
        (nextInspection, currentInspection) =>
            Date.parse(currentInspection.date) - Date.parse(nextInspection.date)
      )
      
    

    return (
    <>
    <div className="inspections">
    <Accordion defaultActiveKey="0">
      {inspectionsSorted.map(inspectionObject => {
          const customer = customers.find(c => parseInt(c.id) === parseInt(inspectionObject.customerId))
          const container = containers.find(cont => parseInt(cont.id) === parseInt(inspectionObject.containerId))
          const reserve = reserves.find(r => parseInt(r.id) === parseInt(inspectionObject.reserveId))
          const main = mainParachutes.find(mp => parseInt(mp.id) === parseInt(inspectionObject.mainParachuteId))
          const aad = aads.find(a => parseInt(a.id) === parseInt(inspectionObject.aadId))
            
          return <InspectionCard key={inspectionObject.id} 
          inspectionInstance={inspectionObject} 
          customerInstance={customer}
          containerInstance={container}
          reserveInstance={reserve}
          mainParachuteInstance={main}
          aadInstance={aad}
          />
        })
    }
     </Accordion>
    </div>
    </>
  )
}
