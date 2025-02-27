import { Router } from 'express';


const router = Router();

import {
    CrearAdminInicial,
    login,
    registroUsuario,
    perfilCliente,
    listarClientes
} from '../controllers/cliente_controller.js';