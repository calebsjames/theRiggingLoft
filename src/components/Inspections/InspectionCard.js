import React, { useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { InspectionContext } from "./InspectionProvider"
import "./Inspection.css"

export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    const history = useHistory()

    const { getInspections, deleteInspection } = useContext(InspectionContext)

    const handleDetails = () => {
        history.push(`/inspection/detail/${inspectionInstance.id}`) 
    }
    const { inspectionId } = useParams()

    const handleDelete = () => {
        deleteInspection(inspectionInstance.id)
          .then(getInspections)
          .then(() => {
            history.push("/inspections")
          })
      }

    const handleNewInspection = () => {
        sessionStorage.setItem("customerId", customerInstance.id)
        sessionStorage.setItem("containerId", containerInstance.id)
        sessionStorage.setItem("reserveId", reserveInstance.id)
        sessionStorage.setItem("mainParachuteId", mainParachuteInstance.id)
        sessionStorage.setItem("aadId", aadInstance.id)
        history.push("/newinspection")
    }

    return(<section className="inspectionCard" id={`inspectionId--${inspectionInstance.id}`}>
        <h3 className="inspection">
            { inspectionInstance.date }
        </h3>
        <p>Container: { containerInstance.manufacturer }</p>
        <p>Reserve: { reserveInstance.model }</p>
        <p>AAD: { aadInstance.manufacturer }</p>
        <p>Main: { mainParachuteInstance.model }</p>
        
        <button onClick={(handleDetails)}>
                Details
            </button>
        <button onClick={(handleDelete)}>
                Delete
            </button>
        <button onClick={(handleNewInspection)}>
                New Inpection
            </button>
      
    </section>
    )
}