import order from '@/src/api/order';
import covertDateToString from '@/src/ultils/func/genDate';
import genPrice from '@/src/ultils/func/genNumberPrice';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
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
    const [page, setPage] = useState<number>(1);
    const [mode, setMode] = useState<'cancel' | 'middle' | 'completed'>('middle');
    const [isLoad, setIsLoad] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setPage(1);
                setIsLoad(true);
                const response: any = await order.getOrderItemToUser({ status: mode, page: 1 });
                if (response?.data?.response?.rows) {
                    setDataOrder((prev) => [...response.data.response.rows]);
                }
                if (response?.data?.response?.rows?.length === 0) {
                    setIsLoad(false);
                }
            } catch (error) {
                setDataOrder([]);
            }
        };
        fetchData();
    }, [mode]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await order.getOrderItemToUser({ status: mode, page });
                if (response?.data?.response?.rows) {
                    setDataOrder((prev) => [...prev, ...response.data.response.rows]);
                }
                if (response?.data?.response?.rows?.length === 0) {
                    setIsLoad(false);
                }
            } catch (error) {
                setDataOrder([]);
            }
        };
        fetchData();
    }, [page]);
    const handleScroll = (event: any) => {
        if (!isLoad) return;
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        if (isEndReached) {
            setPage((prev) => prev + 1);
            // setIsLoad(true);
        } else {
            // setIsLoad(false);
        }
    };
    return (
        <ScrollView onScroll={handleScroll}>
            <View style={styles.container}>
                <View style={styles.menu}>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={() => setMode('cancel')}>
                            <View
                                style={
                                    mode === 'cancel'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Đơn hủy</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMode('middle')}>
                            <View
                                style={
                                    mode === 'middle'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Đã duyệt</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setMode('completed')}>
                            <View
                                style={
                                    mode === 'completed'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Đã nhận</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
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
            {!isLoad || dataOrder?.length < 10 ? (
                <Text
                    style={{
                        color: '#FF9900',
                        marginTop: 10,
                        textAlign: 'center',
                    }}
                >
                    Hết
                </Text>
            ) : (
                <ActivityIndicator size="large" color="#FF9900" />
            )}
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
    menu: {
        // backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    menuItem: {
        padding: 8,
        marginRight: 12,
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
