import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        telefono: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            required: true,
            enum: ['admin', 'espiritu'],
            default: 'espiritu'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const User = model('usuario', userSchema);