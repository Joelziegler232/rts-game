import Units from "@/app/generadores/objects/Units";
import Ayuntamiento from "@/app/generadores/objects/ayuntamiento";
import { Aumentador } from "@/app/objects/aumentar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ProgressbarProps {
  running: boolean;
  unit: Units;
  setProgressBar: Dispatch<SetStateAction<boolean | null>>;
  quantity: number;
  ayuntamiento: Ayuntamiento;
  setMaxCreacion: Dispatch<SetStateAction<boolean>>;
  setQuantity: Dispatch<SetStateAction<number>>;
  aumentar: Aumentador | null;
}

export default function Progressbar({
  running,
  unit,
  quantity,
  setProgressBar,
  ayuntamiento,
  setMaxCreacion,
  setQuantity,
  aumentar,
}: ProgressbarProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(running);
  let maxAlcanzado = false;

  if (quantity >= ayuntamiento.maxCap!) {
    quantity = ayuntamiento.maxCap!;
    maxAlcanzado = true;
  }

  useEffect(() => {
    console.log("useEffect called");
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= unit.incrementador_time * quantity!) {
            setIsRunning(false);
            setProgressBar(false);
            console.log("addTroopToDB called with quantity:", quantity);
            addTroopToDB(unit, quantity);
            setQuantity(0);
            return prevSeconds;
          } else if (aumentar) {
            return prevSeconds + aumentar.aumentar * ayuntamiento.obreros;
          } else {
            return prevSeconds + 1 * ayuntamiento.obreros;
          }
        });
      }, 1000);
    }

    return () => {
      console.log("Cleanup interval");
      clearInterval(intervalId);
    };
  }, [isRunning, unit.incrementador_time, quantity, aumentar, ayuntamiento.obreros]);

  let progress = (seconds / (unit.incrementador_time * quantity!)) * 100;

  const hourstotal = Math.floor((unit.incrementador_time * quantity! || 0) / 3600);
  const minutestotal = Math.floor(((unit.incrementador_time * quantity! || 0) % 3600) / 60);
  const secondstotal = (unit.incrementador_time * quantity! || 0) % 60;

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  console.log("Current quantity:", quantity);

  function addTroopToDB(unit: Units, quantity: number) {
    console.log("addTroopToDB executing, adding", quantity, "units.");
    for (let i = 0; i < quantity; i++) {
      units.push(unit);
    }
  }

  const MaxCreacion = () => (
    <span>
      Has alcanzado el máximo <br />
      límite de creación de: {ayuntamiento.maxCap}
    </span>
  );

  return (
    <div className="absolute flex flex-col justify-center items-center left-1/2 top-0 transform -translate-x-1/2">
      <div className="relative w-[200px] h-5 border border-gray-300 rounded-lg bg-gray-200 overflow-hidden">
        <div className="h-[100%] bg-black transition-all" style={{ width: `${progress}%` }}></div>
      </div>
      <span>
        {formatTime(Math.floor(seconds / 3600))}:{formatTime(Math.floor((seconds % 3600) / 60))}:{formatTime(Math.floor(seconds % 60))} /
        {formatTime(hourstotal)}:{formatTime(minutestotal)}:{formatTime(secondstotal)}
      </span>
      <div>
        Creando: {quantity}x de: {unit.name} <br />
        Obreros: {ayuntamiento.obreros}
        {maxAlcanzado ? <MaxCreacion /> : null}
      </div>
    </div>
  );
}

export const units: Units[] = [];
