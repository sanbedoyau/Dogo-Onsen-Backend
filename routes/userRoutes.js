import express from 'express';
import { loginUser, createUser, getAllUsers, editUser, deleteUser } from '../controllers/user.js';
import { verifyToken, onlyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.get('/', verifyToken, onlyAdmin, getAllUsers);

router.delete('/:id', verifyToken, deleteUser);

router.put('/:id', verifyToken, editUser);

export default router;