import React, { useContext, useEffect } from "react"
import { InspectionContext } from "./InspectionProvider.js"
import { InspectionCard } from "./InspectionCard.js"

export const InspectionList = () => {
  
  // This state changes when `getInspections()` is invoked below
  const { inspections, getInspections } = useContext(InspectionContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getInspections()
   
  }, [])

  return (
    <>
    <div className="inspections">
      {inspections.map(inspectionObject => {
          return <InspectionCard key={inspectionObject.id} 
          inspectionInstance={inspectionObject} 
          />
        })
    }
    </div>
    </>
  )
}
