const baseURL = '/api';

// Función para obtener todos los mensajes
export const getMessages = async () => {
  try {
    const response = await fetch(`${baseURL}/messages`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
  }
};

// Función para enviar un nuevo mensaje
export const sendMessage = async (sender: any, content: any) => {
  try {
    const response = await fetch(`${baseURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender, content }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
  }
};
