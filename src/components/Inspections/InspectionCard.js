import React from "react"






export const InspectionCard = ({ inspectionInstance }) => {
  
    const customer = inspectionInstance.customerId
    const container = inspectionInstance.containerId
    const reserve = inspectionInstance.reserveId
    const aad = inspectionInstance.aadId
    const mainParachute = inspectionInstance.mainId


    return(<section className="inspectionCard">
        <h3 className="inspection">
          
            { inspectionInstance.id }
          
        </h3>
        <p>{ customer }</p>
        <p>{ container }</p>
        <p>{ reserve }</p>
        <p>{ aad }</p>
        <p>{ mainParachute }</p>
        
      
    </section>
    )
}