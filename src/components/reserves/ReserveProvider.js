import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const ReserveContext = createContext()

// This component establishes what data can be used.
export const ReserveProvider = (props) => {
    const [reserves, setReserves] = useState([])

    const [reserveId, setReserveId] = useState(0)

    const getReserves = () => {
        return fetch("http://localhost:8088/reserves")
        .then(res => res.json())
        .then(setReserves)
    }

    const addReserve = reserveObj => {
        return fetch("http://localhost:8088/reserves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserveObj)
        })
        .then(res => res.json())
        .then(reserveObject => {
            setReserveId(reserveObject.id)
            sessionStorage.setItem("reserveId", reserveObject.id)
        })
        .then(getReserves)
    }

    //function to get reserve by ID
    const getReserveById = (id) => {
        return fetch(`http://localhost:8088/reserves/${id}`)
            .then(res => res.json())
    }

    //function to delete an reserve
    const deleteReserve = reserveId => {
        return fetch(`http://localhost:8088/reserves/${reserveId}`, {
            method: "DELETE"
        })
            .then(getReserves)
    }

    const editReserve = reserve => {
        return fetch(`http://localhost:8088/reserves/${reserve.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reserve)
        })
          .then(getReserves)
      }

  
    return (
        <ReserveContext.Provider value={{
            reserves, getReserves, addReserve, getReserveById, deleteReserve, editReserve, reserveId
        }}>
            {props.children}
        </ReserveContext.Provider>
    )

}