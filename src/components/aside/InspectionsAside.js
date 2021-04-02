//to be displayed in asside
export const InspectionsAside = ({inspectionInstance, customer}) => (
       
    <div className="inspection" id={`inspection--${inspectionInstance?.id}`}>{inspectionInstance?.date} {customer?.name}
    </div> 
    
)
