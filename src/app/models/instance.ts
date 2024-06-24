import mongoose, { Schema } from "mongoose"; // Importa mongoose y Schema desde mongoose

// Define el esquema para la instancia de usuario (userInstanceSchema)
const userInstanceSchema = new Schema(
  {
    fullname: String, // Campo para el nombre completo del usuario
    email: String, // Campo para el correo electrónico del usuario
    password: String // Campo para la contraseña del usuario
  }
);

// Crea el modelo UserInstance si no existe, o utiliza el modelo existente si ya está definido
const UserInstance = mongoose.models.Instance || mongoose.model("Instance", userInstanceSchema);

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
export default UserInstance;
