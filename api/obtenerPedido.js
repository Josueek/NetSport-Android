import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

export const obtenerPedidos = async () => {
    const url = `${ip}/NetSports/api/services/public/obtener_pedido.php`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            const errorText = await response.text();
            console.error('Error al obtener los pedidos, response:', errorText);
            return { success: false, message: 'Error al obtener los pedidos.' };
        }
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};

export const eliminarPedido = async (id_pedido) => {
    const url = `${ip}/NetSports/api/services/public/obtener_pedido.php?id_pedido=${id_pedido}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            const errorText = await response.text();
            console.error('Error al eliminar el pedido, response:', errorText);
            return { success: false, message: 'Error al eliminar el pedido.' };
        }
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};

