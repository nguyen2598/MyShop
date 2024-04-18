import order from '@/src/api/order';
import covertDateToString from '@/src/ultils/func/genDate';
import genPrice from '@/src/ultils/func/genNumberPrice';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

interface IOrderItem {
    order_code: string;
    order_detail_code: string;
    user_id: string;
    total_amount: number;
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
    user: {
        id: string;
        name: string;
        phone: number;
        address: string;
        avatar: string;
    };
}
type PickerItem = {
    label: string;
    value: string;
    icon: any;
};
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const OrderModal = ({
    isVisible,
    closeModal,
    orderData,
    mode,
    setDataOrder,
}: {
    isVisible: boolean;
    closeModal: any;
    setDataOrder: any;
    orderData: IOrderItem | undefined;
    mode: 'pending' | 'confirmed' | 'intransit' | 'completed';
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItem] = useState<PickerItem[]>([
        {
            label: 'Chờ xét duyệt',
            value: 'pending',
            icon: null,
        },
        {
            label: 'Đã xác nhận',
            value: 'confirmed',
            icon: null,
        },
        {
            label: 'Giao thành công',
            value: 'completed',
            icon: null,
        },
    ]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const handleComfirm = async () => {
        try {
            await order.approve({ status: 'confirmed', order_id: orderData?.order_detail_code });
            fetchData();
        } catch (error) {}
    };
    const handleIntransit = async () => {
        try {
            await order.approve({ status: 'intransit', order_id: orderData?.order_detail_code });
            fetchData();
        } catch (error) {}
    };
    const handleCompleted = async () => {
        try {
            await order.approve({ status: 'completed', order_id: orderData?.order_detail_code });
            fetchData();
        } catch (error) {}
    };
    const handleCancelledOrder = async () => {
        try {
            await order.approve({ status: 'cancelled', order_id: orderData?.order_detail_code });
            fetchData();
        } catch (error) {}
    };
    const fetchData = async () => {
        try {
            const response: any = await order.getOrderItemToAdmin({ status: mode, page: 1 });
            setDataOrder(response.data.response.rows);
            console.log({ response });
        } catch (error) {
            setDataOrder([]);
        }
    };
    return (
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, width: 300 }}>Đơn hàng</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Mã đơn: </Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.order_detail_code}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Tên: </Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.product.title}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Số lượng: </Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.quantity}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Người mua: </Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.user?.name}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Dịa chỉ:</Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.shipping_address?.trim()}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Tổng tiền: </Text>
                        <Text style={styles.wrapperModalRight}>{orderData?.total_amount}</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Thời gian đặt:</Text>
                        <Text style={styles.wrapperModalRight}>{covertDateToString(orderData?.order_date || '')}</Text>
                    </View>
                    {/* <DropDownPicker
                        open={open}
                        setOpen={setOpen}
                        items={items}
                        value={selectedValue}
                        setValue={setSelectedValue}
                        setItems={setItem}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa', marginBottom: 30 }}
                    /> */}
                    {mode === 'pending' ? (
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Hủy đơn hàng" onPress={handleCancelledOrder} buttonStyle={{ padding: 10 }} />
                            <Button title="Duyệt đơn" onPress={handleComfirm} buttonStyle={{ padding: 10 }} />
                        </View>
                    ) : mode === 'confirmed' ? (
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Đóng" onPress={closeModal} buttonStyle={{ padding: 10 }} />
                            <Button title="Giao hàng" onPress={handleIntransit} buttonStyle={{ padding: 10 }} />
                        </View>
                    ) : mode === 'intransit' ? (
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Đóng" onPress={closeModal} buttonStyle={{ padding: 10 }} />
                            <Button title="Duyệt đơn" onPress={handleCompleted} buttonStyle={{ padding: 10 }} />
                        </View>
                    ) : (
                        ''
                    )}
                </View>
            </View>
        </Modal>
    );
};
export default function ApproveOrders() {
    const navigation: any = useNavigation();
    const [dataOrder, setDataOrder] = useState<IOrderItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrderItem | undefined>();
    const [mode, setMode] = useState<'pending' | 'confirmed' | 'intransit' | 'completed'>('pending');
    const goToBack = () => {
        navigation.goBack();
    };
    console.log({ mode });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await order.getOrderItemToAdmin({ status: mode, page: 1 });
                setDataOrder(response.data.response.rows);
                console.log({ response });
            } catch (error) {
                setDataOrder([]);
                console.log({ error });
            }
        };
        fetchData();
    }, [mode]);
    const openModal = (order: IOrderItem) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerSearch}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16 }}>Duyệt đơn</Text>
                </View>
                <View style={styles.menu}>
                    <ScrollView horizontal>
                        <TouchableOpacity onPress={() => setMode('pending')}>
                            <View
                                style={
                                    mode === 'pending'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Chờ duyệt</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMode('confirmed')}>
                            <View
                                style={
                                    mode === 'confirmed'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Đã duyệt</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMode('intransit')}>
                            <View
                                style={
                                    mode === 'intransit'
                                        ? [styles.menuItem, { borderBottomColor: 'red', borderBottomWidth: 2 }]
                                        : styles.menuItem
                                }
                            >
                                <Text>Đang giao hàng</Text>
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
                                <Text>Đã giao hàng</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.body}>
                    {dataOrder?.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => openModal(item)}>
                            <View style={styles.oder_item}>
                                <View style={styles.wrapper}>
                                    <Text style={styles.wrapperLeft}>Mã đơn hàng:</Text>
                                    <Text style={{ ...styles.wrapperRight, ...styles.greenColor, fontSize: 16 }}>
                                        ORD{item.order_detail_code}
                                    </Text>
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.wrapperLeft}>Ảnh:</Text>
                                    <Image
                                        style={{
                                            ...styles.wrapperRight,
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
                                        style={{
                                            ...styles.wrapperRightImage,
                                            fontWeight: 'bold',
                                            color: '#555',
                                            fontSize: 16,
                                        }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item?.product?.title}
                                    </Text>
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.wrapperLeft}>Thời gian đặt:</Text>
                                    <Text style={{ ...styles.wrapperRight, ...styles.pinkColor, fontSize: 16 }}>
                                        {covertDateToString(item?.order_date)}
                                    </Text>
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.wrapperLeft}>Trạng thái:</Text>
                                    <Text style={{ ...styles.wrapperRight, ...styles.greenColor, fontSize: 16 }}>
                                        {item?.status}
                                    </Text>
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
                                        ₫{genPrice(item?.total_amount * 1000)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <OrderModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                orderData={selectedOrder}
                mode={mode}
                setDataOrder={setDataOrder}
            />
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
        marginTop: StatusBar.currentHeight || 0,
        // backgroundColor: '#ffffff',
    },
    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        gap: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
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
    shadowHeader: {
        padding: 1,
        borderRadius: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        elevation: 2,
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
        // fontSize: 16,
        paddingBottom: 4,
        paddingTop: 4,
    },
    wrapperRightImage: {
        maxWidth: 200,
        paddingBottom: 4,
        paddingTop: 4,
    },
    wrapperModal: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 8,
        paddingBottom: 8,
    },
    wrapperModalLeft: {
        width: '30%',
        fontSize: 12,
        fontWeight: '400',
        color: '#c53b84',
    },
    wrapperModalRight: {
        flex: 1,
        fontSize: 12,
        fontWeight: '400',
        color: '#28b08a',
    },
    modalButton: { marginTop: 20 },
    greenColor: {
        color: '#28b08a',
    },
    pinkColor: {
        color: '#c53b84',
    },
});
