import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const data = [
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
];
export default function ListProduct() {
    console.log('page  product');
    const navigation: any = useNavigation();
    const goBack = () => {
        navigation.goBack();
    };
    const gotoDetail = () => {
        navigation.navigate('product_detail', { id: 12 });
    };
    const {
        container,
        titleContainer,
        textStyle,
        body,
        productList,
        productItem,
        productImage,
        productTitle,
        productFooter,
        productitemContainer,
        price,
        number_sold,
    } = styles;
    return (
        <ScrollView>
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={textStyle}>SPRING COLLECTION</Text>
                </View>
                <View style={body}>
                    <View style={productList}>
                        {data.map((item, index) => (
                            <View style={productitemContainer} key={index}>
                                <TouchableWithoutFeedback onPress={gotoDetail}>
                                    <View style={productItem}>
                                        <View style={productImage}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    objectFit: 'contain',
                                                }}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={price}>
                                                ₫{item.price}
                                            </Text>
                                            <Text style={number_sold}>Đã bán {item.number_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        // height: height * 0.3,
        backgroundColor: '#eee',
        borderRadius: 4,
        margin: 10,
        shadowColor: '#2e272b',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 60,
    },
    titleContainer: { height: 50, justifyContent: 'center', paddingLeft: 10 },
    textStyle: {
        fontSize: 20,
        // color: "#ffffff",
    },
    body: {},
    productList: {
        width: '100%',
        // display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: "blue",
    },
    productitemContainer: {
        width: '50%',
        padding: 4,
    },
    productItem: {
        display: 'flex',
        backgroundColor: '#ffff',
        borderRadius: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        paddingTop: '100%',
        backgroundColor: 'yellow',
        position: 'relative',
    },
    productTitle: {
        padding: 4,
    },
    productFooter: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        color: 'red',
    },
    number_sold: {
        fontSize: 12,
    },
});
