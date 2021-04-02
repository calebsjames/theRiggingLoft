import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const ContainerContext = createContext()

// This component establishes what data can be used.
export const ContainerProvider = (props) => {
    const [containers, setContainers] = useState([])

    const [containerId, setContainerId] = useState(0)

    const getContainers = () => {
        return fetch("http://localhost:8088/containers")
        .then(res => res.json())
        .then(setContainers)
    }

    //function to add container and return the object of the new container with ID
    const addContainer = containerObj => {
        return fetch("http://localhost:8088/containers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(containerObj)
        })
        //get the new object back
        .then(res => res.json())
        .then(cont => {
            return cont.id})
        
    }

    //function to get container by ID
    const getContainerById = (id) => {
        return fetch(`http://localhost:8088/containers/${id}`)
            .then(res => res.json())
    }

    //function to delete an container
    const deleteContainer = containerId => {
        return fetch(`http://localhost:8088/containers/${containerId}`, {
            method: "DELETE"
        })
            .then(getContainers)
    }

    //function to edit an container
    const editContainer = container => {
        return fetch(`http://localhost:8088/containers/${container.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(container)
        })
          .then(getContainers)
      }

    //make all of the functions available through ContainerContext
    return (
        <ContainerContext.Provider value={{
            containers, getContainers, addContainer, getContainerById, deleteContainer, editContainer, containerId
        }}>
            {props.children}
        </ContainerContext.Provider>
    )

}