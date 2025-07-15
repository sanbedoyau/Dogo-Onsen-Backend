import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'usuario',
            required: true
        },
        fecha_inicio: {
            type: Date,
            required: true,
        },
        fecha_fin: {
            type: Date,
            required: true
        },
        estado: {
            type: String,
            required: true,
            enum: ['programada', 'en espera', 'en curso', 'finalizada', 'cancelada']
        },
        baño: {
            type: Schema.Types.ObjectId,
            ref: 'bath',
            required: true
        },
        banquete: {
            type: Schema.Types.ObjectId,
            ref: 'banquete',
            default: null
        },
        jabon_especial: {
            type: Schema.Types.ObjectId,
            ref: 'inventario',
            default: null
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);