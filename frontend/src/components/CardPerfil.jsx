import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mensaje from './Mensaje';
import axios from 'axios';
// Importación de los iconos
import { MdAddCircle, MdDeleteForever, MdModeEdit } from 'react-icons/md';

export const TableClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const listofClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_URL_BACKEND}/clientes`; // `VITE_` en variables de entorno
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      setClients(response.data); // Se asignan los datos correctamente
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
        await axios.delete(url, options);
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
      <button className="bg-red-800 flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold">
        <MdAddCircle className="text-2xl" />
        Crear Clientes
      </button>

      {clients.length === 0 ? (
        <Mensaje tipo="active">{'No existen registros'}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-blue-800 text-white">
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
                <td className="py-2 flex justify-center gap-4">
                  <MdModeEdit
                    className="h-7 w-7 text-blue-500 cursor-pointer"
                    onClick={() => navigate(`/clientes/editar/${client._id}`)}
                  />
                  <MdDeleteForever
                    className="h-7 w-7 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(client._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableClients;
