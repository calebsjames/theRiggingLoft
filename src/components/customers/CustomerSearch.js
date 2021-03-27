import React, { useContext } from "react"
import { CustomerContext } from "../customers/CustomerProvider"
import "./Customer.css"


export const CustomerSearch = () => {
  const { setSearchTerms } = useContext(CustomerContext)

  return (
    <> 
      <input type="text"
        className="input--wide search"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Customers... " />
    </>
  )
}