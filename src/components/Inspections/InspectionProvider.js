import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const InspectionContext = createContext()
// This component establishes what data can be used.
export const InspectionProvider = (props) => {
    const inspectionObject = {}
    const [inspections, setInspections] = useState([])
    const [inspectionId, setInspectionId] = useState(0)
    let inspId = 0
    const currentId = (id) => {
        inspId = inspectionObject.id
    }
    //function to get all inspections
    const getInspections = () => {
        return fetch("http://localhost:8088/inspections")
        .then(res => res.json())
        .then(setInspections)
    }
    
    //function to add an inspection
    const addInspection = inspectionObj => {
        return fetch("http://localhost:8088/inspections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inspectionObj)
        })
    .then(response => response.json())

        .then(inspectionObject => {
            currentId(inspectionObject.id)

            //put the item id in session storage
        //     // sessionStorage.setItem("customerId", customerObject.id)
        // })
        // .then(getInspections)
    })}
    

    //function to get inspection by ID
    const getInspectionById = (id) => {
        return fetch(`http://localhost:8088/inspections/${id}/?_expand=aad&_expand=reserve&_expand=container&_expand=mainParachute`)
            .then(res => res.json())
    }

    //function to delete an inspection
    const deleteInspection = inspectionId => {
        return fetch(`http://localhost:8088/inspections/${inspectionId}`, {
            method: "DELETE"
        })
            .then(getInspections)
    }

    //function to edit an inspection
    const editInspection = inspection => {
        return fetch(`http://localhost:8088/inspections/${inspection.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inspection)
        })
          .then(getInspections)
      }

    
    //make all of the functions available through InspectionContext
    return (
        <InspectionContext.Provider value={{
            inspections, getInspections, currentId, inspectionId, addInspection, getInspectionById, deleteInspection, editInspection
        }}>
            {props.children}
        </InspectionContext.Provider>
    )

}