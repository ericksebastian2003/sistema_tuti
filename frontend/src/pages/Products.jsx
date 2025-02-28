import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdAddCircle, MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import Modal from '../components/Modals';

const Products = () =>{

  const [isModalOpen , setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const listofClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/productos`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      //const response = await axios.get(url, options);
      //const response = await axios.get(url, { headers: options.headers });
      const mockProducts = [
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

      //console.log(response.data)
      setClients(mockClients); 

      //setClients(response.data); 
    } catch (error) {
      console.log('Error en la petición', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm('¿Estás seguro/a de eliminar este cliente?');
      if (confirmation) {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_URL_BACKEND}/clientes/eliminar/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        //await axios.delete(url, options);
        await axios.delete(url, { headers: options.headers });
        listofClients(); // Refrescar la lista tras eliminación
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    listofClients();
  }, []);

  return (
    <>
    <div className='flex items-center justify-center'>
      <button   onClick={() => setIsModalOpen(true)}  className="bg-yellow-600 flex items-center  justify-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
        <MdAddCircle className="text-2xl" />
        Crear Clientes
      </button>
      </div>
      {clients.length === 0 ? (
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
            {clients.map((client, index) => (
              <tr className="border-b hover:bg-gray-400 text-center" key={client._id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.apellido}</td>
                <td className="py-2 flex justify-center items-center gap-4">
                  <MdModeEdit
                    className="h-11 text-white w-11 p-2 rounded-lg bg-sky-700 cursor-pointer hover:bg-sky-600"
                    onClick={() => navigate(`/clientes/editar/${client._id}`)}
                  />
                  <MdDeleteForever 
                    className=" p-2 text-white h-11 w-11  rounded-lg bg-red-700 cursor-pointer hover:bg-red-500"
                    onClick={() => handleDelete(client._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
  <Modal isOpen={isModalOpen} title="Crear Cliente">
    <FormularioCliente/>
  </Modal>
)}

    </>
  );
};

export default Products