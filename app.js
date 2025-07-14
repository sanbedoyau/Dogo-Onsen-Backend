import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar rutas
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', userRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .catch((err) => console.log('Error: ', err));

app.listen(process.env.PORT);