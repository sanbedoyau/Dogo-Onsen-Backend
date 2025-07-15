import { Schema, model } from 'mongoose';

const cleaning_assignmentSchema = new Schema(
    {
        personal: {
            type: Schema.Types.ObjectId,
            ref: 'personal_limpieza',
            required: true
        },
        bath: {
            type: Schema.Types.ObjectId,
            ref: 'bath',
            required: true
        },
        fecha_inicio: {
            type: Date,
            required: true
        },
        fecha_fin: {
            type: Date,
            required: true
        },
        productos_usados: [{
            item: {
                type: Schema.Types.ObjectId,
                ref: 'inventario',
            },
            cantidad: Number
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const CleaningAssignment = model('aignacion_limpieza', cleaning_assignmentSchema);