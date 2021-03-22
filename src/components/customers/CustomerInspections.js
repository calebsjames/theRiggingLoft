import React, { useContext, useEffect } from "react"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"
import { InspectionCard } from "../Inspections/InspectionCard.js"
import { InspectionContext } from "../Inspections/InspectionProvider"
import { useHistory, useParams } from "react-router-dom"



export const CustomerInspections = () => {
    
    const history = useHistory()

    const { customers, getCustomers, getCustomerById } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspections, getInspections } = useContext(InspectionContext)

    const { customerId } = useParams();

    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [])
  
    const filteredInspections = inspections.filter(insp => 
        parseInt(insp.customerId) === parseInt(customerId))
  
    const handleNewGear = (event) => {
        event.preventDefault();
        sessionStorage.setItem("customerId", customerId);
        history.push("/newreserve")
    }
    
    const customerObject = customers.find(c => parseInt(c.id) === parseInt(customerId))
    console.log(customerObject)
  return (
    <>
    <div className="inspections">
        <h2>{customerObject ? customerObject.name : "No Name"}</h2>
        <button onClick={() => {history.push(`/customers/edit/${customerObject.id}`)}}>Edit</button>
        
        <button onClick={handleNewGear}>New gear and inspection</button>
        <h3>Inspections</h3>
      {filteredInspections.map(inspectionObject => {
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
    </div>
    </>
  )
}
