const Modal  = ({isOpen , children , title} )=>{
    if(!isOpen) return null 
    return(
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-bold">
                        {title}
                    </h2>
                    
                </div>
                <div className="mt-4">
                    {children}
                </div>
            
            </div>
        </div>
        
        </>
    )
}
export default Modal
