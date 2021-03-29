import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const MainParachuteContext = createContext()

// This component establishes what data can be used.
export const MainParachuteProvider = (props) => {
    const [mainParachutes, setMainParachutes] = useState([])

    const [mainParachuteId, setMainParachuteId] = useState(0)

    //function to get all main parachutes
    const getMainParachutes = () => {
        return fetch("http://localhost:8088/mainParachutes")
        .then(res => res.json())
        .then(setMainParachutes)
    }
    
    //function to add a main parachutesand return the object of the new main parachute with ID
    const addMainParachute = mainParachuteObj => {
        return fetch("http://localhost:8088/mainParachutes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mainParachuteObj)
        })
        //get the new object back
        .then(res => res.json())
        .then(main => {
            return main.id})
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
    
    //function to edit a mainParachute
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

    //return all of the functions available through InspectionContext
    return (
        <MainParachuteContext.Provider value={{
            mainParachutes, getMainParachutes, addMainParachute, getMainParachuteById, deleteMainParachute, editMainParachute, mainParachuteId
        }}>
            {props.children}
        </MainParachuteContext.Provider>
    )

}