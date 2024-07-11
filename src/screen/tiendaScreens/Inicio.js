import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
// Componentes
import BackgroundImage from '../../components/BackgroundImage';
// Librería de iconos
import Icon from 'react-native-vector-icons/Ionicons';

// Libreria para almacenar los productos marcados como favoritos
import AsyncStorage from '@react-native-async-storage/async-storage';

// API para capturar los datos de productos
import { cargarProductos } from '../../../api/producto';
//IP constantes
import * as Constantes from '../../utils/constantes';


export default function Inicio() {
    //IP
    const ip = Constantes.IP;
    //Productos
    const [productos, setProductos] = useState([]);
    // Productos favoritos
    const [favoritos, setFavoritos] = useState({});
    const [refreshing, setRefreshing] = useState(false);

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

    useEffect(() => {
        fetchProductos();

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


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardButton}>
            <View style={styles.card}>
                <Image source={{ uri: `${ip}//NetSports/Api/images/productos` + item.imagen_portada }} style={styles.imagen} />
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
                <Text style={styles.title}>Promociones de la semana</Text>
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
