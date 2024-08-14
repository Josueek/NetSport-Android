import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
// Componentes
import BackgroundImage from '../../components/BackgroundImage';
// Librería de iconos
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// Libreria para almacenar los productos marcados como favoritos
import AsyncStorage from '@react-native-async-storage/async-storage';
// API para capturar los datos de productos
import { cargarProductos } from '../../../api/producto';
//Cargamos el nombre del usuario
import { PerfilClient } from '../../../api/login';
//IP constantes
import * as Constantes from '../../utils/constantes';


export default function Inicio() {
    //IP
    const ip = Constantes.IP;
    //Navegabilidad
    const navigation = useNavigation();
    //Nombre del cliente
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    //Productos
    const [productos, setProductos] = useState([]);
    // Productos favoritos
    const [favoritos, setFavoritos] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    //Cargamos los datos del producto
    const fetchProductos = useCallback(async () => {
        const result = await cargarProductos();
        if (result.products) {
            setProductos(result.products);
            // Cargar favoritos desde la libreria de almacenamiento
            const storedFavoritos = await AsyncStorage.getItem('favoritos');
            if (storedFavoritos) {
                setFavoritos(JSON.parse(storedFavoritos));
            }
        } else {
            console.error(result.message);
        }
    }, []);

    /**
     * Cargamos los datos del cliennte y lo mostramos con mensaje de alerta
     * 
     */
    const fetchNombreUsuario = useCallback(async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
                const response = await PerfilClient({ user_id: userId });
                if (response.user_data) {
                    setNombre(response.user_data.nombre_cliente);
                    setApellido(response.user_data.apellido_cliente);
                    Alert.alert('Bienvenido', `Hola, ${response.user_data.nombre_cliente} ${response.user_data.apellido_cliente}!`);
                } else {
                    console.error('Error: No se pudieron cargar los datos del usuario.');
                }
            } else {
                console.error('Error: No se pudo obtener el ID del usuario.');
            }
        } catch (error) {
            console.error('Error al recuperar el nombre del usuario:', error);
        }
    }, []);

    useEffect(() => {
        fetchProductos();
        fetchNombreUsuario();
        const intervalId = setInterval(() => {
            fetchProductos();
        }, 60000); // Actualiza los datos cada 60 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [fetchProductos]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchProductos();
        setRefreshing(false);
    };

    const toggleFavorito = async (id_producto) => {
        const newFavoritos = {
            ...favoritos,
            [id_producto]: !favoritos[id_producto]
        };
        setFavoritos(newFavoritos);
        // Guardar favoritos en AsyncStorage
        await AsyncStorage.setItem('favoritos', JSON.stringify(newFavoritos));
        // Actualizar la lista de productos
        setProductos(prevProductos =>
            prevProductos.map(productos =>
                productos.id_producto === id_producto
                    ? { ...productos, favoritos: !favoritos[id_producto] }
                    : productos
            )
        );
    };

    //Cargar los detalles del producto acorde al producto seleccionado
    const handleProductPress = (id_producto) => {
        try {
            navigation.navigate('DetalleProducto', { id_producto });
        } catch (error) {
            console.log('Error al recibir el producto:', error);
        }

    };

    /**
       * Renderizamos la carta mandando los parametros de los productos
       * Cuando se preciona se manda el id_producto a la otra ventana DetallesProducto para
       * mostrar los detalles del producto y añadir al carrito
       */
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardButton} onPress={() => handleProductPress(item.id_producto)}>
            <View style={styles.card}>
                <Image source={{ uri: `${ip}/NetSports/Api/images/productos${item.imagen_portada}` }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.nombre_producto}</Text>
                <Text style={styles.categoria}>{item.nombre_categoria}</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.icono} onPress={() => toggleFavorito(item.id_producto)}>
                        <Icon
                            name={favoritos[item.id_producto] ? "heart" : "heart-outline"}
                            size={25}
                            color={favoritos[item.id_producto] ? "#d3dfdg" : "#000"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.precio}>${item.precio_final}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <BackgroundImage background={"General"}>
            <View style={styles.container}>
                <Text style={styles.title}>Productos disponibles</Text>
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id_producto.toString()}
                    numColumns={2} // Configura FlatList para que tenga dos columnas
                    columnWrapperStyle={styles.row} // Asegura que las columnas tengan espacio entre ellas
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
    }, cardButton: {
        flex: 1,
    },
    imagen: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    nombre: {
        color: '#333',
        fontWeight: '800',
        fontSize: 13,
        marginBottom: 5,
        textAlign: 'center',
    },
    categoria: {
        color: '#666',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    precio: {
        color: '#F5853F',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'right',
        flex: 1,
    },
    title: {
        fontSize: 26,
        marginTop: 80,
        textAlign: 'left',
        fontWeight: '800',
        color: '#F5853F',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    icono: {
        padding: 10,
    },
});
