import app from './server.js'
import connection from './database.js'
import CrearAdminInicial from './models/usuarios.js'


const IniciarServidor = async () => {
    try {
        await connection(); // conexion a la base de datos
        await CrearAdminInicial(); // se crea el primer  y único admin
        
        app.listen(app.get('port'),()=>{
            console.log(`El servidor se está ejecutando http/localhost:${app.get('port')}`)
        })
    } catch (error) {
        console.error('Error al inicializar servidor:', error);
    }
}

IniciarServidor();


