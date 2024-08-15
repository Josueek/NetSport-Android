import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, StyleSheet, RefreshControl } from 'react-native';
import { obtenerPedidos } from '../../../api/obtenerPedido';
import { agregarValoracion } from '../../../api/agregarValoracion'; // Asegúrate de que esta importación sea correcta
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

const PedidosScreen = () => {
    const [pedidos, setPedidos] = useState([]);
    const [valoracion, setValoracion] = useState({});
    const [comentario, setComentario] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const fetchPedidos = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const response = await obtenerPedidos(userId);
        if (response.success) {
            setPedidos(response.pedidos);
        } else {
            Alert.alert('Error', response.message);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPedidos().then(() => setRefreshing(false));
    }, []);

    const handleEliminarPedido = async (id_pedido) => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro que quieres cancelar este pedido?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            const url = `${ip}/NetSports/api/services/public/obtener_pedido.php?id_pedido=${id_pedido}`;
                            const response = await fetch(url, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            const jsonResponse = await response.json();
                            if (jsonResponse.success) {
                                setPedidos(pedidos.filter(pedido => pedido.id_pedido !== id_pedido));
                                Alert.alert('Éxito', jsonResponse.message);
                            } else {
                                Alert.alert('Error', jsonResponse.message);
                            }
                        } catch (error) {
                            console.error('Error al eliminar el pedido:', error);
                            Alert.alert('Error', 'Error de red. Por favor, inténtelo de nuevo.');
                        }
                    },
                },
            ]
        );
    };

    const handleAgregarValoracion = async (idPedido) => {
        const valor = parseInt(valoracion[idPedido], 10);
        const comentarioTexto = comentario[idPedido] || '';

        if (valor < 1 || valor > 5) {
            Alert.alert('Error', 'La valoración debe estar entre 1 y 5');
            return;
        }

        Alert.alert(
            'Confirmar',
            '¿Estás seguro que quieres agregar esta valoración?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Agregar',
                    onPress: async () => {
                        try {
                            const url = `${ip}/NetSports/api/services/public/agregar_valoracion.php`;
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    idDetallePedido: idPedido,
                                    calificacion: valor,
                                    comentario: comentarioTexto,
                                }),
                            });

                            const jsonResponse = await response.json();
                            if (jsonResponse.success) {
                                Alert.alert('Éxito', jsonResponse.message);
                                // Actualiza la lista de pedidos si es necesario
                            } else {
                                Alert.alert('Error', jsonResponse.message || 'No se pudo agregar la valoración');
                            }
                        } catch (error) {
                            console.error('Error al agregar la valoración:', error);
                            Alert.alert('Error', 'Error de red. Por favor, inténtelo de nuevo.');
                        }
                    },
                },
            ]
        );
    };

    const renderPedido = ({ item }) => (
        <View style={styles.pedidoContainer}>
            <Text style={styles.pedidoText}>Pedido #{item.numero_pedido}</Text>
            <Text style={styles.pedidoText}>Producto: {item.producto}</Text>
            <Text style={styles.pedidoText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.pedidoText}>Estado: {item.estado}</Text>
            <Text style={styles.pedidoText}>Dirección: {item.direccion}</Text>
            <Text style={styles.pedidoText}>Fecha: {item.fecha_pedido}</Text>

            {item.estado === 'pendiente' && (
                <TouchableOpacity
                    style={styles.eliminarButton}
                    onPress={() => handleEliminarPedido(item.id_pedido)}
                >
                    <Text style={styles.buttonText}>Cancelar Pedido</Text>
                </TouchableOpacity>
            )}

            {item.estado === 'finalizado' && (
                <View style={styles.valoracionContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa una valoración (1-5)"
                        keyboardType="numeric"
                        value={valoracion[item.id_detallepedido]}
                        onChangeText={(text) => setValoracion({ ...valoracion, [item.id_detallepedido]: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa un comentario"
                        value={comentario[item.id_detallepedido]}
                        onChangeText={(text) => setComentario({ ...comentario, [item.id_detallepedido]: text })}
                    />
                    <TouchableOpacity
                        style={styles.agregarButton}
                        onPress={() => handleAgregarValoracion(item.id_detallepedido)}
                    >
                        <Text style={styles.buttonText}>Agregar Valoración</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={pedidos}
                renderItem={renderPedido}
                keyExtractor={item => item.id_detallepedido.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    pedidoContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    pedidoText: {
        fontSize: 16,
        marginBottom: 8,
    },
    eliminarButton: {
        backgroundColor: '#ff6666',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    agregarButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    valoracionContainer: {
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
    },
});

export default PedidosScreen;
