// Definición de la interfaz Units para representar las características de las unidades en el contexto específico
export default interface Units {
  // Identificador único de la unidad
  id: number;
  // Nombre de la unidad
  name: string;
  // Imagen de la unidad, representada como un nodo React
  img: React.ReactNode;
  // precio de la unidad
  precio: number;
  // Tiempo de incremento de la unidad
  incrementador_time: number;
  // Nivel de la unidad
  level: number;
  // Nivel de desbloqueo de la unidad
  desbloqueo: number;
}
