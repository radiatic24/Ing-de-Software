import express from 'express';
import Usuario from '../models/Usuario-Model.js';

const router = express.Router();

// Obtener todos los usuarios (sin contraseñas)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select('-contraseña')
      .lean();

    res.json({ 
      success: true,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ usuarioId: req.params.id })
      .select('-contraseña');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: `Usuario con ID ${req.params.id} no encontrado`
      });
    }

    res.json({ 
      success: true,
      data: usuario 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, contraseña, rol, correo, caja } = req.body;

    // Validar campos requeridos
    if (!nombre || !contraseña || !rol || !correo) {
      return res.status(400).json({
        success: false,
        error: "Faltan campos requeridos: nombre, contraseña, rol o correo"
      });
    }

    // Crear usuario (usuarioId se genera automáticamente)
    const nuevoUsuario = new Usuario({
      nombre,
      contraseña,
      rol,
      correo,
      caja: caja || []
    });

    const usuarioGuardado = await nuevoUsuario.save();

    // Preparar respuesta sin contraseña
    const usuarioRespuesta = {
      usuarioId: usuarioGuardado.usuarioId,
      nombre: usuarioGuardado.nombre,
      rol: usuarioGuardado.rol,
      correo: usuarioGuardado.correo,
      caja: usuarioGuardado.caja
    };

    res.status(201).json({ 
      success: true,
      data: usuarioRespuesta 
    });

  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    delete updates.usuarioId; // Evitar actualización del ID

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

    res.json({ 
      success: true,
      data: usuarioActualizado 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
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
      data: {
        message: `Usuario ${usuarioEliminado.nombre} eliminado`,
        usuarioId: usuarioEliminado.usuarioId
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

export default router;