import express from 'express';
import { createCategory, getAllCategories, editCategory, deleteCategory } from '../controllers/category.js';
import { verifyToken, onlyAdmin } from '../middlewares/auth.js';
import { validateIdParam } from '../middlewares/validateParams.js';

const router = express.Router();

router.post('/', verifyToken, onlyAdmin, createCategory);
router.get('/', verifyToken, onlyAdmin, getAllCategories);
router.put('/:id', verifyToken, onlyAdmin, validateIdParam, editCategory);
router.delete('/:id', verifyToken, onlyAdmin, validateIdParam, deleteCategory);

export default router;