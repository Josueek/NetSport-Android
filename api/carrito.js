import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarCarrito = async (userId, producto) => {
    try {
        const carrito = await obtenerCarrito(userId);
        carrito.push(producto);
        await AsyncStorage.setItem(`carrito_${userId}`, JSON.stringify(carrito));
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
    }
};

export const obtenerCarrito = async (userId) => {
    try {
        const carrito = await AsyncStorage.getItem(`carrito_${userId}`);
        return carrito ? JSON.parse(carrito) : [];
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return [];
    }
};

export const limpiarCarrito = async (userId) => {
    try {
        await AsyncStorage.removeItem(`carrito_${userId}`);
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
    }
};
