import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Alert, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { procesarPedido } from '../../../api/procesarPedido';
import * as Constantes from '../../../src/utils/constantes'; // Importar constantes para la Ipp

const Carrito = ({ navigation }) => {
    const [carritoItems, setCarritoItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [envio, setEnvio] = useState(0);
    const [total, setTotal] = useState(0);
    const [direccion, setDireccion] = useState(''); // Estado para la dirección
    const [userId, setUserId] = useState(''); // Estado para el ID del usuario
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchCarrito();
        fetchUserData(); // Obtener datos del usuario al cargar el componente
    }, []);

    const fetchCarrito = async () => {
        setRefreshing(true);
        try {
            const carrito = await AsyncStorage.getItem('carrito');
            if (carrito) {
                const items = JSON.parse(carrito);
                if (Array.isArray(items)) {
                    setCarritoItems(items);

                    // Calcular subtotal, envío y total
                    const totalSubtotal = items.reduce((sum, item) => {
                        if (item.precio && item.cantidad) {
                            return sum + (parseFloat(item.precio) * parseInt(item.cantidad, 10));
                        }
                        return sum;
                    }, 0);
                    setSubtotal(totalSubtotal);
                    const totalEnvio = Math.ceil(items.length / 5) * 2; // 2 dólares por cada 5 productos
                    setEnvio(totalEnvio);
                    setTotal(totalSubtotal + totalEnvio);
                } else {
                    console.error('Datos del carrito no válidos');
                    setCarritoItems([]);
                }
            } else {
                setCarritoItems([]);
            }
        } catch (error) {
            console.error('Error fetching carrito:', error);
            Alert.alert('Error', 'No se pudo cargar el carrito.');
        } finally {
            setRefreshing(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (user_id) {
                setUserId(user_id);
                const direccion = await fetchUserAddress(user_id);
                setDireccion(direccion);
            } else {
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
            Alert.alert('Error', 'Hubo un problema al obtener la información del usuario.');
        }
    };

    const fetchUserAddress = async (userId) => {
        try {
            const ip = Constantes.IP; // Obtener la IP del archivo de constantes
            const url = `${ip}/NetSports/api/services/public/obtener_direccion.php?user_id=${userId}`;
            const response = await fetch(url);

            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.success) {
                    return jsonResponse.direccion;
                } else {
                    Alert.alert('Error', jsonResponse.message);
                    return '';
                }
            } else {
                Alert.alert('Error', 'Error al comunicarse con el servidor.');
                return '';
            }
        } catch (error) {
            console.error('Error al obtener la dirección del usuario:', error);
            Alert.alert('Error', 'Hubo un problema al obtener la dirección del usuario.');
            return '';
        }
    };

    const eliminarProducto = async (itemId) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro que quieres eliminar este producto del carrito?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Eliminar', 
                    onPress: async () => {
                        const carrito = await AsyncStorage.getItem('carrito');
                        if (carrito) {
                            const items = JSON.parse(carrito);
                            const nuevoCarrito = items.filter(item => item.id && item.id !== itemId); // Verificar que el id no sea nulo
                            setCarritoItems(nuevoCarrito);
                            await AsyncStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                        }
                    }, 
                    style: 'destructive' 
                }
            ]
        );
    };

    const limpiarCarrito = async () => {
        try {
            await AsyncStorage.removeItem('carrito');
            setCarritoItems([]);
            setSubtotal(0);
            setEnvio(0);
            setTotal(0);
        } catch (error) {
            console.error('Error al limpiar el carrito:', error);
            Alert.alert('Error', 'Hubo un problema al limpiar el carrito.');
        }
    };

    const generarNumeroPedido = () => {
        const numeroPedido = Math.floor(100000 + Math.random() * 900000).toString();
        return `ORD-${numeroPedido}`;
    };

    const realizarPedido = async () => {
        try {
            // Verificar si el carrito tiene productos
            if (carritoItems.length === 0) {
                Alert.alert('Carrito vacío', 'No se puede realizar un pedido con el carrito vacío.');
                return;
            }
    
            // Recuperar el userId
            const userId = await AsyncStorage.getItem('user_id');
            if (!direccion || !userId) {
                Alert.alert('Error', 'No se pudo obtener la información del usuario o la dirección.');
                return;
            }
    
            const numeroPedido = generarNumeroPedido();
            const pedidoData = {
                carrito: carritoItems.map(item => ({
                    id_producto: item.id_producto, // Cambiar 'id' a 'id_producto'
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    color: item.color,
                    talla: item.talla,
                    imagen: item.imagen,
                    id_usuario: item.id_usuario // Esto se establece en el carrito, por lo que no es necesario aquí
                })),
                direccion: direccion,
                numeroPedido: numeroPedido,
                userId: userId,
            };
    
            console.log('Datos del pedido a enviar:', pedidoData); // Depuración
    
            const response = await procesarPedido(pedidoData);
    
            console.log('Respuesta de la API:', response); // Depuración
    
            if (response.success) {
                Alert.alert('Éxito', 'El pedido se ha realizado con éxito.');
                limpiarCarrito(); // Limpiar carrito después de realizar el pedido
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            Alert.alert('Error', 'Hubo un problema al procesar el pedido.');
        }
    };
    
    
    const renderItem = ({ item }) => {
        if (!item || !item.nombre || !item.precio || !item.cantidad || !item.talla || !item.color || !item.id_producto) {
            console.warn('Item del carrito no válido:', item);
            return null;
        }

        return (
            <View style={styles.itemContainer}>
                <Image
                    source={{ uri: item.imagen }} // Mostrar la imagen del producto
                    style={styles.imagen}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemText}>{item.nombre}</Text>
                    <Text style={styles.itemText}>${item.precio}</Text>
                    <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
                    <Text style={styles.itemText}>Talla: {item.talla}</Text>
                    <Text style={styles.itemText}>Color: {item.color}</Text>
                </View>
                <TouchableOpacity onPress={() => eliminarProducto(item.id_producto)} style={styles.deleteButton}>
                    <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            data={carritoItems}
            keyExtractor={(item) => item.id_producto?.toString() || Math.random().toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={() => (
                <View style={styles.headerContainer}>
                    <Text style={styles.carritoText}>Carrito</Text>
                    <Text style={styles.numeroPedidoText}>{generarNumeroPedido()}</Text>
                </View>
            )}
            ListFooterComponent={() => (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Envío: ${envio.toFixed(2)}</Text>
                    <Text style={styles.summaryText}>Total: ${total.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.pedidoButton} onPress={realizarPedido}>
                        <Text style={styles.pedidoButtonText}>Realizar Pedido</Text>
                    </TouchableOpacity>
                </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCarrito} />}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    itemText: {
        fontSize: 16,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    headerContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    carritoText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    numeroPedidoText: {
        fontSize: 18,
        marginTop: 5,
    },
    summaryContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    summaryText: {
        fontSize: 18,
        marginBottom: 5,
    },
    pedidoButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    pedidoButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    limpiarButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    limpiarButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Carrito;
