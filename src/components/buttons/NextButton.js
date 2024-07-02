import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg'; 


export default NextButton = () =>{

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const cirumference = 2 * Math.PI * radius; 

    return(
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle />
            </Svg>
            

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});