import React, { useContext } from "react"
import { CustomerContext } from "../customers/CustomerProvider"


export const CustomerSearch = () => {
  const { setSearchTerms } = useContext(CustomerContext)

  return (
    <>
      Customer search: 
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Customers... " />
    </>
  )
}