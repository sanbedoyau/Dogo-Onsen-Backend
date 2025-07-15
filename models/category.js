import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export const Category = model('categoria', categorySchema);