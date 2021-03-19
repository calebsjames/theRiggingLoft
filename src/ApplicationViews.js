import React from "react"
import { Route } from "react-router-dom"
import { AADForm } from "./components/aads/AADForm"
import { AADProvider } from "./components/aads/AADProvider"
import { ContainerForm } from "./components/containers/ContainerForm"
import { ContainerProvider } from "./components/containers/ContainerProvider"
import { CustomerForm } from "./components/customers/CustomerForm"
import { CustomerList } from "./components/customers/CustomerList"
import { CustomerProvider } from "./components/customers/CustomerProvider"
import { Home } from "./components/Home"
import { InspectionForm } from "./components/Inspections/InspectionForm"
import { InspectionList } from "./components/Inspections/InspectionList"
import { InspectionProvider } from "./components/Inspections/InspectionProvider"
import { MainParachuteForm } from "./components/mainparachutes/MainParachuteForm"
import { MainParachuteProvider } from "./components/mainparachutes/MainParachuteProvider"
import { ReserveForm } from "./components/reserves/ReserveForm"
import { ReserveProvider } from "./components/reserves/ReserveProvider"




export const ApplicationViews = () => {
    return (
        <>
            {/* Render the home page */}
            
                <Route path="/">
                    <InspectionProvider>
                        

                    </InspectionProvider>
                </Route>
                
                <Route exact path="/home">
                    <CustomerProvider>
                        <ContainerProvider>
                            <AADProvider>
                                <ReserveProvider>
                                    <MainParachuteProvider>
                                        <InspectionProvider>
                                            <InspectionList />
                                        </InspectionProvider>
                                    </MainParachuteProvider>
                                </ReserveProvider>
                            </AADProvider>
                        </ContainerProvider>
                    </CustomerProvider>
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

            <Route exact path="/newcontainer">
                <CustomerProvider>
                    
                        <ContainerProvider>
                            <InspectionProvider>
                                <ContainerForm />
                            </InspectionProvider>    
                        </ContainerProvider>
                    
                </CustomerProvider>
            </Route>

            <Route exact path="/newreserve">
                <CustomerProvider>
                    
                        <ReserveProvider>
                            <InspectionProvider>
                                <ReserveForm />
                            </InspectionProvider>    
                        </ReserveProvider>
                    
                </CustomerProvider>
            </Route>

            <Route exact path="/newaad">
                <CustomerProvider>
                    
                        <AADProvider>
                            <InspectionProvider>
                                <AADForm />
                            </InspectionProvider>    
                        </AADProvider>
                    
                </CustomerProvider>
            </Route>

            <Route exact path="/newmainparachute">
                <CustomerProvider>
                    
                        <MainParachuteProvider>
                            <InspectionProvider>
                                <MainParachuteForm />
                            </InspectionProvider>    
                        </MainParachuteProvider>
                    
                </CustomerProvider>
            </Route>
            
            <Route exact path="/newinspection">
                <CustomerProvider>
                    
                        <MainParachuteProvider>
                            <InspectionProvider>
                                <InspectionForm />
                            </InspectionProvider>    
                        </MainParachuteProvider>
                    
                </CustomerProvider>
            </Route>

            
        </>
    )
}