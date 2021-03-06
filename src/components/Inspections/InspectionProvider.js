import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const InspectionContext = createContext()
// This component establishes what data can be used.
export const InspectionProvider = (props) => {
    const [inspections, setInspections] = useState([])
    const [newInspectionId, setNewInspectionId] = useState(0)
    
    //function to get all inspections
    const getInspections = () => {
        return fetch("https://theriggingloft-api.herokuapp.com/inspections")
        .then(res => res.json())
        .then(setInspections)
    }
    
    //function to add an inspection
    const addInspection = inspectionObj => {
        return fetch("https://theriggingloft-api.herokuapp.com/inspections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inspectionObj)
        })
        .then(response => response.json())
    }
  




    //function to get inspection by ID
    const getInspectionById = (id) => {
        return fetch(`https://theriggingloft-api.herokuapp.com/inspections/${id}`)
            .then(res => res.json())
    }

    //function to delete an inspection
    const deleteInspection = inspectionId => {
        return fetch(`https://theriggingloft-api.herokuapp.com/inspections/${inspectionId}`, {
            method: "DELETE"
        })
            .then(getInspections)
    }

    //function to edit an inspection
    const editInspection = inspection => {
        return fetch(`https://theriggingloft-api.herokuapp.com/inspections/${inspection.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inspection)
        })
          .then(getInspections)
      }
    //function to edit an inspection
    const patchInspection = inspection => {
        return fetch(`https://theriggingloft-api.herokuapp.com/inspections/${inspection.id}`, {
          method: "PATCH",
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
            inspections, patchInspection, getInspections, newInspectionId, addInspection, getInspectionById, deleteInspection, editInspection
        }}>
            {props.children}
        </InspectionContext.Provider>
    )

}