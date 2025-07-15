import express from 'express';
import { createBath, getAllBaths, editBath, deleteBath } from '../controllers/bath.js';
import { verifyToken, onlyAdmin } from '../middlewares/auth.js';
import { validateIdParam } from '../middlewares/validateParams.js';

const router = express.Router();

router.post('/', verifyToken, onlyAdmin, createBath);
router.get('/', getAllBaths);
router.put('/:id', verifyToken, onlyAdmin, validateIdParam, editBath);
router.delete('/:id', verifyToken, onlyAdmin, validateIdParam, deleteBath);

export default router;