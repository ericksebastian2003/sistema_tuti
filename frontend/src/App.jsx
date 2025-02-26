
import './App.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Clients from './pages/Clients'
import Dashboard from './layout/Dashboard'
import Auth from './layout/Auth'
import { PrivateRoutes } from './context/PrivateRoutes'
import { AuthProvider } from './context/AuthProvider'
function App() {
  return (

   <BrowserRouter>
   <AuthProvider>
      <Routes>
        <Route index element = {<Login/>}/>
        <Route path='/' element={<Auth/>}/>
       <Route path = '/dashboard/*' element ={
        <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>
       }>
              <Route path='clientes' element={<Clients/>}/>
              <Route path='productos' element={<Products/>}/>
              <Route path='pedidos' element={<Orders/>}/>
              </Route>
          </Routes>
    </AuthProvider>
    </BrowserRouter>
    )
}

export default App
