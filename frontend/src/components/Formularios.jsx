import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthProvider"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "./Modals";

export const FormularioCliente = ({cliente})  =>{
  const {auth} = useContext(AuthContext) 
  const navigate = useNavigate()
  const [mensaje , setMensaje] = useState({})
  const [form ,setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",

  })
  const handleChange = (e) =>{

    setForm({
      ...form,
      [e.target.name] : e.target.value

    })
  } 
  const handleSubmit = async(e)=>{
    /*e.preventDefault()
    if(cliente?._id){

    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_URL_BACKEND}/cliente/crear/${cliente?._id}`
    const options = {
      method : 'PUT',
      headers: {
       
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    await axios.post(url,form, options);
    navigate('/dashboard/clientes')
  }
  else{
    try{
      const token = localStorage.getItem('token')
      form.id = auth._id
      const url = `${import.meta.env.VITE_URL_BACKEND}/cliente/registrar`
      const options ={
        headers :{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(url,form,options)
      navigate('/dashboard/clientes')

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg , tipo:false})
      setTimeout(()=>{
        setMensaje({})
      },3000);
    }
  }
    */
   console.log("Hola mundo")
}
  return(
    <>
    <form onSubmit={handleSubmit}  className="items-center justify-content-center">
      <div className="flex flex-col items-center justify-center">
      <label
      htmlFor="nombre" className="font-bold text-lg">
        Nombre
      </label>
      <input name="nombre" value={form.nombre} placeholder="Nombre" className="border rounded-lg text-center" onChange={handleChange}/>
      </div>
      <div className="flex flex-col items-center justify-center">
      <label htmlFor="apellido" className="font-bold text-lg">
        Apellido
      </label>
      <input className="border rounded-lg  text-center " placeholder="Apellido" onChange={handleChange}/>
      </div>
      <div className="flex flex-col items-center justify-center">
      <label htmlFor="numero" className="font-bold text-lg">
        Número de telefono
      </label>
      <input className="border rounded-lg  text-center" onChange={handleChange} placeholder="Numero de telefono"/>
      </div>
      <div className="mt-4 flex justify-center items-center px-3">
                    <input type="submit"  className="mr-8 bg-green-700 text-white px-4 py-2 font-bold w-50 h-10 rounded-lg hover:bg-green-500 cursor-pointer transition-all" value ={cliente?._id ? 'Actualizar Cliente' : 'Crear Cliente'}/>
                    <button className=" mr-8 bg-red-700 text-white px-4 py-2 rounded-lg font-bold w-50 h-10 hover:bg-red-500">
                        Cancelar
                    </button>
        </div>
    </form>
    </>

  )
}
export const ActualizarCliente = () =>{
  const {id} = useParams()
  const navigate = useNavigate()

  const [cliente , setCliente] = useState({})
  const [mensaje , setMensaje] = useState({})

  useEffect(()=>{
    const listClients = async () =>{
      try{
           const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${id}`
          const token = localStorage.getItem('token')
          const options ={
            headers:{
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${token}`
            }
          }
          const respuesta = await axios.get(url , {headers : options.headers})
          setCliente(response.data)

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg,tipo:false})

    }
  }
  navigate("/dashboard/clientes")
  
  
  },[])

  return(
    <>
    <Modal isOpen={true} title={"Actualizar Cliente"}>
      <FormularioCliente cliente={cliente}/>

    </Modal>
    
    </>
  )
}

//Formulario Pedidos

export const FormularioPedido = ({pedido})  =>{
  const {auth} = useContext(AuthContext) 
  const navigate = useNavigate()
  const [mensaje , setMensaje] = useState({})
  const [form ,setForm] = useState({
    nombre: "",
    descipcion: "",
    

  })
  const handleChange = (e) =>{

    setForm({
      ...form,
      [e.target.name] : e.target.value

    })
  } 
  const handleSubmit = async(e)=>{
    /*e.preventDefault()
    if(pedido?._id){

    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_URL_BACKEND}/pedidos/crear/${pedido?._id}`
    const options = {
      method : 'PUT',
      headers: {
       
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    await axios.post(url,form, options);
    navigate('/dashboard/pedidos')
  }
  else{
    try{
      const token = localStorage.getItem('token')
      form.id = auth._id
      const url = `${import.meta.env.VITE_URL_BACKEND}/pedidos/registrar`
      const options ={
        headers :{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(url,form,options)
      navigate('/dashboard/pedidos')

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg , tipo:false})
      setTimeout(()=>{
        setMensaje({})
      },3000);
    }
  }
    */
   console.log("Hola mundo")
}
  return(
    <>
    <form onSubmit={handleSubmit}  className="items-center justify-content-center">
      <div className="flex flex-col items-center justify-center">
      <label
      htmlFor="nombre" className="font-bold text-lg">
        Cliente
      </label>
      <select name="nombre"  placeholder="Nombre" className="border rounded-lg text-center" onChange={handleChange}>
        {nombres.map ((nombre , index) =>(
             <option key={index} value={nombre}>{nombre}
             </option>

        ))}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center">
      <label htmlFor="productos" className="font-bold text-lg">
        Productos
      </label>
      <input  type ="text-area" value={form.descipcion} className="border rounded-lg  text-center "  onChange={handleChange}/>
      </div>
      <div>
        <label>Producto</label>
        <select>
          {
            productos.map((index,producto)=>(
              <option key = {index} value={producto}>
                {producto}
              </option>
            )
          )}
        </select>
        <label>Total</label>
        <label>{producto.total}</label>

      </div>
      
      <div className="mt-4 flex justify-center items-center px-3">
                    <input type="submit"  className="mr-8 bg-green-700 text-white px-4 py-2 font-bold w-50 h-10 rounded-lg hover:bg-green-500 cursor-pointer transition-all" value ={pedido?._id ? 'Actualizar Pedido' : 'Crear Pedido'}/>
                    <button onClick={()=>{
                      navigate("/dashboard/pedidos")
                    }} className=" mr-8 bg-red-700 text-white px-4 py-2 rounded-lg font-bold w-50 h-10 hover:bg-red-500">
                        Cancelar
                    </button>
        </div>
    </form>
    </>

  )
}
export const ActualizarPedidos = () =>{
  const {id} = useParams()
  const [pedidos , setPedidos] = useState({})
  const [mensaje , setMensaje] = useState({})

  useEffect(()=>{
    const listPedidos = async () =>{
      try{
           const url = `${import.meta.env.VITE_BACKEND_URL}/pedidos/${id}`
          const token = localStorage.getItem('token')
          const options ={
            headers:{
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${token}`
            }
          }
          const respuesta = await axios.get(url , {headers : options.headers})
          setPedidos(respuesta.data)

    }
    catch(error){
      setMensaje({respuesta : error.response.data.msg,tipo:false})

    }
  }
  listPedidos()
  navigate("/dashboard/pedidos")
  
  
  },[])

  return(
    <>
    <Modal isOpen={true} title={"Actualizar Pedido"}>
      <FormularioPedido pedido={pedido}/>

    </Modal>
    
    </>
  )
}
