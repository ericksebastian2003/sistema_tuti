import React, { useContext, useState } from "react";
import axios from "axios";
//import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Mensaje from "../components/Mensaje";

//const navigate = useNavigate(); // Hook para redirección

const Login = () => {
    const navigate = useNavigate()
    const {setAuth} = useContext(AuthContext)
    const [mensaje , setMensaje] = useState({})
    const [form , setForm] = useState({
        email : "",
        password : ""
    });
    const handleChange = (e) =>{
            setForm({...form,
            [e.target.name]: e.target.value
   });
}
    /*const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const url = `${import.meta.env.VITE_URL_BACKEND}/login`
            const respuesta = await axios.post(url,form)
            localStorage.setItem("token",respuesta.data.token)
            //localStorage.getItem('token')
            setAuth(respuesta.data)
            navigate('/dashboard/clientes')
        }
        catch(error){
            setMensaje({
                respuesta : error.response.data.msg || "Error en la autenticación",
                tipo:false
            })
            setForm({
                email:"",
                password:""
            });
            setTimeout(()=>{
                setMensaje({})

            },3000)
        }
    }
*/
//Simular credenciales de acceso
const handleSubmit = async (e) =>{
    e.preventDefault();
    const usersFake ={
        email :"admin@mail.com",
        password : "123456",
        token :"token-fake",
        nombre :"Erick Sebas"
    };
    if (form.email === usersFake.email && form.password === usersFake.password){
        localStorage.setItem("token",usersFake.token);
        setAuth(usersFake)
        navigate("/dashboard/clientes")
    }
    else{
        console.log("Error")
    }
}

    return (
        <>
        <div className="flex h-screen">
            <div className="w-1/2 bg-sky-900 bg-no-repeat bg-cover bg-center hidden sm:block">
             </div>

             <div className="w-full sm:w-1/2 h-screen bg-white flex items-center justify-center p-20">
            <div className="md:w-4/5 sm:w-full">
            {Object.keys(mensaje).length> 0 && <Mensaje tipo={mensaje.tipo}>
                {mensaje.respuesta}
            </Mensaje>}
            <h1 className="text-center font-bold text-black text-4xl">Login </h1>
            <span className="text-center text-slate-700 ">Bienvenido a nuestro sistema</span>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="mb-1 block font-semibold text-left">
                Correo electrónico
                </label>
                <input
                name="email"
                type="email"
                value={form.email || ""}
                className="w-96 h-8 px-2 py-3 shadow-sm text-center rounded-lg border border-slate-400 focus:outline-none focus:border-slate-500"
                required
                placeholder="Ingresa tu correo electrónico"
                onChange={handleChange}
                />
            </div>
            <div>
            <label className="mb-1 block font-semibold text-left">
                Contraseña
                </label>
                <input
                name="password"
                type="password"
                className="w-96 h-8 px-2 py-3 shadow-sm text-center rounded-lg border border-slate-400 focus:outline-none focus:border-slate-500"
                value={form.password || ""}
                onChange={handleChange}
                required
                placeholder="*****************"
                />
            </div>
            <div>
            <button
                className="rounded-lg w-100 h-10 bg-sky-800 text-white font-bold hover:bg-sky-900 mt-4"
                type="submit"
            >
                Acceder
            </button>

            </div>
            
            </form>
        </div>
        </div>
        </div>
        </>
    );
    };
export default Login
