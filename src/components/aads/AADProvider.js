import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const AADContext = createContext()

// This component establishes what data can be used.
export const AADProvider = (props) => {
    const [aads, setAADs] = useState([])
    const [aadId, setAADId] = useState(0)

    //get all aads
    const getAADs = () => {
        return fetch("http://localhost:8088/aads")
        .then(res => res.json())
        .then(setAADs)
    }

    //function to add aad and return the object of the new aad with ID
    const addAAD = aadObj => {
        return fetch("http://localhost:8088/aads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aadObj)
        })
        //get the new object back
        .then(res => res.json())
        //set useState variable to new object
        // .then(aadObject => {
        //     setAADId(aadObject.id)

        // })
        // .then(getAADs)
        .then(aad => {
            console.log(aad.id)
            return aad.id})
    }

    //function to get aad by ID
    const getAADById = (id) => {
        return fetch(`http://localhost:8088/aads/${id}`)
            .then(res => res.json())
    }

    //function to delete an aad
    const deleteAAD = aadId => {
        return fetch(`http://localhost:8088/aads/${aadId}`, {
            method: "DELETE"
        })
        .then(getAADs)
    }
    
    //function to edit an aad
    const editAAD = aad => {
        return fetch(`http://localhost:8088/aads/${aad.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(aad)
        })
          .then(getAADs)
      }

       //make all of the functions available through AADContext
    return (
        <AADContext.Provider value={{
            aads, getAADs, addAAD, getAADById, deleteAAD, editAAD, aadId
        }}>
            {props.children}
        </AADContext.Provider>
    )

}