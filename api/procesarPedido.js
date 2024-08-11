import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

export const procesarPedido = async (pedidoData) => {
    const url = `${ip}/NetSports/api/services/public/procesar_pedido.php`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        });

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};
