import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const MainParachuteContext = createContext()

// This component establishes what data can be used.
export const MainParachuteProvider = (props) => {
    const [mainParachutes, setMainParachutes] = useState([])

    const getMainParachutes = () => {
        return fetch("http://localhost:8088/mainParachutes")
        .then(res => res.json())
        .then(setMainParachutes)
    }

    const addMainParachute = mainParachuteObj => {
        return fetch("http://localhost:8088/mainParachutes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mainParachuteObj)
        })
        .then(getMainParachutes)
    }

    //function to get mainParachute by ID
    const getMainParachuteById = (id) => {
        return fetch(`http://localhost:8088/mainParachutes/${id}`)
            .then(res => res.json())
    }

    //function to delete an mainParachute
    const deleteMainParachute = mainParachuteId => {
        return fetch(`http://localhost:8088/mainParachutes/${mainParachuteId}`, {
            method: "DELETE"
        })
            .then(getMainParachutes)
    }

    const editMainParachute = mainParachute => {
        return fetch(`http://localhost:8088/mainParachutes/${mainParachute.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mainParachute)
        })
          .then(getMainParachutes)
      }

    /*
        You return a context provider which has the
        `mainParachutes` state, `getMainParachutes` function,
        and the `addMainParachute` function as keys. This
        allows any child elements to access them.
    */
    return (
        <MainParachuteContext.Provider value={{
            mainParachutes, getMainParachutes, addMainParachute, getMainParachuteById, deleteMainParachute, editMainParachute
        }}>
            {props.children}
        </MainParachuteContext.Provider>
    )

}