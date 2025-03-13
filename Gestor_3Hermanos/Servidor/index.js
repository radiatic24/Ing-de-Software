import express from 'express';
import cors from 'cors';
import connectDB from './db.js'; // Usando el archivo de conexión que creaste antes

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
connectDB();

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend jalando al 100' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});