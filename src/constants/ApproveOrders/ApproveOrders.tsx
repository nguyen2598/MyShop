import order from '@/src/api/order';
import covertDateToString from '@/src/ultils/func/genDate';
import genPrice from '@/src/ultils/func/genNumberPrice';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';

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

const OrderModal = ({
    isVisible,
    closeModal,
    orderData,
}: {
    isVisible: boolean;
    closeModal: any;
    orderData: IOrderItem | undefined;
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
    return (
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Đơn hàng</Text>
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
                    <DropDownPicker
                        open={open}
                        setOpen={setOpen}
                        items={items}
                        value={selectedValue}
                        setValue={setSelectedValue}
                        setItems={setItem}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa', marginBottom: 30 }}
                    />
                    <View style={{ marginTop: 20 }}>
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default function ApproveOrders() {
    const [dataOrder, setDataOrder] = useState<IOrderItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrderItem | undefined>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await order.getOrderItemToAdmin();
                setDataOrder(response.data.response.rows);
                console.log({ response });
            } catch (error) {
                setDataOrder([]);
            }
        };
        fetchData();
    }, []);
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
            <OrderModal isVisible={isModalVisible} closeModal={closeModal} orderData={selectedOrder} />
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
