import { Category } from '../models/category.js';

export async function createCategory(req, res) {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        
        res.status(201).json(savedCategory);
    } catch (err) {
        console.error('Error al crear categoría:', err);
        res.status(400).json({ error: 'Datos inválidos' });
    }
}

export async function getAllCategories(_, res) {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error('Error al obtener categorías:', err);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
}

export async function editCategory(req, res) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        );
        if (!updatedCategory) return res.status(404).json({ error: 'Categoría no encontrada' });

        res.json(updatedCategory);
    } catch (err) {
        console.error('Error al editar categoría:', err);
        res.status(400).json({ error: 'Datos inválidos' });
    }
}

export async function deleteCategory(req, res) {
    try {
        const eliminada = await Category.findByIdAndDelete(req.params.id);
        if (!eliminada) return res.status(404).json({ error: 'Categoría no encontrada' });

        res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar categoría:', err);
        res.status(500).json({ error: 'Error al eliminar categoría' });
    }
}