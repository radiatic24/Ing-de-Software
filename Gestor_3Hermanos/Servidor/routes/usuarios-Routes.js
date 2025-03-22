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
    const usuarioId = Number(req.params.id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ success: false, error: 'ID de usuario inválido' });
    }

    const usuario = await Usuario.findOne({ usuarioId }).select('-contraseña');
    
    if (!usuario) {
      return res.status(404).json({ success: false, error: `Usuario con ID ${usuarioId} no encontrado` });
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

    if (!contraseña || !userData.correo || !userData.usuarioId) {
      return res.status(400).json({ success: false, error: 'Faltan campos requeridos' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ $or: [{ usuarioId: userData.usuarioId }, { correo: userData.correo }] });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, error: 'El usuario ya existe con ese ID o correo' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

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
    const usuarioId = Number(req.params.id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ success: false, error: 'ID de usuario inválido' });
    }

    const { contraseña, ...updateData } = req.body;
    if (contraseña) {
      updateData.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { usuarioId },
      updateData,
      { new: true, runValidators: true }
    ).select('-contraseña');

    if (!usuarioActualizado) {
      return res.status(404).json({ success: false, error: `Usuario con ID ${usuarioId} no encontrado` });
    }

    res.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuarioId = Number(req.params.id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ success: false, error: 'ID de usuario inválido' });
    }

    const usuarioEliminado = await Usuario.findOneAndDelete({ usuarioId });

    if (!usuarioEliminado) {
      return res.status(404).json({ success: false, error: `Usuario con ID ${usuarioId} no encontrado` });
    }

    res.json({ success: true, message: `Usuario ${usuarioEliminado.nombre} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Añadir movimiento de caja
router.post('/:id/caja', async (req, res) => {
  try {
    const usuarioId = Number(req.params.id);
    if (isNaN(usuarioId)) {
      return res.status(400).json({ success: false, error: 'ID de usuario inválido' });
    }

    const { monto, referencia, motivo } = req.body;

    if (!monto || !referencia || !motivo) {
      return res.status(400).json({ success: false, error: 'Faltan campos requeridos: monto, referencia, motivo' });
    }

    const usuario = await Usuario.findOne({ usuarioId });

    if (!usuario) {
      return res.status(404).json({ success: false, error: `Usuario con ID ${usuarioId} no encontrado` });
    }

    const nuevoMovimiento = {
      monto: Number(monto),
      referencia,
      motivo,
      fechaHora: req.body.fechaHora || Date.now()
    };

    usuario.caja.push(nuevoMovimiento);
    await usuario.save();

    res.status(201).json({ success: true, data: usuario.caja[usuario.caja.length - 1] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

/////////////////////////////////////////////Kevin 
// Ruta de Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ success: false, error: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!passwordValida) {
      return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
    }

    // Preparar respuesta sin contraseña
    const userResponse = usuario.toObject();
    delete userResponse.contraseña;

    res.json({ success: true, message: 'Inicio de sesión exitoso', data: userResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
///////////////////////////fin de kevin

export default router;
