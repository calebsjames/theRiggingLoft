import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { InspectionContext } from "./InspectionProvider";
import "./Inspection.css"
import { CustomerContext } from "../customers/CustomerProvider";
import { ReserveContext } from "../reserves/ReserveProvider";
import { ContainerContext } from "../containers/ContainerProvider";
import { AADContext } from "../aads/AADProvider";
import { MainParachuteContext } from "../mainparachutes/MainParachuteProvider";


//InspectionForm called to make a new inspection or edit an existing one
export const InspectionNew = () => {
    const { addInspection, inspections, getInspections, getInspectionById, editInspection, deleteInspection } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const { reserves, getReserves } = useContext(ReserveContext)
    const { containers, getContainers } = useContext(ContainerContext)
    const { aads, getAADs } = useContext(AADContext)
    const { mainParachutes, getMainParachutes } = useContext(MainParachuteContext)
    const { inspectionId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory()

    useEffect(() => {
        getInspections()
        .then(getCustomers)
        .then(getReserves)
        .then(getAADs)
        .then(getMainParachutes)
        .then(getContainers)
    }, [])

    
    //useState to return correct objects based on whether user is saving new equipment or editing
    // const [components, setComponents] = useState({
    //     container: {},
    //     aad: {},
    //     reserve: {},
    //     mainParachute: {},
    //     customer: {}
    // })
    
    //useEffect to house if() statement that sets components object based on URL    
    // useEffect(() => {
        
    //     if(inspectionId) {
    //         const newComponents = { ...components }
            
    //         //logic that runs if it's an edit
    //         const currentInspection = inspections.find(insp => parseInt(insp.id) === parseInt(inspectionId))
    //         const customer = customers.find(c => parseInt(c.id) === parseInt(currentInspection.customerId))
    //         const container = containers.find(cont => parseInt(cont.id) === parseInt(currentInspection.containerId))
    //         const reserve = reserves.find(c => parseInt(c.id) === parseInt(currentInspection.reserveId))
    //         const aad = aads.find(c => parseInt(c.id) === parseInt(currentInspection.aadId))
    //         const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(currentInspection.mainParachuteId))
            
    //         newComponents.container = container
    //         newComponents.reserve = reserve
    //         newComponents.aad = aad
    //         newComponents.mainParachute = mainParachute
    //         newComponents.customer = customer
    //         setComponents(newComponents)    
            
    //     } else {
    //         const newComponents = { ...components }
            
    //         //logic that runs if it's a new form
    //         const customer = customers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("customerId")))
    //         const container = containers.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("containerId")))
    //         const reserve = reserves.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("reserveId")))
    //         const aad = aads.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("aadId")))
    //         const mainParachute = mainParachutes.find(c => parseInt(c.id) === parseInt(sessionStorage.getItem("mainParachuteId")))
            
    //         newComponents.container = container
    //         newComponents.reserve = reserve
    //         newComponents.aad = aad
    //         newComponents.mainParachute = mainParachute
    //         newComponents.customer = customer
            
    //         setComponents(newComponents)  
    //     }  
    //     //runs after getContainers updates containers
    // }, [containers])
    
    
    //Define the intial state of the form inputs with useState()
    const [inspection, setInspection] = useState({
        
        userId: parseInt(sessionStorage.getItem("app_user_id")),
        customerId: parseInt(sessionStorage.getItem("customerId")),
        date: new Date,
        containerId: parseInt(sessionStorage.getItem("containerId")),
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
        reserveId: parseInt(sessionStorage.getItem("reserveId")),
        mainDBag: false,
        mainLinks: false,
        mainSuspensionLines: false,
        mainBridlePilotchute: false,
        mainCrossports: false,
        mainSeamFabric: false,
        mainSlider: false,
        mainNotes: "",
        mainParachuteId: parseInt(sessionStorage.getItem("mainParachuteId")),
        aadInstallation: false,
        aadCables: false,
        aadInService: false,
        aadNotes: "",
        aadId: parseInt(sessionStorage.getItem("aadId")),
        
    });
        
    const newInspection = { ...inspection }
    setInspection(newInspection)
    addInspection(inspection)
    .then(() => history.push("/home"))
    
    



}