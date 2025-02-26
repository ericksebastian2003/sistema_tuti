import { Link, Outlet, useLocation } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const Dashboard = () =>{
    const location = useLocation()
    const urlActual = location.pathname
    const {auth} = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')
    return(
        <>
        <div className="md:flex md:min-h-screen">
            <h2 className="text-4xl font-black text-center text-black">
                SISTEMA - GESTIÓN
            </h2>
            <img src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
            <p className="text-slate-100 text-center my-4 text-sm">
                <span className="bg-green-600 mx-2 2-3 h-3 inline-block rounded-full"></span>Bienvenido - {auth?.nombre}
            </p>
            <hr className="mt-5 border-slate-400"/>
            <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/clientes' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/ordenes' className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Crear</Link>
                    </li>
                
            </ul>
            </div>
            <div className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
                <div className="bg-gray-600  py-2 flex md:justify-end items-center gap-5 justify-center">
                    <div className="text-md font-semibold text-slate-100">
                        Bienvenido - {auth?.nombre}
                    </div>
                    <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />

                    </div>
                    <div>
                        <Link to ="/" classNamee="text-white md-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg" onClick={()=> localStorage.removeItem('token')}>Salir</Link>
                    
                    </div>
                    <div className="overflow-y-scroll p-8">
                        {autenticado ? <Outlet/> : <Navigate to = "/login" />}
                    </div>
                   
                </div>
        </div>
        
        
        </>
    )
}
export default Dashboard