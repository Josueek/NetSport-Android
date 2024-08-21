// Archivo: cambiarContrasena.js

import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

export const cambiarContrasena = async (dataClient) => {
    const url = `${ip}/NetSports/api/services/public/cambiar_contrasena.php`;

    // Aseguramos que los parámetros enviados sean los correctos
    const formattedData = {
        userId: dataClient.userId,  // Cambiamos de user_id a userId
        newPassword: dataClient.newPassword,  // Cambiamos de new_password a newPassword
    };

    try {
        console.log('Sending request to:', url);
        console.log('Client data:', formattedData);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formattedData).toString(),
        });

        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};
