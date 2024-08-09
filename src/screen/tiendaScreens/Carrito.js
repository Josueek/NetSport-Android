import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Alert, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import * as Constantes from '../../utils/constantes';

const Carrito = ({ navigation }) => {
    const [carritoItems, setCarritoItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [envio, setEnvio] = useState(0);
    const [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchCarrito();
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
                            const nuevoCarrito = items.filter(item => item.id !== itemId);
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
        Alert.alert(
            'Confirmación',
            '¿Estás seguro que quieres limpiar el carrito?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Limpiar', 
                    onPress: async () => {
                        await AsyncStorage.removeItem('carrito');
                        setCarritoItems([]);
                        setSubtotal(0);
                        setEnvio(0);
                        setTotal(0);
                    }, 
                    style: 'destructive' 
                }
            ]
        );
    };

    const generarNumeroPedido = () => {
        const numeroPedido = Math.floor(100000 + Math.random() * 900000).toString();
        return `ORD-${numeroPedido}`;
    };

    const renderItem = ({ item }) => {
        if (!item || !item.nombre || !item.precio || !item.cantidad || !item.talla || !item.color) {
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
                <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.deleteButton}>
                    <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            data={carritoItems}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
                    <TouchableOpacity style={styles.pedidoButton} onPress={() => navigation.navigate('ConfirmarPedido')}>
                        <Text style={styles.pedidoButtonText}>Realizar Pedido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={limpiarCarrito} style={styles.limpiarButton}>
                        <Text style={styles.limpiarButtonText}>Limpiar Carrito</Text>
                    </TouchableOpacity>
                </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchCarrito} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    carritoText: {
        marginTop: 40,
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    numeroPedidoText: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    itemDetails: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
    },
    imagen: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    imagenPlaceholder: {
        width: 100,
        height: 100,
        marginRight: 16,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    imagenPlaceholderText: {
        fontSize: 12,
        color: '#666',
    },
    deleteButton: {
        marginLeft: 10,
    },
    summaryContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    summaryText: {
        fontSize: 18,
        marginBottom: 8,
    },
    pedidoButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    pedidoButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    limpiarButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    limpiarButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Carrito;
