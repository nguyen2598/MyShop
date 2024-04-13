import order from '@/src/api/order';
import covertDateToString from '@/src/ultils/func/genDate';
import genPrice from '@/src/ultils/func/genNumberPrice';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
interface IOrderItem {
    order_code: string;
    order_detail_code: string;
    user_id: string;
    total_amount: string;
    status: string;
    order_date: string;
    shipping_address: string;
    phone_number: string;
    product_id: string;
    quantity: string;
    product: {
        id: string;
        title: string;
        price: number;
        categoryCode: string;
        images: string;
    };
}
export default function OderHistory({ navigation }: { navigation: any }) {
    const goToBack = () => {
        navigation.goBack();
    };
    const [dataOrder, setDataOrder] = useState<IOrderItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await order.getOrderItemToUser();
                setDataOrder(response.data.response.rows);
                console.log({ response });
            } catch (error) {
                setDataOrder([]);
            }
        };
        fetchData();
    }, []);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.body}>
                    {dataOrder?.map((item, index) => (
                        <View style={styles.oder_item} key={index}>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Mã đơn hàng:</Text>
                                <Text style={{ ...styles.wrapperRight, ...styles.greenColor }}>
                                    ORD{item.order_detail_code}
                                </Text>
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Ảnh:</Text>
                                <Image
                                    style={{
                                        ...styles.wrapperRightImage,
                                        width: 50,
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: 'blue',
                                    }}
                                    source={{
                                        uri: JSON.parse(item?.product?.images)?.find((image: string) => image),
                                    }}
                                ></Image>
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Tên:</Text>
                                <Text
                                    style={{ ...styles.wrapperRightImage, fontWeight: 'bold', color: '#555' }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item?.product?.title}
                                </Text>
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Thời gian đặt:</Text>
                                <Text style={{ ...styles.wrapperRight, ...styles.pinkColor }}>
                                    {covertDateToString(item?.order_date)}
                                </Text>
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Trạng thái:</Text>
                                <Text style={{ ...styles.wrapperRight, ...styles.greenColor }}>{item?.status}</Text>
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={styles.wrapperLeft}>Giá:</Text>
                                <Text
                                    style={{
                                        ...styles.wrapperRight,
                                        ...styles.pinkColor,
                                        fontWeight: '900',
                                        fontSize: 20,
                                    }}
                                >
                                    ₫{genPrice(item?.product?.price * 1000)}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
        // <View>
        //     <Pie />
        //     <Line />
        //     {/* <ContributionGraphChart /> */}
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        padding: 10,
    },
    oder_item: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        paddingBottom: 16,
        paddingTop: 16,
        borderRadius: 10,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapperLeft: {
        fontSize: 16,
        color: '#999999',
        fontWeight: 'bold',
    },
    wrapperRight: {
        maxWidth: 200,
        fontSize: 16,
        paddingBottom: 4,
        paddingTop: 4,
    },
    wrapperRightImage: {
        maxWidth: 200,
        paddingBottom: 4,
        paddingTop: 4,
    },
    greenColor: {
        color: '#28b08a',
    },
    pinkColor: {
        color: '#c53b84',
    },
});
