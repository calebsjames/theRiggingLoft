import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const ServiceBulletinContext = createContext()

// This component establishes what data can be used.
export const ServiceBulletinProvider = (props) => {
    const [serviceBulletins, setServiceBulletins] = useState([])

    const [serviceBulletinId, setServiceBulletinId] = useState(0)

    //function to get all main parachutes
    const getServiceBulletins = () => {
        return fetch("http://localhost:8088/serviceBulletins")
        .then(res => res.json())
        .then(setServiceBulletins)
    }
    
    //function to add a main parachutesand return the object of the new main parachute with ID
    const addServiceBulletin = serviceBulletinObj => {
        return fetch("http://localhost:8088/serviceBulletins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceBulletinObj)
        })
        //get the new object back
        .then(res => res.json())
        .then(main => {
            return main.id})
    }

    //function to get serviceBulletin by ID
    const getServiceBulletinById = (id) => {
        return fetch(`http://localhost:8088/serviceBulletins/${id}`)
            .then(res => res.json())
    }

    //function to delete an serviceBulletin
    const deleteServiceBulletin = serviceBulletinId => {
        return fetch(`http://localhost:8088/serviceBulletins/${serviceBulletinId}`, {
            method: "DELETE"
        })
        .then(getServiceBulletins)
    }
    
    //function to edit a serviceBulletin
    const editServiceBulletin = serviceBulletin => {
        return fetch(`http://localhost:8088/serviceBulletins/${serviceBulletin.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(serviceBulletin)
        })
          .then(getServiceBulletins)
      }

    //return all of the functions available through InspectionContext
    return (
        <ServiceBulletinContext.Provider value={{
            serviceBulletins, getServiceBulletins, addServiceBulletin, getServiceBulletinById, deleteServiceBulletin, editServiceBulletin, serviceBulletinId
        }}>
            {props.children}
        </ServiceBulletinContext.Provider>
    )

}