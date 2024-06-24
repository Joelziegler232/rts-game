"use client";
import "tailwindcss/tailwind.css";

import { useState, useEffect, useRef } from "react"; // Importa hooks de React
import { useRouter } from "next/navigation"; // Importa el hook useRouter de Next.js
import { signOut } from "next-auth/react"; // Importa la función signOut de next-auth/react
// Imports locales
import Image from "next/image"; // Componente de Next.js para mostrar imágenes de forma optimizada
import Mostrar from "./components/mostrarO"; // Componente de colocación de objetos
import MapBuildings from "./components/mapBuildings"; // Componente del mapa de edificios
import CreacionMenu from "./components/creacionMenu"; // Menú de creación de estructuras
import Progressbar, { units } from "./components/progressbar"; // Barra de progreso y unidades
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BuildingDrawer from "./components/buildDrawer";
//Importación para Sistema de Mensajes:
import MessageIcon from "./components/MessageIcon";


import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  ayuntamiento_Array,
} from "./utils/StructuresData"; // Importa datos de estructuras de construcción

// Objeto de usuario y aumentador
import { User } from "../objects/user"; // Importa el objeto User
import { Aumentador } from "../objects/aumentar"; // Importa el objeto aumentador


import Generadores from "../generadores/objects/generador"; // Importa el objeto Generadores
import Units from "../generadores/objects/Units"; // Importa el objeto Units
import AyuntamientoMenu from "./components/ayuntamientoMenu";

const aumentar: Aumentador[] = [
  
]
// Objeto de usuario
const user: User = {
  id: 1,
  name: "Pedro",
  username: "elPepe",
  password: "aa",
  level: 1,
  aumentador: aumentar, 
  obreros: 3,
};

// Función principal Home
export default function Home() {
  // Definición de estados con hooks
  const [mostrarApear, setMostrarApear] = useState(false); // Estado para controlar la aparición del componente Mostrar
  const [structure, setStructure] = useState<number | null>(null); // Estado para almacenar el tipo de estructura seleccionada
  const cursorPosition = useRef({ x: 0, y: 0 }); // Referencia mutable para almacenar la posición del cursor
  const [progressBar, setProgressBar] = useState<boolean | null>(null); // Estado para controlar la aparición de la barra de progreso
  const [unit, setUnit] = useState<Units>(); // Estado para almacenar la unidad seleccionada
  const [quantity, setQuantity] = useState(0); // Estado para almacenar la cantidad de unidades
  const [maxCreacion, setMaxCreacion] = useState(false); // Estado para controlar la creación máxima de unidades
  const [appliedAumentar, setAppliedAumentar] = useState<Aumentador | null>(null); // Estado para almacenar el impulso aplicado
  const [ayuntamientoMenu, setAyuntamientoMenu] = useState(false); // Estado para controlar la aparición del menú del ayuntamiento

  const router = useRouter(); // Instancia del hook useRouter de Next.js para manejar la navegación

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [playerMoney, setPlayerMoney] = useState(5000);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBuild = async (precio: number) => {
    const newMoney = playerMoney - precio;
    setPlayerMoney(newMoney);
    handleCloseDrawer();
  };

  // Manejador de cierre de sesión
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "http://localhost:3000" }); // Llama a la función signOut de next-auth/react
  };

  // Efecto para registrar el evento de movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorPosition.current = { x: event.clientX, y: event.clientY }; // Actualiza la posición del cursor en la referencia
    };

    document.addEventListener("mousemove", handleMouseMove); // Registra el evento de movimiento del mouse

    return () => {
      document.removeEventListener("mousemove", handleMouseMove); // Elimina el evento de movimiento del mouse al desmontar
    };
  }, []);

  // Efecto para controlar la aparición del componente Mostrar
  useEffect(() => {
    if (structure) {
      setMostrarApear(true); // Establece la aparición del Mostrar
      document.body.classList.add("cursor-none"); // Agrega una clase al body para ocultar el cursor
    }
  }, [structure]);

  // Renderizado del componente
  return (
    <main className="flex-direction: row; min-h-screen items-center justify-center relative">
      <button className="fixed  " onClick={handleSignOut}>
        Cerrar sesión
      </button>

      {/* Renderiza el menú de creación si hay elementos en ayuntamiento_Array */}
      {ayuntamiento_Array.length ? (
        <CreacionMenu
          user={user}
          setProgressBar={setProgressBar}
          setUnit={setUnit}
          setQuantity={setQuantity}
          quantity={quantity}
        />
      ) : null}

      {/* Renderiza la barra de progreso si progressBar es true */}
      {progressBar ? (
        <Progressbar
          running={progressBar}
          unit={unit!}
          setProgressBar={setProgressBar}
          quantity={quantity}
          ayuntamiento={ayuntamiento_Array[0]!}
          setMaxCreacion={setMaxCreacion}
          setQuantity={setQuantity}
          aumentar={appliedAumentar}
        />
      ) : null}

{ayuntamientoMenu && (
  <AyuntamientoMenu
    ayuntamiento={ayuntamiento_Array[0]}
    user={user}
    setAppliedAumentar={setAppliedAumentar}
    progressBar={progressBar}
  />
)}

<Mostrar
  appearence={mostrarApear}
  structure={structure}
/>

<MapBuildings
  setAyuntamientoMenu={setAyuntamientoMenu}
  ayunMenu={ayuntamientoMenu}
/>

<Container className="fixed">
  <div style={{ position: 'relative' }}>
    <div
      className="bg-blue-500 text-white rounded-lg p-2"
      style={{ position: 'absolute', bottom: '100%', left: '15%', transform: 'translateX(-100%) translateY(200%)' }}
    >
      Dinero Total: ${playerMoney}
    </div>
  </div>
  <div className="fixed bottom-0 left-0 mb-4 ml-4">
    <Button
      className=""
      variant="contained"
      color="primary"
      onClick={handleOpenDrawer}
    >
      Construir Edificios
    </Button>
    <BuildingDrawer
      open={drawerOpen}
      onClose={handleCloseDrawer}
      onBuild={handleBuild}
      setStructure={setStructure}
    />
  </div>
</Container>

<MessageIcon />

<Image
  src="/Mapaage.jpg"
  alt="map"
  width={2000}
  height={500}
  onClick={() => {
    if (mostrarApear) {
      checkTerrain(cursorPosition.current, structure)
        ? addStructure(cursorPosition.current, structure)
        : null;
    }
    if (mostrarApear) {
      setMostrarApear(false);
      setStructure(null);
      document.body.classList.remove("cursor-none");
    }
  }}
  className="inset-0 w-full h-full object-cover"
/>
</main>
);
}

console.log(units); // Muestra en consola la variable units

// Función para verificar el terreno
function checkTerrain(
  position: { x: number; y: number },
  structure: number | null
): boolean {
  return true; // Por ahora siempre devuelve true
}

// Array de generadores
const generadorArray: Generadores[] = [
  {
    id: 1,
    name: "Fabrica de madera",
    img: (
      <Image
        key="GeneradorDeMadera"
        src="/madera_generador.png"
        width={60}
        height={70}
        alt="png of Generador de madera"
      />
    ),
    precio: 100,
    produccion_hora: 1,
    obreros: 1,
    level: 1,
    desbloqueo: 1,
    maxObreros: 1,
    position: { x: 0, y: 0 },
    aumentar: false,
    maxCapacity: 200,
    updateTime: new Date(),
  },
];

// Función para agregar una nueva estructura
function addStructure(
  position: { x: number; y: number },
  structure: number | null
): void {
  let newStructure: any;
  switch (structure) {
    case 1:
      // Agrega una estructura de generador de madera al array correspondiente
      newStructure = {
        id: lumber_camp_Array.length,
        position: { x: position.x, y: position.y },
        name: "Fabrica de madera",
        img: (
          <Image
            key="GeneradorDeMadera"
            src="/madera_generador"
            width={60}
            height={70}
            alt="png of Generador de madera"
          />
        ),
        precio: 100,
        produccion_hora: 1,
        obreros: 1,
        level: 1,
        desbloqueo: 1,
        maxObreros: 1,
        aumentar: false,
        maxCapacity: 200,
        updateTime: new Date(),
      };
      lumber_camp_Array.push(newStructure); // Agrega la estructura al array de campamentos madereros
      break;
    case 2:
      // Agrega una estructura de ayuntamiento al array correspondiente
      newStructure = {
        id: ayuntamiento_Array.length,
        name: "Casa de Oración",
        precio: 5,
        producing: "",
        img: (
          <Image
            key="AyuntamientoImg"
            src="/casa_oracion"
            width={60}
            height={70}
            alt="jpeg of the Ayuntamiento"
          />
        ),
        produccion_hora: 1,
        obreros: 1,
        level: 1,
        desbloqueo: 1,
        maxObreros: 10,
        maxCap: 5,
        position: { x: position.x, y: position.y },
      };
      ayuntamiento_Array.push(newStructure); // Agrega la estructura al array de ayuntamientos
      break;
    default:
      break;
  }
}
