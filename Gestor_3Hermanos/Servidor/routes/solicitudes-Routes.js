import express from 'express';
import SolicitudProducto from '../models/SolicitudProducto-Model.js';
import Producto from '../models/Producto-Model.js';

const router = express.Router();

// Obtener todas las solicitudes
router.get('/', async (req, res) => {
  try {
    const solicitudes = await SolicitudProducto.find().populate('productoId', 'nombre precio');
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una solicitud
router.post('/', async (req, res) => {
  try {
    // Validar que el producto existe
    const producto = await Producto.findOne({ productoId: req.body.productoId });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const nuevaSolicitud = new SolicitudProducto(req.body);
    await nuevaSolicitud.save();
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar estado de una solicitud
router.patch('/:id/estado', async (req, res) => {
  try {
    const solicitud = await SolicitudProducto.findOneAndUpdate(
      { solicitudId: req.params.id },
      { estado: req.body.estado },
      { new: true }
    );
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una solicitud
router.delete('/:id', async (req, res) => {
  try {
    const solicitud = await SolicitudProducto.findOneAndDelete({ solicitudId: req.params.id });
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json({ mensaje: 'Solicitud eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;