import express from 'express';
import { loginUser, createUser, getAllUsers, editUser, deleteUser } from '../controllers/user.js';
import { verifyToken, onlyAdmin } from '../middlewares/auth.js';
import { validateIdParam } from '../middlewares/validateParams.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', verifyToken, onlyAdmin, getAllUsers);
router.put('/:id', verifyToken, validateIdParam, editUser);
router.delete('/:id', verifyToken, validateIdParam, deleteUser);

export default router;