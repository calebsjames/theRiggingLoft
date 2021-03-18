import React from "react"
import { Route } from "react-router-dom"
import { AADProvider } from "./components/aads/AADProvider"
import { ContainerProvider } from "./components/containers/ContainerProvider"
import { CustomerForm } from "./components/customers/CustomerForm"
import { CustomerList } from "./components/customers/CustomerList"
import { CustomerProvider } from "./components/customers/CustomerProvider"
import { Home } from "./components/Home"
import { InspectionProvider } from "./components/Inspections/InspectionProvider"
import { MainParachuteProvider } from "./components/mainparachutes/MainParachuteProvider"




export const ApplicationViews = () => {
    return (
        <>
            {/* Render the home page */}
            
                <Route path="/">
                    <Home />
                    
                </Route>
            

            <Route exact path="/customers">
                <ContainerProvider>
                        <InspectionProvider>
                            <CustomerProvider>
                                <CustomerList />
                            </CustomerProvider>
                        </InspectionProvider>        
                </ContainerProvider>  
            </Route>

            <Route exact path="/newcustomer">
                
                    <CustomerProvider>
                        <CustomerForm />
                    </CustomerProvider>
                   
            </Route>

            

            
        </>
    )
}