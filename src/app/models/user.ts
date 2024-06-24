import { Schema, model, models } from "mongoose";

// Define el esquema para el modelo de Usuario (UserSchema)
const UserSchema = new Schema({
  fullname: {
    type: String, // El tipo de dato es String
    required: [true, "El nombre completo es obligatorio"], // Es un campo obligatorio con un mensaje de error personalizado en español
    minlength: [3, "El nombre completo debe tener al menos 3 caracteres"], // Longitud mínima de 3 caracteres con un mensaje de error personalizado en español
    maxlength: [50, "El nombre completo debe tener como máximo 50 caracteres"] // Longitud máxima de 50 caracteres con un mensaje de error personalizado en español
  },
  email: {
    type: String, // El tipo de dato es String
    required: [true, "El correo electrónico es obligatorio"], // Es un campo obligatorio con un mensaje de error personalizado en español
    unique: true, // El valor debe ser único en la colección
    match: [/.+@.+\..+/, "El correo electrónico no es válido"] // Debe coincidir con un patrón de expresión regular para validar el formato de correo electrónico con un mensaje de error personalizado en español
  },
  password: {
    type: String, // El tipo de dato es String
    required: [true, "La contraseña es obligatoria"], // Es un campo obligatorio con un mensaje de error personalizado en español
    select: false // No se incluye en las consultas por defecto para mayor seguridad
  }
}, {
  timestamps: true // Añade automáticamente las propiedades createdAt y updatedAt
});

// Crea el modelo User si no existe, o usa el modelo existente si ya está definido
const User = models.User || model("User", UserSchema);

// Exporta el modelo para que pueda ser usado en otras partes de la aplicación
export default User;
