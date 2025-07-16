import express from 'express';
import { createInventoryItem, getAllInventoryItems, editInventoryItem, deleteInventoryItem } from '../controllers/inventory.js';
import { verifyToken, onlyAdmin } from '../middlewares/auth.js';
import { validateIdParam } from '../middlewares/validateParams.js';

const router = express.Router();

router.post('/', verifyToken, onlyAdmin, createInventoryItem);
router.get('/', verifyToken, getAllInventoryItems);
router.put('/:id', verifyToken, onlyAdmin, validateIdParam, editInventoryItem);
router.delete('/:id', verifyToken, onlyAdmin, validateIdParam, deleteInventoryItem);

export default router;