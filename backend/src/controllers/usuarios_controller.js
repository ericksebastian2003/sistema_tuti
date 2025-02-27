import Usuario from './models/Usuario.js';
import generarJWT from './middlewares/jwt.js';


const CrearAdminInicial = async () => {
    try {
        const emailAdmin = process.env.CORREO_ADMIN;
        const passwordAdmin = process.env.CONTRASENA_ADMIN;
        const rolAdmin = process.env.ADMIN_ROL || 'admin';

        if (!emailAdmin || !passwordAdmin) {
            console.log('Variables de entorno CORREO_ADMIN y CONTRASENA_ADMIN no configuradas.');
            return;
        }
        const usuarioBDD = await Usuario.findOne({ email: emailAdmin });
        if (usuarioBDD) {
            console.log('Admin inicial ya existe.');
            return;
        }

        const adminInicial = new Usuario({
            email: emailAdmin,
            rol: rolAdmin,
            fechaIngreso: Date.now()
        });

        adminInicial.password = await adminInicial.encryptPassword(passwordAdmin);
        await adminInicial.save();
        console.log('Admin creado exitosamente.');
    } catch (error) {
        console.error('Error al crear admin inicial:', error);
    }
};

const login = async (req, res) => {

    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const usuarioBDD = await Usuario.findOne({email})

    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})

    const verificarPassword = await usuarioBDD.matchPassword(password)

    if(!verificarPassword) return res.status(401).json({msg:"Lo sentimos, el password no es el correcto"})

    const token = generarJWT(usuarioBDD._id,usuarioBDD.rol)

	const {cedula,nombre,apellido,ciudad,_id, rol, direccion, telefono,fechaNacimiento} = usuarioBDD

    // Formato DD/MM/YYYY
    const fechaNacimientoFormateada = fechaNacimiento.toLocaleDateString('es-ES'); 

    res.status(200).json({
        token,
        cedula,
        nombre,
        apellido,
        email,
        ciudad,
        _id,
        rol,
        direccion,
        telefono,
        fechaNacimiento: fechaNacimientoFormateada
        
    })
}
    

const perfilCliente = async (req,res) => {


    delete req.usuarioBDD.token
    delete req.usuarioBDD._id
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)

}

const listarClientes = async (req, res) => {
    try {
        if (req.usuarioBDD) {
            // Obtener solo el nombre y el correo electrónico del cliente autenticado
            const cliente = await Usuario.findById(req.usuarioBDD._id)
                .select("nombre", "email");
            res.status(200).json(cliente);
        } else if (req.usuarioBDD.rol === 'admin') {
            // Obtener solo el nombre y el correo electrónico de todos los clientes
            const clientes = await Usuario.find()
                .populate("nombre","email");
            res.status(200).json(clientes);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al listar clientes" });
    }
};


// Este metodo solo lo utilizo para crear los clientes de la tienda, no se implementa en el frontend
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)
const registroUsuario = async (req, res) => {

    try {
        const { cedula, nombre, apellido, ciudad, email, password, direccion, telefono, fechaNacimiento } = req.body;

        // Validar todos los campos llenos
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
        // verificacion de email y cedula 
        if(await Usuario.findOne({email})) return res.status(400).json({msg:"Lo sentimos, el email ya ha sido registrado"})
        if(await Usuario.findOne({cedula})) return res.status(400).json({msg:"Lo sentimos, la cedula ya ha sido registrada"})

        // Crear la instancia del usuario
        const nuevoUsuario = new Usuario({
            cedula,
            nombre,
            apellido,
            ciudad,
            email,
            direccion,
            telefono,
            fechaNacimiento,
        });

        nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)

        // Guardar en BDD
        await nuevoUsuario.save();

        // Imprimir el mensaje
        res.status(201).json({ msg: "Usuario registrado exitosamente" });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: "Error al registrar el usuario" });
    }

}
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)


export {
    CrearAdminInicial,
    login,
    registroUsuario,
    perfilCliente,
    listarClientes
}