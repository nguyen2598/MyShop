import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import { useNavigation } from '@react-navigation/native';
import product from '@/src/api/product';
const { width, height } = getWidthHeightScreen;
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

interface IProduct {
    id: number;
    title: string;
    images: string;
    price: number;
    quantity_sold: number;
}
export default function TopProduct() {
    const navigation: any = useNavigation();
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
    const goToDetail = (id: number) => {
        navigation.navigate('product_detail', {
            id: id, // Đây là id, bạn có thể thay đổi giá trị tùy ý
            otherParams: 'Hello from Home Screen!', // Bạn có thể truyền các params khác
        });
    };
    const [productDatas, setProductDatas] = useState<IProduct[]>([]);
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        const query = `?page=1&quantity_sold=DESC`;
        const getData = async () => {
            const response: any = await product.getTopProducts(query);
            console.log({ response });
            if (response?.data?.err === 0) {
                setProductDatas(response?.data?.response?.rows);
            }
        };
        getData();
    }, []);
    return (
        <View style={container}>
            <View style={titleContainer}>
                <Text style={textStyle}>TOP PRODUCT</Text>
            </View>
            <View style={body}>
                <View style={productList}>
                    {productDatas?.map((item: IProduct, index: number) => (
                        <View style={productitemContainer} key={index}>
                            <TouchableWithoutFeedback key={index} onPress={() => goToDetail(item.id)}>
                                <View style={productItem}>
                                    <View style={productImage}>
                                        <Image
                                            source={{ uri: JSON.parse(item.images)[0] }}
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
                                            ₫{item.price}.000
                                        </Text>
                                        <Text style={number_sold}>Đã bán {item.quantity_sold}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Button title="Press me" onPress={handleButtonClick} /> */}
                {<ActivityIndicator size="large" color="#FF9900" />}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // height: height * 0.3,
        backgroundColor: '#eee',
        borderRadius: 4,
        margin: 10,
        elevation: 5,
        shadowColor: '#2e272b',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,

        padding: 10,
        paddingTop: 0,
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
