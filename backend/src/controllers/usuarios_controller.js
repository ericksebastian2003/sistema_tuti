import Usuario from './models/Usuario.js';

const CrearAdminInicial = async () => {
    try {
        const emailAdmin = process.env.CORREO_ADMIN;
        const passwordAdmin = process.env.CONTRASENA_ADMIN;
        const rolAdmin = process.env.ADMIN_ROL || 'admin';

        if (!emailAdmin || !passwordAdmin) {
            console.log('Variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD no configuradas.');
            return;
        }
        const usuarioBDD = await Usuario.findOne({ email: emailAdmin });
        if (usuarioBDD) {
            console.log('Admin inicial ya existe.');
            return;
        }

        const adminInicial = new Usuario({
            email: emailAdmin,
            password: await Usuario.prototype.encryptPassword(passwordAdmin), // Usar la contraseña encriptada
            rol: rolAdmin,
            fechaIngreso: Date.now()
        });
        await adminInicial.save();
        console.log('Admin creado exitosamente.');
    } catch (error) {
        console.error('Error al crear admin inicial:', error);
    }
};

const login = async (req, res) => {}
    

const perfilCliente = async (req,res) => {}

const listarClientes = async (req,res) => {}


// Este metodo solo lo utilizo para crear los clientes de la tienda, no se implementa en el frontend
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)
const registroUsuario = async (req, res) => {}
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)


export {
    CrearAdminInicial,
    login,
    registroUsuario,
    perfilCliente,
    listarClientes
}