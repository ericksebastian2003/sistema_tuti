import { NavLink } from "react-router-dom"

export function MenuBar(){ 

    return(
        <nav className="bg-sky-800 font-bold w-60 h-350" >
            <ul>
             <li className="text-white hover:text-sky-300">
                <NavLink to ="clientes" >Clientes</NavLink>

             </li>
             <li className="text-white">
                <NavLink to ="productos" >Productos</NavLink>

             </li>
             <li className="text-white">
                <NavLink to ="pedidos" >Pedidos</NavLink>

             </li>
             <li className="text-white">
                <NavLink to ="salir" >Salir</NavLink>
             </li>
             </ul>
        </nav>
    )

}