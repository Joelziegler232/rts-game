import { useState, useEffect } from "react";
import Generadores from "@/app/generadores/objects/generador";
import { updateData } from "@/app/logic/production";

export default function BuildingDetails({
  generador,
  state,
  buildingId,
}: {
  generador: Generadores;
  state: boolean;
  buildingId: number;
}) {
  // Estado para mantener el generador actualizado
  const [updatedGenerador, setUpdatedGenerador] = useState<Generadores>(generador);

  // Efecto para actualizar el genrador cuando el estado cambie
  useEffect(() => {
    const updatedData = updateData(generador);
    setUpdatedGenerador(updatedData);
  }, [state, generador]);

  if (state && buildingId === updatedGenerador.id) {
    return (
      <div className="show-detail">
        {updatedGenerador.name}
        <br />
        Produccion por minuto: {updatedGenerador.produccion_hora}
        <br />
        Obreros: {updatedGenerador.obreros} <br />
        Capacity: {updatedGenerador.capacity} / {updatedGenerador.maxCapacity}
      </div>
    );
  } else {
    return null;
  }}
