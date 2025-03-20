import express from 'express';
import Producto from '../models/Producto-Model.js';
import Usuario from '../models/Usuario-Model.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find().populate({
      path: 'historialInventario.usuarioId',
      model: 'Usuario',
      select: 'nombre rol'
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findOneAndUpdate(
      { productoId: req.params.id },
      req.body,
      { new: true }
    );
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findOneAndDelete({ productoId: req.params.id });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir entrada al historial de inventario
router.post('/:id/historial', async (req, res) => {
  try {
    const producto = await Producto.findOne({ productoId: req.params.id });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    // Validar usuario
    const usuario = await Usuario.findOne({ usuarioId: req.body.usuarioId });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    producto.historialInventario.push(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;