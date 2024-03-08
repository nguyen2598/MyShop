import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
const { width, height } = getWidthHeightScreen;
export default function Collection() {
    const { container, textStyle, imageStyle } = styles;
    return (
        <View style={container}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={textStyle}>SPRING COLLECTION</Text>
            </View>
            <TouchableOpacity>
                <Image
                    source={{
                        uri: 'https://tranhdecors.com/wp-content/uploads/edd/2023/11/Banner-chuc-tet-Nguyen-Dan-2024.jpg',
                    }}
                    style={imageStyle}
                />
            </TouchableOpacity>
        </View>
    );
}

const imageWidth = width - 40;
const imageHeight = height * 0.3 - 60;

const styles = StyleSheet.create({
    container: {
        height: height * 0.3,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2e272b',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0,
    },
    textStyle: {
        fontSize: 20,
        color: '#afaeaf',
    },
    imageStyle: { width: imageWidth, height: imageHeight },
});
