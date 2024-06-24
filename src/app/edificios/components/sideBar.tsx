import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/app/objects/user";
import Generadores from "@/app/generadores/objects/generador";

const iconsArray: any[] = [
  {
    id: 1,
    name: "Generador de madera",
    img: (
      <Image
        key="GeneradorDeMadera"
        src="/Aserradero.jpg"
        width={100}
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
  },
  {
    id: 2,
    name: "Ayuntamiento",
    img: (
      <Image
        key="Ayuntamiento"
        src="/Ayuntamiento.jpeg"
        width={100}
        height={70}
        alt="jpeg of Ayuntamiento"
      />
    ),
    precio: 100,
    produccion_hora: 1,
    obreros: 1,
    level: 1,
    desbloqueo: 1,
    maxObreros: 10,
    maxCap: 15,
    position: { x: 0, y: 0 },
  },
];

export default function SideBar({
  user,
  setStructure,
}: {
  user: User;
  setStructure: Dispatch<SetStateAction<number | null>>;
}) {
  const [sideBar, setSideBar] = useState<boolean>(true);

  const SideBarIcon = ({
    generador,
    user,
  }: {
    generador: Generadores;
    user: User;
  }) => {
    if (user.level >= generador.desbloqueo) {
      return (
        <div
          className="sidebar-icon group"
          onClick={() => {
            setStructure(generador.id);
          }}
        >
          {generador.img}
          <span className="sidebar-name group-hover:scale-100">
            {generador.name}
            <br />
            Incrementador por hora: {generador.produccion_hora}
            <br />
            Precio: {generador.precio}
            <br />
            Obreros: {generador.obreros}
          </span>
        </div>
      );
    } else {
      return (
        <div className="min-lev-req group ">
          <i className="opacity-20">{generador.img}</i>
          <span className="sidebar-name group-hover:scale-100 opacity-80 flex flex-col">
            <div>{`You must be Level: ${generador.desbloqueo} to unlock ${generador.name}`}</div>
            <div>{`Current Level: ${user.level}`}</div>
          </span>
        </div>
      );
    }
  };

 
}