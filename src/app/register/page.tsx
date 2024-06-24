"use client" // Indica que el archivo contiene código que se ejecuta en el cliente (navegador)

import axios, { AxiosError } from 'axios'; // Importa Axios y el tipo de error de Axios
import { FormEvent, useState } from 'react'; // Importa React y sus hooks
import { signIn } from 'next-auth/react'; // Importa la función signIn de next-auth
import { useRouter } from 'next/navigation'; // Importa el hook useRouter de Next.js

function RegisterPage() {
  // Define los estados para manejar errores, éxito, email, password y nombre completo
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const router = useRouter();

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      // Realiza una solicitud POST para registrar un nuevo usuario
      const signupResponse = await axios.post('/api/auth/signup', {
        email,
        password,
        fullname,
      });

      // Intenta iniciar sesión con las credenciales del nuevo usuario
      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        // Si el inicio de sesión es exitoso, muestra un mensaje de éxito y limpia los campos
        setSuccess("Account created successfully");
        setEmail("");
        setPassword("");
        setFullname("");
        return router.push("/"); // Redirige a la página principal
      }
  
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        // Si ocurre un error de Axios, muestra el mensaje de error correspondiente
        setError(error.response?.data.message);
      }
    }
  }

  // Función que maneja el clic en el enlace para registrarse
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace
    router.push('/'); // Redirige a la página principal
  }

  return (
    // Contenedor principal con estilos de Tailwind CSS
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black">
      <h2 className="text-3xl font-bold mb-6 text-blue-500">Registrarte</h2>
      <div className="flex justify-center items-center w-full max-w-md">
        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 border border-gray-700 p-4 flex flex-col justify-center items-center">
          <input 
            type="text" 
            placeholder="Username" 
            name="fullname" 
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-4 text-white bg-gray-800"
          />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-4 text-white bg-gray-800"
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-4 text-white bg-gray-800"
          />
          <button 
            className="w-full p-2 bg-blue-500 text-white font-bold uppercase duration-200 hover:bg-blue-600 rounded-lg">
            Registrarte
          </button>
          {/* Muestra mensajes de éxito o error si existen */}
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <p className="text-2xl text-center text-white mt-4">
        ¿Ya tienes una cuenta?{' '}
        <a href="/register" onClick={handleRegisterClick} className="underline hover:text-blue-900">
          Iniciar sesión
        </a>
      </p>
    </main>
  );
}

export default RegisterPage; // Exporta el componente para su uso en otras partes de la aplicación
