// archivo: api/producto.js

import * as Constantes from '../src/utils/constantes';
const ip = Constantes.IP;

/**
 * Obtiene los detalles de un producto específico
 * @param {number} idProducto - ID del producto a obtener
 * @returns {Promise<object>} - Detalles del producto
 */
export const obtenerDetalleProducto = async (idProducto) => {
    const url = `${ip}/NetSports/api/services/public/detalle_producto.php?id_producto=${idProducto}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonResponse = await response.json();
        console.log('Respuesta de la API:', jsonResponse); // Agrega esta línea para verificar
        return jsonResponse;
        
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        return { success: false, message: 'Error de red. Por favor, inténtelo de nuevo.' };
    }
};
