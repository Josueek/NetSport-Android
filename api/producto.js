//Archivo que maneja IP
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

// API para verificar los datos del login
export const cargarProductos = async () => {
    const url = `${ip}/NetSports/api/services/public/productos_cliente.php`;
    try {
        console.log('Sending request to:', url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
           
        });
        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error during fetching products:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};