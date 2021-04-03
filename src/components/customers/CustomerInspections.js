import React, { useContext, useEffect, useState } from "react"
import { AADContext } from "../aads/AADProvider"
import { ContainerContext } from "../containers/ContainerProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider"
import { ReserveContext } from "../reserves/ReserveProvider"
import { InspectionCard } from "../Inspections/InspectionCard.js"
import { InspectionContext, InspectionProvider } from "../Inspections/InspectionProvider"
import { useHistory, useParams } from "react-router-dom"


//displays all inspections for a specific customer
export const CustomerInspections = () => {
    
    const history = useHistory()

    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspections, getInspections, addInspection } = useContext(InspectionContext)
    const { customerId } = useParams();
    
    let date = new Date 

    const [inspection, setInspection] = useState({
    
        userId: parseInt(sessionStorage.getItem("app_user_id")),
        customerId: parseInt(customerId),
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
        aadNotes: ""
        
    });


    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [])
    
    //filter inpsections down to the chosen customer
    const filteredInspections = inspections.filter(insp => 
        parseInt(insp.customerId) === parseInt(customerId))
  
    //logic for button to add new gear for a chosen customer
    const handleNewInspection = (event) => {
    
        event.preventDefault();
        addInspection(inspection)
        // .then( insp => {
        //     insp.id = insp
        
        //     history.push(`/inspection/detail/${insp.id}`)
        // })

        const inspectionIndex = parseInt(inspections.length)
        const inspectionId = inspections[inspectionIndex-1].id
        
        history.push(`/inspections/detail/${inspectionId+1}`)
                
    }
    
   
//find and return the customer object found in params
    const customerObject = customers.find(c => parseInt(c.id) === parseInt(customerId))
  
    //return this HTML
    return (
    <>
    <div className="inspections">
        <h2>{customerObject ? customerObject.name : "No Name"}</h2>
        <button onClick={() => {history.push(`/customers/edit/${customerObject.id}`)}}>Edit</button>
        
        <button onClick={handleNewInspection}>New inspection</button>
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
