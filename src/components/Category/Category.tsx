import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import { useNavigation } from '@react-navigation/native';
const { width, height } = getWidthHeightScreen;
export default function Category() {
    const navigation: any = useNavigation();
    const { container, textStyle, imageStyle } = styles;
    const goToListProduct = () => {
        navigation.navigate('list_product', {
            category: 'hihi',
        });
    };
    return (
        <View style={container}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={textStyle}>SPRING COLLECTION</Text>
            </View>

            <Swiper style={styles.wrapper}>
                <TouchableOpacity onPress={goToListProduct} style={styles.slide1}>
                    <Image style={styles.image_banner} source={require('../../../assets/little.jpg')}></Image>
                    {/* <Text style={styles.text}>Hello Swiper</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={goToListProduct} style={styles.slide2}>
                    <Image style={styles.image_banner} source={require('../../../assets/little.jpg')}></Image>
                    {/* <Text style={styles.text}>Beautiful</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={goToListProduct} style={styles.slide3}>
                    <Image style={styles.image_banner} source={require('../../../assets/little.jpg')}></Image>
                    {/* <Text style={styles.text}>And simple</Text> */}
                </TouchableOpacity>
            </Swiper>
            {/* </View> */}
        </View>
    );
}

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
    imageStyle: { width: '100%', height: 100 },
    wrapper: {
        height: height * 0.3 - 60,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image_banner: {
        width: '100%',
        height: '100%',
    },
});
