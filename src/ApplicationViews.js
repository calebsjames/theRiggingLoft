import React from "react"
import { Route } from "react-router-dom"
import { AADForm } from "./components/aads/AADForm"
import { AADProvider } from "./components/aads/AADProvider"
import { ContainerForm } from "./components/containers/ContainerForm"
import { ContainerProvider } from "./components/containers/ContainerProvider"
import { CustomerForm } from "./components/customers/CustomerForm"
import { CustomerInspections } from "./components/customers/CustomerInspections"
import { CustomerList } from "./components/customers/CustomerList"
import { CustomerProvider } from "./components/customers/CustomerProvider"
import { Home } from "./components/Home"
import { InspectionDetails } from "./components/Inspections/InspectionDetails"
import { InspectionForm } from "./components/Inspections/InspectionForm"
import { InspectionList } from "./components/Inspections/InspectionList"
import { InspectionListHome } from "./components/Inspections/InspectionListHome"
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
                                            <InspectionListHome />
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

            <Route exact path="/customers/detail/:customerId(\d+)">
            <CustomerProvider>
                        <ContainerProvider>
                            <AADProvider>
                                <ReserveProvider>
                                    <MainParachuteProvider>
                                        <InspectionProvider>
                                            <CustomerInspections />
                                        </InspectionProvider>
                                    </MainParachuteProvider>
                                </ReserveProvider>
                            </AADProvider>
                        </ContainerProvider>
                    </CustomerProvider>
            </Route>

            <CustomerProvider>
                <Route exact path="/newcustomer">
                    <CustomerForm />
                </Route>

                <ContainerProvider>
                    <InspectionProvider>
                        <Route exact path="/newcontainer">
                            <ContainerForm />
                        </Route>
                    </InspectionProvider>    
                </ContainerProvider>
            </CustomerProvider>

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
                        <ContainerProvider>
                            <ReserveProvider>
                                <AADProvider>
                                    <MainParachuteProvider>
                                        <InspectionProvider>
                                            <InspectionForm />
                                        </InspectionProvider>    
                                    </MainParachuteProvider>
                                </AADProvider>
                            </ReserveProvider>
                        </ContainerProvider>                  
                </CustomerProvider>
            </Route>

            <Route exact path="/inspections">
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

                <Route exact path="/inspections/detail/:inspectionId(\d+)">
                    <CustomerProvider>
                        <ContainerProvider>
                            <AADProvider>
                                <ReserveProvider>
                                    <MainParachuteProvider>
                                        <InspectionProvider>
                                            <InspectionDetails />
                                        </InspectionProvider>
                                    </MainParachuteProvider>
                                </ReserveProvider>
                            </AADProvider>
                        </ContainerProvider>
                    </CustomerProvider>
            </Route>

            <Route exact path="/customers/edit/:customerId(\d+)">
                <CustomerProvider>
                    <CustomerForm />
                </CustomerProvider>
            </Route>

            <Route exact path="/container/edit/:containerId(\d+)">
                <ContainerProvider>
                    <ContainerForm />
                </ContainerProvider>
            </Route>

            <Route exact path="/reserve/edit/:reserveId(\d+)">
                <ReserveProvider>
                    <ReserveForm />
                </ReserveProvider>
            </Route>

            <Route exact path="/aad/edit/:aadId(\d+)">
                <AADProvider>
                    <AADForm />
                </AADProvider>
            </Route>

            <Route exact path="/mainparachute/edit/:mainParachuteId(\d+)">
                <MainParachuteProvider>
                    <MainParachuteForm />
                </MainParachuteProvider>
            </Route>
        </>
    )
}