import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
  proveedorId: { type: Number, required: true },
  nombre: { type: String, required: true },
  contacto: { type: String, required: true },
  email: { type: String, required: true },
  direccion: { type: String, required: true }
});

const historialInventarioSchema = new mongoose.Schema({
  historialId: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  tipoMovimiento: { type: String, enum: ['Entrada', 'Salida'], required: true },
  fechaMovimiento: { type: Date, default: Date.now },
  usuarioId: { type: Number, ref: 'Usuario', required: true }
});

const productoSchema = new mongoose.Schema({
  productoId: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  proveedor: proveedorSchema,
  historialInventario: [historialInventarioSchema]
});

export default mongoose.model('Producto', productoSchema);