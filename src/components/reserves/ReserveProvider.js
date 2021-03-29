import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const ReserveContext = createContext()

// This component establishes what data can be used.
export const ReserveProvider = (props) => {
    const [reserves, setReserves] = useState([])
    const [reserveId, setReserveId] = useState(0)

    //function to get all reserves
    const getReserves = () => {
        return fetch("http://localhost:8088/reserves")
        .then(res => res.json())
        .then(setReserves)
    }
    
    //function to add a reserve
    const addReserve = reserveObj => {
        return fetch("http://localhost:8088/reserves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserveObj)
        })
        //get the new object back
        .then(res => res.json())
        //set useState variable to new object
        // .then(reserveObject => {
        //     setReserveId(reserveObject.id)
        //     //put the item id in session storage
            
        // })
        // .then(getReserves)
        .then(res => {
            console.log(res.id)
            return res.id})
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
    
    //function to edit an reserve
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

    //return all of the functions available through InspectionContext
    return (
        <ReserveContext.Provider value={{
            reserves, getReserves, addReserve, getReserveById, deleteReserve, editReserve, reserveId
        }}>
            {props.children}
        </ReserveContext.Provider>
    )

}