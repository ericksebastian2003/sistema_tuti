import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
function esCliente(rol) {
    return function() {
        return this.rol !== rol;
    };
} 
// ↑↑↑↑↑ es lo mismo que esto "function(){return this.rol !== 'admin'}" solo que deberia ponerse en la propiedad "required" de cada uno
// ^_~ 


const usuarioSchema = new mongoose.Schema({
    
    cedula: {
        type: Number,
        required: esCliente('admin'),
        unique: true,
        trim: true,
        index: true
    },
    nombre: {
        type: String,
        required: esCliente('admin'),
        trim: true
    },
    apellido: {
        type: String,
        required: esCliente('admin'),
        trim: true
    },
    ciudad: {
        type: String,
        required: esCliente('admin'),
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: esCliente('admin'),
        trim: true
    },
    telefono:{
        type: Number,
        required: esCliente('admin'),
        trim: true
    },
    fechaNacimiento:{
        type: Date,
        required: esCliente('admin'),
        trim: true
    },
    fechaIngreso:{
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    rol:{
        type: String,
        required: true,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    }

},{
    timestamps: true
}) 

export default mongoose.model('Usuario', usuarioSchema)


//metodo para encriptar la contraseña de los usuarios
usuarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}


//metodo para comparar la contraseña ingresada con la encriptada
usuarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


