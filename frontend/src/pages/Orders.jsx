import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddBusiness } from "react-icons/md";
import { ActualizarPedidos, FormularioCliente, FormularioPedido } from "../components/Formularios";
import Mensaje from "../components/Mensaje";
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import Modal from "../components/Modals";


const Orders = () => {
  const [mensaje , setMensaje] = useState({})
  const [isModalOpen , setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const updateOrders= () =>
  {
    <ActualizarPedidos/>
  }
  const listofPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/pedidos`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      //const response = await axios.get(url, options);
      //const response = await axios.get(url, { headers: options.headers });
      const mockClients = [
        {
          _id: 1,
          name: "Sebas",
          apellido: "Caiza",
        },
        {
          _id: 2,
          name: "Juan",
          apellido: "Pérez",
        },
        {
          _id: 3,
          name: "María",
          apellido: "López",
        },
      ];
      setOrders(mockClients); 

      //setClients(response.data); 
    } catch (error) {
      console.log('Error en la petición', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('¿Estás seguro/a de eliminar el pedido?');
      if (confirmation) {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_URL_BACKEND}/pedidos/eliminar/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(url, { headers: options.headers });
        listofPedidos();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    listofPedidos();
  }, []);

  return (
    <>
    <div className="p-6">
      <div className='flex items-center justify-center '>
      <button   onClick={() => setIsModalOpen(true)}  className="bg-yellow-600 flex items-center  justify-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
        <MdOutlineAddBusiness     className="text-2xl" />
        Crear Pedido
      </button>
      </div>
      {orders.length === 0 ? (
        <Mensaje tipo="active">{'No existen registros'}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className="border-b hover:bg-gray-400 text-center" key={order._id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.apellido}</td>
                <td className="py-2 flex justify-center items-center gap-4">
                  <MdModeEdit
                    className="h-11 text-white w-11 p-2 rounded-lg bg-sky-700 cursor-pointer hover:bg-sky-600"
                    onClick={ActualizarPedidos}
                  />
                  <MdDeleteForever 
                    className=" p-2 text-white h-11 w-11  rounded-lg bg-red-700 cursor-pointer hover:bg-red-500"
                    onClick={() => handleDelete(order._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      {isModalOpen && (
  <Modal isOpen={isModalOpen} title="Crear Pedido">
    <FormularioPedido/>
  </Modal>
)}


    </>
  );
};

export default Orders;
