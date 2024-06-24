import axios, { AxiosError } from 'axios'; // Importa Axios y el tipo de error de Axios
import { FormEvent, useState } from 'react'; // Importa React y sus hooks
import { signIn } from 'next-auth/react'; // Importa la función signIn de next-auth
import { useRouter } from 'next/navigation'; // Importa el hook useRouter de Next.js

// Define el componente funcional LoginPage
const LoginPage: React.FC = () => {
  // Define el estado para manejar errores
  const [error, setError] = useState<string | undefined>();
  const router = useRouter(); // Obtiene la instancia del enrutador

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    setError(undefined); // Resetea el estado de error

    try {
      // Crea un objeto FormData a partir del formulario enviado
      const formData = new FormData(e.currentTarget);

      // Intenta iniciar sesión con las credenciales del formulario
      const res = await signIn('credentials', {
        email: formData.get('email'), // Obtiene el email del FormData
        password: formData.get('password'), // Obtiene la contraseña del FormData
        redirect: false, // Previene la redirección automática
      });

      if (res?.error) {
        // Si hay un error en la respuesta, actualiza el estado de error
        setError(res.error as string);
      } else if (res?.ok) {
        // Si el inicio de sesión es exitoso, redirige a la página /edificios
        router.push("/edificios");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Maneja errores específicos de Axios, como credenciales inválidas
        setError("Invalid credentials");
      } else {
        // Maneja errores inesperados
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-black">
      <h2 className="text-3xl font-bold mb-6 text-blue-500">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 border border-gray-700 p-4 flex flex-col justify-center items-center">
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="w-full p-2 border border-gray-700 rounded-lg mb-4 text-white bg-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="w-full p-2 border border-gray-700 rounded-lg mb-4 text-white bg-gray-800"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold uppercase duration-200 hover:bg-blue-600 rounded-lg"
        >
          Iniciar sesión
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
};

export default LoginPage; // Exporta el componente para su uso en otras partes de la aplicación
