import React, { useContext, useEffect } from "react"
import { InspectionContext } from "./InspectionProvider.js"
import { InspectionCard } from "./InspectionCard.js"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"



export const InspectionList = () => {

    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachute, getMainParachutes } = useContext(MainParachuteContext)

    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [])
  
  // This state changes when `getInspections()` is invoked below
  const { inspections, getInspections } = useContext(InspectionContext)
 

  return (
    <>
    <div className="inspections">
      {inspections.map(inspectionObject => {
          const customer = customers.find(c => parseInt(c.id) === parseInt(inspectionObject.customerId))

          return <InspectionCard key={inspectionObject.id} 
          inspectionInstance={inspectionObject} 
          customerInstance={customer}
          />
        })
    }
    </div>
    </>
  )
}
