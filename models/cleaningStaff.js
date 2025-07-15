import { Schema, model } from 'mongoose';

const cleaning_staffSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true,
            enum: ['libre', 'ocupado', 'descansando']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const CleaningStaff = module('personal_limpieza', cleaning_staffSchema);