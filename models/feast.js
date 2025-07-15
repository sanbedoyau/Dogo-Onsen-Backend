import { Schema, model } from 'mongoose';

const feastSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        foto: {
            type: String,
            required: true
        },
        alimentos: [{
            type: Schema.Types.ObjectId,
            ref: 'inventario'
        }]
    },
    {
        versionKey: false
    }
);

export const Feast = model('banquete', feastSchema);