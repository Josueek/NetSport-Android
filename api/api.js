//Archivo que maneja IP
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

const registerClient = async (clientData) => {
  const url = `${ip}/NetSports/api/services/public/registro_condiciones.php`;

  try {
      console.log('Sending request to:', url);
      console.log('Client data:', clientData);

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
      });

      const jsonResponse = await response.json();
      console.log('Server response:', jsonResponse);
      return jsonResponse;
  } catch (error) {
      console.error('Error registering client:', error);
      return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
  }
};

export { registerClient };
