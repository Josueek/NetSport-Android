import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtenerDetalleProducto } from '../../../api/detalleProducto';
import * as Constantes from '../../utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const DetalleProducto = ({ route }) => {
    const { idProducto } = route.params;
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState('');
    const [colorSeleccionado, setColorSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState('1'); // Cambiado a string para manejar el TextInput
    const [valoraciones, setValoraciones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            const result = await obtenerDetalleProducto(idProducto);
            if (result.success) {
                setProducto(result.producto);
                setValoraciones(result.valoraciones || []);
            } else {
                console.error(result.message);
            }
            setLoading(false);
        };

        fetchProducto();
    }, [idProducto]);

    const agregarAlCarrito = async () => {
        // Verificar si el producto está disponible
        if (!producto) {
            Alert.alert('Error', 'El producto no está disponible.');
            return;
        }
    
        // Verificar si se seleccionó una talla y un color
        if (!tallaSeleccionada || !colorSeleccionado) {
            setError('Por favor, selecciona una talla y un color.');
            return;
        }
    
        // Verificar la cantidad
        const cantidadSeleccionada = parseInt(cantidad, 10);
        if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
            setError('La cantidad debe ser un número positivo.');
            return;
        }
    
        // Verificar disponibilidad de stock
        if (producto.existencia_producto < cantidadSeleccionada) {
            Alert.alert('Error', 'No hay suficiente stock disponible.');
            return;
        }
    
        try {
            const carrito = await AsyncStorage.getItem('carrito');
            const carritoItems = carrito ? JSON.parse(carrito) : [];
    
            const nuevoItem = {
                id: producto.id_producto,
                nombre: producto.nombre_producto,
                precio: producto.precio_final,
                cantidad: cantidadSeleccionada,
                color: colorSeleccionado,
                talla: tallaSeleccionada,
                imagen: `${Constantes.IP}//NetSports/Api/images/productos${producto.imagen_portada}` // Agregar la ruta de la imagen
            };
    
            carritoItems.push(nuevoItem);
            await AsyncStorage.setItem('carrito', JSON.stringify(carritoItems));
            
            console.log('Carrito actualizado:', carritoItems); // Agrega esta línea para depuración
            
            Alert.alert('Éxito', 'Producto agregado correctamente al carrito');
            setError(''); // Limpia el error si todo sale bien
        } catch (error) {
            console.error('Error adding item to cart:', error);
            Alert.alert('Error', 'No se pudo agregar el producto al carrito.');
        }
    };
    

    if (loading) {
        return <View style={styles.container}><Text>Cargando...</Text></View>;
    }

    if (!producto) {
        return <View style={styles.container}><Text>No se encontró el producto.</Text></View>;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
                <Image
                    source={{ uri: `${Constantes.IP}//NetSports/Api/images/productos${producto.imagen_portada}` }}
                    style={styles.imagen}
                />

                <Text style={styles.nombre}>{producto.nombre_producto}</Text>
                <Text style={styles.descripcion}>{producto.descripcion_producto}</Text>
                <Text style={styles.precio}>${producto.precio_final}</Text>
                <Text style={styles.categoria}>Categoría: {producto.nombre_categoria}</Text>
                <Text style={styles.stock}>Stock: {producto.existencia_producto}</Text>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Seleccionar talla:</Text>
                    <Picker
                        selectedValue={tallaSeleccionada}
                        onValueChange={(itemValue) => setTallaSeleccionada(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccionar talla" value="" />
                        {/* Puedes agregar más tallas si es necesario */}
                        <Picker.Item label={producto.talla} value={producto.talla} />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Seleccionar color:</Text>
                    <Picker
                        selectedValue={colorSeleccionado}
                        onValueChange={(itemValue) => setColorSeleccionado(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccionar color" value="" />
                        {/* Puedes agregar más colores si es necesario */}
                        <Picker.Item label={producto.color} value={producto.color} />
                    </Picker>
                </View>

                <View style={styles.cantidadContainer}>
                    <Text style={styles.cantidadLabel}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={cantidad}
                        onChangeText={(text) => setCantidad(text)}
                        onFocus={() => Keyboard.addListener('keyboardDidShow', () => {
                            // Manejar el ajuste del teclado aquí si es necesario
                        })}
                    />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.botonAgregar} onPress={agregarAlCarrito}>
                    <Text style={styles.botonTexto}>Agregar al carrito</Text>
                </TouchableOpacity>

                <Text style={styles.reseñasTitulo}>Valoraciones</Text>
                {valoraciones.map((valoracion, index) => (
                    <View key={index} style={styles.valoracion}>
                        <View style={styles.estrellas}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <Icon
                                    key={i}
                                    name={i < valoracion.calificacion_producto ? "star" : "star-outline"}
                                    size={20}
                                    color="#F5853F"
                                />
                            ))}
                        </View>
                        <Text style={styles.comentario}>{valoracion.comentario_producto}</Text>
                        <Text style={styles.fecha}>{new Date(valoracion.fecha_valoracion).toLocaleDateString()}</Text>
                    </View>
                ))}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
    imagen: {
        width: 300,
        height: 300,
        marginBottom: 16,
        resizeMode: 'cover',
        alignSelf: 'center', // Centra solo la imagen
    },
    nombre: {
        alignSelf: 'center', // Centra solo el nombre
        fontSize: 29,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    descripcion: {
        alignSelf: 'center', // Centra solo la descripción
        fontSize: 16,
        marginBottom: 10,
    },
    precio: {
        fontSize: 40,
        color: '#F5853F',
        fontWeight: 'bold',
        alignSelf: 'center', // Centra solo el precio
        marginBottom: 16,
    },
    categoria: {
        fontSize: 16,
        marginBottom: 8,
    },
    stock: {
        fontSize: 16,
        marginBottom: 16,
    },
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    cantidadContainer: {
        marginBottom: 16,
    },
    cantidadLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
   
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16,
    },
    botonAgregar: {
        backgroundColor: '#F5853F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 16,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    reseñasTitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center', // Centra el título de reseñas
        marginTop: 5,
        marginBottom: 19,
    },
    valoracion: {
        marginBottom: 16,
    },
    estrellas: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    comentario: {
        fontSize: 16,
        marginBottom: 8,
    },
    fecha: {
        fontSize: 14,
        color: '#664',
    },
});

export default DetalleProducto;
