// API para verificar los datos del login
export const loginClient = async (loginData) => {
    const url = 'http://10.10.2.144/NetSports/api/services/public/login_cliente.php';

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
    const url = 'http://10.10.2.144/NetSports/api/services/public/datos_usuario.php';

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