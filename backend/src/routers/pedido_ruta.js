import { Router } from 'express';

const router = Router();

import {
    listarPedidos,
    crearPedido
} from '../controllers/pedidos_controller.js'