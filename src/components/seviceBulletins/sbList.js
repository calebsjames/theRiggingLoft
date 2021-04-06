import React, { useContext, useEffect } from "react"
import { ServiceBulletinContext } from "./sbProvider"
import { ServiceBulletinsAside } from "./sbAside"


export const ServiceBulletinAsideList = () => {
    
    // This state changes when `getServiceBulletins()` is invoked below
    const { serviceBulletins, getServiceBulletins } = useContext(ServiceBulletinContext)

    
  
    
    //useEffect - reach out to the world for something
    useEffect(() => {
        getServiceBulletins()
  }, [])


  const serviceBulletinsSorted = serviceBulletins.sort(
    (currentServiceBulletin, nextServiceBulletin) =>
        Date.parse(nextServiceBulletin.date) - Date.parse(currentServiceBulletin.date)
)

  return (
    <>
                
        <article className="containerLeft">
            <h2>Service Bulletins</h2>
            {
                serviceBulletinsSorted.map(serviceBulletinObject => {
                    
                    return <ServiceBulletinsAside key={serviceBulletinObject.id} serviceBulletinInstance={serviceBulletinObject} 
                    />
                })
            }
        </article>
    </>
)
}

