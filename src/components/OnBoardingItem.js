// Component/OnBoarding.js
import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, useWindowDimensions } from 'react-native';
//Componente para renderizar el carousel
import Buttons from './buttons/Buttons';
export default OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image}
                style={[styles.image, { width, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={styles.Title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            
           
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         marginBottom: 0,
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',

    }, Title: {
        fontWeight: '800',
        color: '#FE9150',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',
        paddingHorizontal: 10,
    }
});
