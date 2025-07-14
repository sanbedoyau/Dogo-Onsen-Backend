import { User } from '../modules/user.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        const { nombre, correo, telefono, password, rol } = req.body;

        if (!nombre || !correo || !password || !rol) return res.status(400).json({ error: 'Faltan campos obligatorios' });
        if (!['admin', 'espiritu'].includes(rol)) return res.status(406).json({ error: 'El rol indicado no existe' })

        const userExists = await User.findOne({ correo });
        if (userExists) return res.status(409).json({ error: 'El correo ya está registrado' });

        const hashedPwd = await bcrypt.hash(password, 12);

        const newUser = new User({
            nombre: nombre,
            correo: correo,
            telefono: rol === 'espiritu' ? telefono : undefined,
            password: hashedPwd,
            rol: rol
        });
        
        await newUser.save();

        const { password: _ , ...userData } = newUser.toObject();

        res.status(201).json(userData);
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error interno al crear usuario' });
    }

};

export const getAllUsers = async (_, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error interno al buscar usuarios' });
    }
}