
import Generadores from "../generadores/objects/generador";

export function updateData(generador: Generadores) {
  const currentTime: Date = new Date();
  console.log(`This is the current time: ${currentTime}, the generador time is: ${generador.updateTime}`);

  const timeDifference: number = (currentTime.getTime() - generador.updateTime.getTime()) / 60000;
  console.log(`The time difference is: ${timeDifference} minutes`);

  let produccionHora: number = generador.obreros * generador.level * 1;
  if (generador.aumentar) {
    produccionHora *= 1.3;
  }

  const productionAmount = produccionHora * (timeDifference / 60);
  if (productionAmount >= generador.maxCapacity) {
    generador.updateTime = currentTime;
    generador.capacity = generador.maxCapacity;
  } else {
    generador.produccion_hora = produccionHora;
    generador.capacity = productionAmount;
    generador.updateTime = currentTime;
  }

  return generador;
}


