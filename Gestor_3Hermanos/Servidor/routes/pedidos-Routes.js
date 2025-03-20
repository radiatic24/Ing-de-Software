import express from 'express';
import Pedido from '../models/Pedido-Model.js';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuarioId', 'nombre rol');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear pedido
router.post('/', async (req, res) => {
  try {
    // Validar que el usuario existe
    const usuario = await Usuario.findOne({ usuarioId: req.body.usuarioId });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar pedido
router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findOneAndUpdate(
      { pedidoId: req.params.id },
      req.body,
      { new: true }
    );
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar pedido
router.delete('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findOneAndDelete({ pedidoId: req.params.id });
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;