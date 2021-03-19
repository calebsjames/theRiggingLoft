import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { InspectionContext } from "./InspectionProvider"


export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    const history = useHistory()

    const { getInspections, deleteInspection } = useContext(InspectionContext)

    const handleDelete = () => {
        deleteInspection(inspectionInstance.id)
          .then(getInspections)
          .then(() => {
            history.push("/inspections")
          })
      }

    return(<section className="inspectionCard" id={`inspectionId--${inspectionInstance.id}`}>
        <h3 className="inspection">
          
            { customerInstance.name }
            { inspectionInstance.date }
          
        </h3>
        <p>Container: { containerInstance.manufacturer }</p>
        <p>Reserve: { reserveInstance.model }</p>
        <p>AAD: { aadInstance.manufacturer }</p>
        <p>Main: { mainParachuteInstance.model }</p>
        
        <button onClick={(handleDelete)}>
                Delete
            </button>
      
    </section>
    )
}