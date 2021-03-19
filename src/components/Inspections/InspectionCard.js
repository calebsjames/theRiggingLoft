import React, { useContext, useEffect } from "react"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"






export const InspectionCard = ({ inspectionInstance, customerInstance }) => {
    
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
    }, [])
    
    
    // debugger
    // const customer = customers.find(c => parseInt(c.id) === parseInt(inspectionInstance.customerId))
    // console.log(customer)
    const container = inspectionInstance.containerId
    const reserve = inspectionInstance.reserveId
    const aad = inspectionInstance.aadId
    const main = inspectionInstance.mainParachuteId
    const customer = inspectionInstance.containerId

  
    console.log("customerInstance!", customerInstance.name)

    return(<section className="inspectionCard">
        <h3 className="inspection">
          
            { customerInstance.name }
          
        </h3>
        <p>Cutomer Id: { customer }</p>
        <p>Container Id: { container }</p>
        <p>Reserve Id: { reserve }</p>
        <p>AAD Id: { aad }</p>
        <p>Main Id: { main }</p>
        
      
    </section>
    )
}