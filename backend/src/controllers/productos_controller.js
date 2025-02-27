import Producto from "../models/Producto"; 

// Listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find(); 
        res.status(200).json(productos); 
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error });
    }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    try {
        // Crear el nuevo producto usando req.body
        const producto = new Producto(req.body);

        // Guardar el producto en la base de datos
        await producto.save();

        // Responder con el producto creado
        res.status(201).json(producto);
    } catch (error) {
        // Manejar errores, por ejemplo, si faltan campos según el esquema de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensaje: "Datos inválidos", error: error.errors });
        }
        // Error general
        res.status(500).json({ mensaje: "Error al crear el producto", error });
    }
}

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, descripcion, categoria, precio, stock, proveedor } = req.body;

    try {
        // Buscar el producto por su ID
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Actualizar los campos del producto
        producto.nombre = nombre || producto?.nombre;
        producto.codigo = codigo || producto?.codigo;
        producto.descripcion = descripcion || producto?.descripcion;
        producto.categoria = categoria || producto?.categoria;
        producto.precio = precio || producto?.precio;
        producto.stock = stock || producto?.stock;
        producto.proveedor = proveedor || producto?.proveedor;

        // Guardar los cambios
        await producto.save();
        res.status(200).json(producto); // Responder con el producto actualizado
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el producto por su ID
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Eliminar el producto de la base de datos
        await producto.remove();
        res.status(200).json({ mensaje: "Producto eliminado con éxito" }); // Responder con éxito
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error });
    }
};

export { 
    listarProductos, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
};
