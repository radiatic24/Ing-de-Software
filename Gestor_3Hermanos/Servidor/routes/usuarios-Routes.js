import express from 'express';
import Usuario from '../models/Usuario-Model.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select('-contraseña -__v')
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
      .select('-contraseña -__v');

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

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, contraseña, rol, correo, caja } = req.body;

    // Validar campos requeridos
    const camposRequeridos = [];
    if (!nombre) camposRequeridos.push('nombre');
    if (!contraseña) camposRequeridos.push('contraseña');
    if (!rol) camposRequeridos.push('rol');
    if (!correo) camposRequeridos.push('correo');

    if (camposRequeridos.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Faltan campos requeridos: ${camposRequeridos.join(', ')}`
      });
    }

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      contraseña,
      rol,
      correo,
      caja: caja || []
    });

    const usuarioGuardado = await nuevoUsuario.save();

    // Preparar respuesta
    const respuesta = usuarioGuardado.toJSON();
    
    res.status(201).json({ 
      success: true,
      data: respuesta 
    });

  } catch (error) {
    let mensajeError = error.message;
    
    // Manejar errores de duplicados
    if (error.code === 11000) {
      if (error.keyPattern.correo) {
        mensajeError = 'El correo electrónico ya está registrado';
      } else if (error.keyPattern.usuarioId) {
        mensajeError = 'Error generando ID único (reintente)';
      }
    }

    res.status(400).json({ 
      success: false,
      error: mensajeError 
    });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    delete updates.usuarioId;
    delete updates.correo;

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { usuarioId: req.params.id },
      updates,
      { 
        new: true,
        runValidators: true 
      }
    ).select('-contraseña -__v');

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