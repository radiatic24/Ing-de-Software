import express from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario-Model.js';

const router = express.Router();

// Obtener todos los usuarios (sin contraseña)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña').lean();
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Obtener usuario específico
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ usuarioId: req.params.id }).select('-contraseña');
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        error: `Usuario con ID ${req.params.id} no encontrado` 
      });
    }
    
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { contraseña, ...userData } = req.body;

    // Validar existencia de campos requeridos
    if (!contraseña || !userData.correo) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos'
      });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      ...userData,
      contraseña: hashedPassword
    });

    const savedUser = await nuevoUsuario.save();
    
    // Preparar respuesta sin contraseña
    const userResponse = savedUser.toObject();
    delete userResponse.contraseña;

    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { contraseña, ...updateData } = req.body;
    const updates = { ...updateData };

    // Hash nueva contraseña si se proporciona
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      updates.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { usuarioId: req.params.id },
      updates,
      { new: true, runValidators: true }
    ).select('-contraseña');

    if (!usuarioActualizado) {
      return res.status(404).json({
        success: false,
        error: `Usuario con ID ${req.params.id} no encontrado`
      });
    }

    res.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findOneAndDelete({ 
      usuarioId: req.params.id 
    });

    if (!usuarioEliminado) {
      return res.status(404).json({
        success: false,
        error: `Usuario con ID ${req.params.id} no encontrado`
      });
    }

    res.json({ 
      success: true, 
      message: `Usuario ${usuarioEliminado.nombre} eliminado correctamente` 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Añadir movimiento de caja
router.post('/:id/caja', async (req, res) => {
  try {
    const { monto, referencia, motivo } = req.body;
    
    // Validar campos requeridos
    if (!monto || !referencia || !motivo) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: monto, referencia, motivo'
      });
    }

    const usuario = await Usuario.findOne({ usuarioId: req.params.id });
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: `Usuario con ID ${req.params.id} no encontrado`
      });
    }

    const nuevoMovimiento = {
      monto: Number(monto),
      referencia,
      motivo,
      fechaHora: req.body.fechaHora || Date.now()
    };

    usuario.caja.push(nuevoMovimiento);
    await usuario.save();

    res.status(201).json({
      success: true,
      data: usuario.caja[usuario.caja.length - 1]
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;