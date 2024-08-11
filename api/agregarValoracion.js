import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

export const agregarValoracion = async (idPedido, valoracion, comentarios) => {
    const url = `${ip}/NetSports/api/services/public/agregar_valoracion.php`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_pedido: idPedido,
                valoracion,
                comentarios: comentarios.join(';')
            }).toString(),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            const errorText = await response.text();
            console.error('Error al agregar la valoración, response:', errorText);
            return { success: false, message: 'Error al agregar la valoración.' };
        }
    } catch (error) {
        console.error('Error al agregar la valoración:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};
