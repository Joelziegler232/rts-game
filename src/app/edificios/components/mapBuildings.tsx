import { Dispatch, SetStateAction, useState } from "react";
import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  ayuntamiento_Array,
} from "../utils/StructuresData";
import Image from "next/image";
import BuildingDetails from "./building";
import Generadores from "@/app/generadores/objects/generador";
import Ayuntamiento from "@/app/generadores/objects/ayuntamiento";
import { units } from "./progressbar";
import Unit from "../units/units";

const defaultBuilding: Generadores = {
  id: 1,
  name: "Generador de madera",
  img: (
    <Image
      key="GeneradorDeMadera"
      src="/madera_generador.png"
      width={200}
      height={210}
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
  updateTime: new Date()
};

const defaultAyuntamiento: Ayuntamiento = {
  id: 2,
  name: 'Casa de Oración',
  precio: 5,
  producing: '',
  img: (
    <Image
      key="BattasImg"
      src="/casa_oracion.png"
      width={200}
      height={210}
      alt="png of the Ayuntamiento"
    />
  ),
  produccion_hora: 1,
  obreros: 1,
  level: 1,
  desbloqueo: 1,
  maxObreros: 10,
  maxCap: 20,
  position: {x: 0, y: 0}



}

export default function MapBuildings(
  { setAyuntamientoMenu, ayunMenu }: { setAyuntamientoMenu: Dispatch<SetStateAction<boolean>>, ayunMenu: boolean }
) {
  const [visibleBuildingDetails, setvisibleBuildingDetails] = useState(false);
  const [visibleAyuntamientoDetails, setvisibleAyuntamientoDetails] = useState(false)
  const [ayuntamientoInfo, setAyuntamientoInformation] = useState(defaultAyuntamiento)
  const [BuldingInformation, setBuldingInformation] = useState(defaultBuilding);
  

  function generadorData(index: number) {

    const building = lumber_camp_Array.find(
      (generador) => generador.id === index
    )
    if (building) {
      setBuldingInformation(building);
      setvisibleBuildingDetails(!visibleBuildingDetails);
      // console.log(building)
      // console.log(visibleBuildingDetails)
    }
  }

  
  function ayuntamientoMenu(index: number) {

    const ayuntamiento = ayuntamiento_Array.find(
      (ayuntamiento) => ayuntamiento.id === index
    )
    if (ayuntamiento) {
      setAyuntamientoInformation(ayuntamiento);
      setvisibleAyuntamientoDetails(!visibleAyuntamientoDetails);
    }
  }


  
  return (
    <div>
      
      {lumber_camp_Array.map((structure, index) => (
        <div
          key={index + "_generador_de_madera"}
          className="absolute justify-center items-center"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
          
        >
          <i onClick={() => generadorData(index)} >
          <Image
            key="GeneradorDeMadera"
            src="/madera_generador.png"
            width={180}
            height={190}
            alt="png of Generador de madera"
          />
          </i>
          
          {/* {structure.img} */}
          <BuildingDetails
            generador={BuldingInformation}
            state={visibleBuildingDetails}
            buildingId={structure.id}
          />
        </div>
      ))}
      {stone_mine_Array.map((structure, index) => (
        <div
          key={index + "_stone_mine"}
          className="absolute w-10 h-10 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[37deg] -skew-x-[15deg]"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
        ></div>
      ))}
      {ayuntamiento_Array.map((structure, index) => (
        <div
          key={index + "_ayun"}
          className="absolute justify-center items-center"
          //   className="absolute w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[40deg] -skew-x-[6deg]"
          style={{
            left: Math.floor(structure.position.x / 30) * 30,
            top: Math.floor(structure.position.y / 30) * 30,
          }}
          onClick={() => setAyuntamientoMenu(!ayunMenu)}

        >
          <Image
            key="Ayun"
            src="/casa_oracion.png"
            width={180}
            height={190}
            alt="jpeg de Ayuntamiento"
          />
          
        </div>
      ))}
      {units.map((index) => (
        <div key={index + "_Unit"}>
          <Unit/>
        </div>
      ))}
    </div>
  );
}
