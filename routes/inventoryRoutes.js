import express from 'express';
import { createInventoryItem, getAllInventoryItems, editInventoryItem, deleteInventoryItem } from '../controllers/inventory';
import { verifyToken, onlyAdmin } from '../middlewares/auth';
import { validateIdParam } from '../middlewares/validateParams';

const router = express.Router();

router.post('/', verifyToken, onlyAdmin, createInventoryItem);
router.get('/', verifyToken, getAllInventoryItems);
router.put('/:id', verifyToken, onlyAdmin, editInventoryItem);
router.delete('/:id', verifyToken, onlyAdmin, deleteInventoryItem);

export default router;