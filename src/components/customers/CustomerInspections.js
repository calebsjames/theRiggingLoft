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

    const { customers, getCustomers, getCustomerById } = useContext(CustomerContext)
    const { reserves, getReserves, addReserve } = useContext(ReserveContext)
    const { containers, getContainers, addContainer } = useContext(ContainerContext)
    const { aads, getAADs, addAAD } = useContext(AADContext)
    const { mainParachutes, getMainParachutes, addMainParachute } = useContext(MainParachuteContext)
    const { inspections, getInspections, addInspection } = useContext(InspectionContext)
    const { customerId } = useParams();
    
    const [ids, setIds] = useState({
        reserveId: 0,
        aadId: 0,
        containerId: 0,
        mainParachuteId: 0

    })
    // const containerIndex = parseInt(containers.length)
    // const containerId = containers[containerIndex-1].id

    const [inspection, setInspection] = useState({
    
        userId: parseInt(sessionStorage.getItem("app_user_id")),
        customerId: customerId,
        date: new Date,
        containerId: containers.length,
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
        reserveId: 0,
        mainDBag: false,
        mainLinks: false,
        mainSuspensionLines: false,
        mainBridlePilotchute: false,
        mainCrossports: false,
        mainSeamFabric: false,
        mainSlider: false,
        mainNotes: "",
        mainParachuteId: 0,
        aadInstallation: false,
        aadCables: false,
        aadInService: false,
        aadNotes: "",
        aadId: 0,
        
    });

    const [container, setContainer] = useState({
        manufacturer: "",
        model: "",
        size: "",
        serialNumber: "",
        color: "",
        dom: "",
        notes: "",
        userId: parseInt(sessionStorage.getItem("app_user_id"))      
      });
  
   

      const [reserve, setReserve] = useState({
      
        manufacturer: "",
        model: "",
        size: "",
        serialNumber: "",
        color: "",
        dom: "",
        userId: parseInt(sessionStorage.getItem("app_user_id"))
        
      });

      const [aad, setAAD] = useState({
        manufacturer: "",
        model: "",
        serialNumber: "",
        dom: "",
        nextServiceDate: "",
        notes: "",
        userId: parseInt(sessionStorage.getItem("app_user_id"))      
    });

    const [mainParachute, setMainParachute] = useState({
      
        manufacturer: "",
        model: "",
        size: "",
        serialNumber: "",
        color: "",
        dom: "",
        userId: parseInt(sessionStorage.getItem("app_user_id"))
  
  
        
      });

    useEffect(() => {
        getContainers()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getInspections)
    }, [customers])
    
    //filter inpsections down to the chosen customer
    const filteredInspections = inspections.filter(insp => 
        parseInt(insp.customerId) === parseInt(customerId))
  
    //logic for button to add new gear for a chosen customer
    const handleNewGear = (event) => {
        event.preventDefault();
        //BOOOOO!!!!!!
        sessionStorage.setItem("customerId", customerId);
        history.push("/newreserve")
    }

    
    // useEffect(() => {

    //     const newIds = {...ids}
    //     debugger
    //     // const containerIndex = parseInt(containers.length)
    //     // const containerId = containers[containerIndex-1].id
    //     // const reserveIndex = parseInt(reserves.length)
    //     // const reserveId = reserves[reserveIndex-1].id
    //     // const mainParachuteIndex = parseInt(mainParachutes.length)
    //     // const mainParachuteId = mainParachutes[mainParachuteIndex-1].id
    //     // const aadIndex = parseInt(aads.length)
    //     // const aadId = aads[aadIndex-1].id

    //     newIds.containerId = containerId
    //     newIds.reserveId = reserveId
    //     newIds.aadId = aadId
    //     newIds.mainParachuteId = mainParachuteId
    // }, [getContainers])
    
    const handlePlus = (event) => {
    debugger
        event.preventDefault();
        // addContainer(container)
        // addReserve(reserve)
        // addMainParachute(mainParachute)
        // addAAD(aad)
        addInspection(inspection)
        
        

        // const containerIndex = parseInt(containers.length)
        // const containerId = containers[containerIndex-1].id
        // const reserveIndex = parseInt(reserves.length)
        // const reserveId = reserves[reserveIndex-1].id
        // const mainParachuteIndex = parseInt(mainParachutes.length)
        // const mainParachuteId = mainParachutes[mainParachuteIndex-1].id
        // const aadIndex = parseInt(aads.length)
        // const aadId = aads[aadIndex-1].id
        const inspectionIndex = parseInt(inspections.length)
        const inspectionId = inspections[inspectionIndex-1].id
        
        history.push(`/inspections/detail/${inspectionId+1}`)
        
            
            // .then(inspectionObject => {
                //     setNewId(inspectionObject)
                //     console.log(inspectionObject)
                // .then(inspection => {inspectionId = inspection})
                // console.log("!", inspectionId)
                
                // console.log(inspectionObject)
                
    }
    
    const handleNav = () => {

    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //find and return the customer object found in params
    const customerObject = customers.find(c => parseInt(c.id) === parseInt(customerId))
  
    //return this HTML
    return (
    <>
    <div className="inspections">
        <h2>{customerObject ? customerObject.name : "No Name"}</h2>
        <button onClick={() => {history.push(`/customers/edit/${customerObject.id}`)}}>Edit</button>
        
        <button onClick={handleNewGear}>New gear and inspection</button>
        <button onClick={handlePlus}>+</button>
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
