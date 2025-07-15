import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try{
        const { correo, password } = req.body;

        if (!correo || !password) return res.status(400).json({ error: 'Correo y contraseña obligatorios' });

        const usuario = await User.findOne({ correo: correo });
        if (!usuario) return res.status(404).json({ error: 'Correo no registrado' });
        
        const passwdChecker = await bcrypt.compare(password, usuario.password);
        if (!passwdChecker) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol, id: usuario._id } });
    } catch (err) {
        console.error('Error en login: ', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

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
};

export const editUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.usuario.id !== id && req.usuario.rol !== 'admin') return res.status(403).json({ error: 'No autorizado a editar este usuario' });

        const campos = ['nombre', 'correo', 'telefono'];
        const datosActualizados = {};

        for (let campo of campos) {
            if (req.body[campo] !== undefined) datosActualizados[campo] = req.body[campo];
        }

        const emailExists = datosActualizados['correo'] ? await User.findOne({ correo: datosActualizados['correo'] }) : null;
        if (emailExists && emailExists._id.toString() !== id) return res.status(409).json({ error: 'Ese correo ya está registrado por otro usuario' });

        const hashedPwd = req.body.password ? await bcrypt.hash(req.body.password, 12) : undefined;
        datosActualizados.password = hashedPwd;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(updatedUser); 
    } catch (err) {
        console.error('Error al editar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.usuario.id !== id && req.usuario.rol !== 'admin') return res.status(403).json({ error: 'No autorizado para eliminar este usuario' });

        const usuario = await User.findById(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        await User.findByIdAndDelete(id);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};