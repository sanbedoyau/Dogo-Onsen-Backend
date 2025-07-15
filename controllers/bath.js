import { Bath } from '../models/bath.js';
import { isValidObjectId } from '../utils/';

export const createBath = async (req, res) => {
    try {
        const newBath = new Bath(req.body);
        const savedBath = await newBath.save();

        res.status(201).json(savedBath);
    } catch (err) {
        console.error('Error al crear baño', err);
        res.status(400).json({ error: 'Datos inválidos' });
    }
};

export const getAllBaths = async (_, res) => {
    try {
        const baños = await Bath.find();
        res.json(baños);
    } catch (err) {
        console.error('Error al obtener baños: ', err)
        res.status(500).json({ error: 'Error al obtener baños' });
    }
};

export const editBath = async (req, res) => {
    try {
        const updatedBath = await Bath.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBath) return res.status(404).json({ error: 'Baño no encontrado' });
        res.json(updatedBath);
    } catch (err) {
        res.status(400).json({ error: 'Datos inválidos' });
    }
};

export const deleteBath = async (req, res) => {
    try {
        const deletedBath = await Bath.findByIdAndDelete(req.params.id);
        if (!deletedBath) return res.status(404).json({ error: 'Baño no encontrado' });
        res.json({ message: 'Baño eliminiado correctamente' });
    } catch (err) {
        console.error('Error al eliminar el baño', err)
        res.status(500).json({ error: 'Error al eliminar baño' });
    }
};