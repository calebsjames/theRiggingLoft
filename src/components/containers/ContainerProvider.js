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

    const addContainer = containerObj => {
        return fetch("http://localhost:8088/containers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(containerObj)
        })
        .then(res => res.json())
        .then(containerObject => {
            setContainerId(containerObject.id)
            sessionStorage.setItem("ContainerId", containerObject.id)
        })
        .then(getContainers)
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

    /*
        You return a context provider which has the
        `containers` state, `getContainers` function,
        and the `addContainer` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ContainerContext.Provider value={{
            containers, getContainers, addContainer, getContainerById, deleteContainer, editContainer, containerId
        }}>
            {props.children}
        </ContainerContext.Provider>
    )

}