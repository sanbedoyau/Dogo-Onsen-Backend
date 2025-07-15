import { Schema, model } from 'mongoose';

const inventorySchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        unidades: {
            type: Number,
            required: true
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'categoria',
            required: true
        },
        esJabonEspecial: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            default: null
        }
    },
    {
        versionKey: false
    }
);

export const Inventory = model('inventario', inventorySchema);