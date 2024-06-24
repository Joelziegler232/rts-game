// Importa los hooks y funciones necesarios de next-auth/react
import { useSession, signOut } from "next-auth/react";

// Define el componente funcional ProfilePage
function ProfilePage() {
  // Usa el hook useSession para obtener los datos de la sesión y el estado de autenticación
  const { data: session, status } = useSession();

  // Define una función para cerrar la sesión cuando se llame
  const handleSignOut = () => {
    signOut();
  };

  // Renderiza el componente
  return (
    <div>
      {/* Título de la página de perfil */}
      <h1 className="font-bold text-3xl">Profile</h1>

      {/* Muestra los datos de la sesión y el estado en formato JSON dentro de un elemento <pre> */}
      <pre className="bg-zinc-800 p-4">
        {JSON.stringify({ session, status }, null, 2)}
      </pre>

      {/* Si hay una sesión activa, muestra el botón para cerrar sesión */}
      {session && (
        <button
          // Estilo del botón usando clases de Tailwind CSS
          className="bg-zinc-800 px-4 py-2 block mb-2"
          // Llama a handleSignOut cuando se haga clic en el botón
          onClick={handleSignOut}
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default ProfilePage;
