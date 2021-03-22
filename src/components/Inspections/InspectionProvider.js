import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const InspectionContext = createContext()

// This component establishes what data can be used.
export const InspectionProvider = (props) => {
    const [inspections, setInspections] = useState([])

    const getInspections = () => {
        return fetch("http://localhost:8088/inspections")
        .then(res => res.json())
        .then(setInspections)
    }

    const addInspection = inspectionObj => {
        return fetch("http://localhost:8088/inspections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inspectionObj)
        })
        .then(getInspections)
    }

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

    /*
        You return a context provider which has the
        `inspections` state, `getInspections` function,
        and the `addInspection` function as keys. This
        allows any child elements to access them.
    */
    return (
        <InspectionContext.Provider value={{
            inspections, getInspections, addInspection, getInspectionById, deleteInspection, editInspection
        }}>
            {props.children}
        </InspectionContext.Provider>
    )

}