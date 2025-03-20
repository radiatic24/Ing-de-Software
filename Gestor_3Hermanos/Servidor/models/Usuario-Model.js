import mongoose from 'mongoose';

const cajaSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: [true, 'El monto es requerido'],
    min: [0, 'El monto no puede ser negativo']
  },
  referencia: {
    type: String,
    required: [true, 'La referencia es requerida'],
    maxlength: [50, 'La referencia no puede exceder 50 caracteres']
  },
  motivo: {
    type: String,
    required: [true, 'El motivo es requerido'],
    enum: {
      values: ['Apertura de caja', 'Pago de proveedor', 'Venta', 'Otro'],
      message: 'Motivo no válido'
    }
  },
  fechaHora: {
    type: Date,
    default: Date.now
  }
});

const usuarioSchema = new mongoose.Schema({
  usuarioId: {
    type: Number,
    required: [true, 'El ID de usuario es requerido'],
    unique: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
  },
  rol: {
    type: String,
    required: true,
    enum: {
      values: ['Gerente', 'Empleado'],
      message: 'Rol no válido'
    }
  },
  correo: {
    type: String,
    required: [true, 'El correo es requerido'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Correo no válido']
  },
  caja: [cajaSchema]
});

export default mongoose.model('Usuario', usuarioSchema);