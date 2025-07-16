import { Inventory } from '../models/inventory.js';

export const createInventoryItem = async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        await newItem.save();

        res.status(201).json(newItem.toObject());
    } catch (err) {
        console.log('Error al crear producto:', err);
        res.status(400).json({ error: 'Datos inválidos' });
    }
}

export const getAllInventoryItems = async (_, res) => {
    try {
        const items = await Inventory.find().populate('categoria');
        res.json(items);
    } catch (err) {
        console.error('Error al traer productos', err);
        res.status(500).json({ error: 'Error al traer productos' });
    }
}

export const editInventoryItem = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) return res.status(404).json({ error: 'Producto no encontrado' })

        res.json(updatedItem);
    } catch (err) {
        console.error('Error al editar item: ', err);
        res.status(400).json({ error: 'Datos inválidos' });
    }
}

export const deleteInventoryItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.json(404).json({ error: 'Producto no encontrado' });

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
}