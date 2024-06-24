// Definición de la interfaz Generadores para representar las características de los generadores en un contexto específico
export default interface Generadores {
  // Identificador único del generador
  id: number;
  // Nombre del generador
  name: string;
  // Imagen del generador, representada como un nodo React
  img: React.ReactNode;
  // precio del generador
  precio: number;
  // Producción por hora del generador
  produccion_hora: number;
  // Número de trabajadores del generador
  obreros: number;
  // Nivel del generador
  level: number;
  // Nivel de desbloqueo del generador
  desbloqueo: number;
  // Número máximo de trabajadores del generador
  maxObreros: number;
  // Capacidad actual del generador (opcional)
  capacity?: number;
  // Capacidad máxima del generador
  maxCapacity: number;
  // Posición del generador en el mapa
  position: { x: number; y: number };
  // Fecha y hora de la última actualización del generador
  updateTime: Date;
  // Indica si el generador tiene un impulso (Aumentar) activado
  aumentar: boolean;
}
