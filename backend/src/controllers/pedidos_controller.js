import Pedido from '../models/pedidos.js';
import Producto from '../models/productos.js';
import Usuario from '../models/usuarios.js';


const listarPedidos = async (req, res) => {
    try {
        // Buscar todos los pedidos, populando las referencias a Usuario y Producto
        const pedidos = await Pedido.find()
            .populate('cliente', 'nombre apellido email')  // Información del cliente
            .populate('productos.producto', 'nombre precio stock')  // Información del producto
            .exec();

        // Enviar los pedidos como respuesta
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar los pedidos.' });
    }
};

const crearPedido = async (req, res) => {
    try {
        const { cliente, productos } = req.body;

        // Validar si el cliente existe
        const usuario = await Usuario.findById(cliente);
        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }

        // Validar si los productos existen y calcular el total
        let total = 0;
        const productosValidos = [];

        for (let i = 0; i < productos.length; i++) {
            const producto = await Producto.findById(productos[i].producto);
            if (!producto) {
                return res.status(400).json({ message: `Producto con ID ${productos[i].producto} no encontrado.` });
            }

            // Verificar si hay suficiente stock
            if (producto.stock < productos[i].cantidad) {
                return res.status(400).json({ message: `No hay suficiente stock para el producto ${producto.nombre}.` });
            }

            // Calcular el precio total por producto (precio * cantidad)
            total += producto.precio * productos[i].cantidad;

            // Agregar los productos con la cantidad a una lista para guardar
            productosValidos.push({
                producto: producto._id,
                cantidad: productos[i].cantidad
            });
        }

        // Crear el pedido
        const nuevoPedido = new Pedido({
            cliente,
            productos: productosValidos,
            total
        });

        // Guardar el pedido
        await nuevoPedido.save();

        // Actualizar el stock de los productos
        for (let i = 0; i < productosValidos.length; i++) {
            await Producto.findByIdAndUpdate(productosValidos[i].producto, {
                $inc: { stock: -productosValidos[i].cantidad }
            });
        }

        res.status(201).json({ message: 'Pedido creado exitosamente.', pedido: nuevoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el pedido.' });
    }
}


export{
    listarPedidos,
    crearPedido
}