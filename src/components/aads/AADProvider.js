import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const AADContext = createContext()

// This component establishes what data can be used.
export const AADProvider = (props) => {
    const [aads, setAADs] = useState([])

    const getAADs = () => {
        return fetch("http://localhost:8088/aads")
        .then(res => res.json())
        .then(setAADs)
    }

    const addAAD = aadObj => {
        return fetch("http://localhost:8088/aads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aadObj)
        })
        .then(getAADs)
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

    /*
        You return a context provider which has the
        `aads` state, `getAADs` function,
        and the `addAAD` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AADContext.Provider value={{
            aads, getAADs, addAAD, getAADById, deleteAAD, editAAD
        }}>
            {props.children}
        </AADContext.Provider>
    )

}