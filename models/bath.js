import { Schema, model } from 'mongoose';

const bathSchema = new Schema(
    {
        tipo: {
            type: String,
            required: true,
            enum: ['simple', 'completo']
        },
        precio: {
            type: Number,
            required: true
        },
        estado: {
            type: String,
            enum: ['libre', 'ocupado', 'en limpieza'],
            default: 'libre'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Bath = new model('bath', bathSchema);