import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

export default mongoose.model('Pedido', pedidoSchema);