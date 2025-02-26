import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext