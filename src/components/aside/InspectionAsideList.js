import React, { useContext, useEffect } from "react"
import { CustomerContext } from "../customers/CustomerProvider"
import { InspectionContext } from "../Inspections/InspectionProvider"
import { InspectionsAside } from "./InspectionsAside"
import "./home.css"

export const InspectionAsideList = () => {
    
    // This state changes when `getInspections()` is invoked below
    const { inspections, getInspections } = useContext(InspectionContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    
  
    
    //useEffect - reach out to the world for something
    useEffect(() => {
        getCustomers()
        .then(getInspections)

  }, [])

  const userInspections = inspections.filter(insp => parseInt(insp.userId) === parseInt(sessionStorage.getItem("app_user_id")))

  const inspectionsSorted = userInspections.sort(
    (currentInspection, nextInspection) =>
        Date.parse(currentInspection.date) - Date.parse(nextInspection.date)
)

  return (
    <>         
        <article className="containerLeft">
            <h2>Previous Repacks</h2>
            {
                inspectionsSorted.map(inspectionObject => {
                    const thisCustomer = customers.find(own => own.id === inspectionObject.customerId)
                    return <InspectionsAside key={inspectionObject.id} inspectionInstance={inspectionObject} 
                    customer = {thisCustomer}
                    />
                })
            }
        </article>
    </>
)
}

