// Archivo que maneja IP
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

// API para verificar los datos del login
export const loginClient = async (loginData) => {
    const url = `${ip}/NetSports/api/services/public/login_cliente.php`;

    try {
        console.log('Sending request to:', url);
        console.log('Client data:', loginData);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(loginData).toString(),
        });

        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};

// API para capturar datos del usuario iniciado
export const PerfilClient = async (dataClient) => {
    const url = `${ip}/NetSports/api/services/public/datos_usuario.php`;

    try {
        console.log('Sending request to:', url);
        console.log('Client data:', dataClient);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(dataClient).toString(),
        });

        const textResponse = await response.text();
        console.log('Raw server response:', textResponse);

        const jsonResponse = JSON.parse(textResponse);
        console.log('Parsed server response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};

// API para guardar cambios en el perfil
export const EditarClient = async (dataClient) => {
    const url = `${ip}/NetSports/api/services/public/actualizar_perfil_cliente.php`;

    try {
        console.log('Sending request to:', url);
        console.log('Client data:', dataClient);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(dataClient).toString(),
        });

        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};

// API para cerrar sesión
