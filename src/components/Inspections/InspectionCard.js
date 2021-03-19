import React from "react"







export const InspectionCard = ({ inspectionInstance, customerInstance, containerInstance, reserveInstance, mainParachuteInstance, aadInstance }) => {

    return(<section className="inspectionCard" id={`inspectionId--${inspectionInstance.id}`}>
        <h3 className="inspection">
          
            { customerInstance.name }
            { inspectionInstance.date }
          
        </h3>
        <p>Container: { containerInstance.manufacturer }</p>
        <p>Reserve: { reserveInstance.model }</p>
        <p>AAD: { aadInstance.manufacturer }</p>
        <p>Main: { mainParachuteInstance.model }</p>
        
      
    </section>
    )
}