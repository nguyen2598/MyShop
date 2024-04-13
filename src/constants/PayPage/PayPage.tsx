import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import stringToObject from '@/src/ultils/func/simpleProductXOREncryption';
import genPrice from '@/src/ultils/func/genNumberPrice';
import order from '@/src/api/order';
import { Toast } from '@/src/components';
import { useSelector } from 'react-redux';
type ItemProps = { id: number; title: string; srcImage: string; price: number; quantity: number; sale: number };
const { width, height } = Dimensions.get('window');
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title, srcImage, price, quantity, sale }: ItemProps) => (
    <View style={styles.itemwrapper}>
        <View>
            <Image style={styles.itemimage} source={{ uri: srcImage }} />
        </View>
        <View style={styles.bodyitem}>
            <Text style={styles.itemtitle} numberOfLines={1}>
                {title}
            </Text>
            <View style={styles.itemwrapperprice}>
                {sale > 0 ? (
                    <View>
                        <Text style={[styles.itemprice, { textDecorationLine: 'line-through' }]}>
                            ₫{genPrice(price * 1000)}
                        </Text>
                        <Text style={styles.saleprice}>₫{genPrice((price - price * sale) * 1000)}</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={[styles.itemprice]}>₫{genPrice(price * 1000)}</Text>
                    </View>
                )}
                <Text style={styles.itemquantyti}>x{quantity}</Text>
            </View>
        </View>
    </View>
);
export default function PayPage() {
    const navigation: any = useNavigation();
    const { currentData } = useSelector((state: any) => state.user);
    const route = useRoute();
    const [isBuy, setIsBuy] = useState<boolean>(true);
    const { oder_params }: any = route.params;
    const [oderData, setOrderData] = useState<ItemProps[]>([]);
    const [priceProduct, setPriceProduct] = useState<number>(0);
    const [sale, setSale] = useState<number>(0);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToastFalse, setshowToastFalse] = useState<boolean>(false);
    const [showToastLocation, setshowToastLocation] = useState<boolean>(false);
    const [addressUser, setAddressUser] = useState<string>('');
    const [phoneUser, setPhoneUser] = useState<string>('');

    const goToBack = () => {
        navigation.goBack();
    };
    useEffect(() => {
        let data = stringToObject(oder_params, 25);
        console.log({ data });
        setOrderData(data);
        let totalPrice = 0;
        let totalSale = 0;
        data.forEach((item: ItemProps) => {
            totalPrice += item.quantity * item.price * (1 - item.sale);
            totalSale += item.quantity * item.price * (0 + item.sale);
        });
        setPriceProduct(totalPrice);
        setSale(totalSale);
    }, [oder_params]);
    useEffect(() => {
        if (currentData?.phone) setPhoneUser(currentData.phone);
        if (currentData?.address) setAddressUser(currentData.address);
    }, [currentData]);
    const handleBuy = async () => {
        console.log({ oderData });
        if (!isBuy) return;
        try {
            if (addressUser.length < 1 || phoneUser.length < 1) {
                setshowToastLocation(true);
                return;
            }
            setIsBuy(false);
            const response = await order.purchase({
                data: oderData.map((item) => {
                    console.log({ item });
                    return {
                        product_id: item.id,
                        total_amount: item.price * item.quantity * (1 - item.sale),
                        quantity: item.quantity,
                        shipping_address: addressUser,
                        phone_number: phoneUser,
                        sale: item.sale * item.price * item.quantity,
                    };
                }),
                order_date: new Date(),
                sale,
                total_order_amount: priceProduct,
            });
            console.log('no bug');
            console.log({ response });
            setShowToast(true);
            setToastMessage(response?.data?.msg);
            setTimeout(() => {
                setIsBuy(true);
                if (response?.data?.err === 0) navigation.navigate('home', {});
            }, 1000);
        } catch (error) {
            console.log(error);
            setIsBuy(true);
            setshowToastFalse(true);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <TouchableOpacity onPress={goToBack}>
                    <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Thanh toán</Text>
            </View>
            <View style={styles.shadowHeader}></View>
            <View style={{ paddingBottom: 72, flex: 1 }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                        <View
                            style={{
                                height: '100%',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                paddingRight: 10,
                            }}
                        >
                            <IconEvilIcons name="location" size={24} color="red" />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text>Địa chỉ nhận hàng</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={{ fontSize: 16 }}>{currentData.name}</Text>
                                <Text>|</Text>
                                <Text>{phoneUser}</Text>
                            </View>
                            <View>
                                <Text>{addressUser}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                // height: '100%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <IconAntDesign name="right" size={24} color="#cccccc" />
                        </View>
                    </View>
                    <View>
                        <ImageBackground
                            source={require('../../../assets/letter.png')}
                            style={{ flex: 1, height: 4 }}
                            resizeMode="repeat"
                        >
                            {/* Nội dung của phần tử */}
                        </ImageBackground>
                    </View>
                    <View>
                        {oderData?.map((data: ItemProps, index: number) => (
                            <View key={index}>
                                <Item
                                    id={data.id}
                                    title={data.title}
                                    srcImage={data.srcImage}
                                    price={data.price}
                                    quantity={data.quantity}
                                    sale={data.sale}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 12,
                                        borderTopColor: '#eeeeee',
                                        borderTopWidth: 1,
                                        borderBottomColor: '#eeeeee',
                                        borderBottomWidth: 13,
                                    }}
                                >
                                    <Text style={{ fontSize: 16 }}>Thành tiền ({data.quantity} sản phẩm): </Text>
                                    <Text style={{ color: 'red' }}>
                                        ₫{genPrice(data.price * (1 - data.sale) * data.quantity * 1000)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.bill}>
                        <View style={styles.flexHeading}>
                            <IconMaterialIcons name="event-note" size={28} color="#CCCC00" />
                            <Text style={{ fontSize: 18, fontWeight: '400' }}>Chi tiết thanh toán</Text>
                        </View>
                        <View>
                            <View style={styles.flexRow}>
                                <Text>Tổng tiền hàng</Text>
                                <Text style={{ color: 'red' }}>₫{genPrice((priceProduct + sale) * 1000)}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text>Tổng cộng Voucher giảm giá</Text>
                                <Text style={{ color: 'red' }}>₫{genPrice(sale * 1000)}</Text>
                            </View>
                            <View style={styles.flexFooter}>
                                <Text style={{ fontSize: 18, fontWeight: '900' }}>Tổng thanh toán</Text>
                                <Text style={{ fontSize: 18, fontWeight: '900', color: 'red' }}>
                                    ₫{priceProduct * 1000 > 0 ? genPrice(priceProduct * 1000) : 0}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.flexpolicy}>
                        <IconMaterialIcons name="edit-note" size={36} color="#CCCC00" />

                        <Text style={{ flex: 1 }}>
                            Nhấn "<Text style={{ color: 'red' }}>Đặt hàng</Text>" đồng nghĩa với việc bạn đồng ý tuân
                            thủ theo chính sách của chúng tôi
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footerBuy}>
                <View style={styles.purchase_price}>
                    <Text style={styles.purchase_price1}>Tổng thanh toán</Text>
                    <Text style={styles.purchase_price2}>
                        {' '}
                        ₫{priceProduct * 1000 > 0 ? genPrice(priceProduct * 1000) : 0}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleBuy}>
                    <View style={styles.buy}>
                        <Text style={styles.buyText}>Đặt hàng</Text>
                        {/* <Text style={styles.buyText}>({checkedItems.length})</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
            {showToast && <Toast message={toastMessage} onHide={() => setShowToast(false)} icon={'checkcircleo'} />}
            {showToastFalse && (
                <Toast
                    message="Có lỗi xảy ra vui lòng thử lại"
                    onHide={() => setshowToastFalse(false)}
                    icon={'exclamationcircle'}
                />
            )}
            {showToastLocation && (
                <Toast
                    message="Vui lòng nhập đủ thông tin số điện thoại, địa chỉ"
                    onHide={() => setshowToastLocation(false)}
                    icon={'exclamationcircle'}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#ffffff',
        // width: width,
        // padding: 20,
    },
    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 16,
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

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    bill: { padding: 12, borderBottomColor: '#eeeeee', borderBottomWidth: 13 },
    flexHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 8, paddingTop: 8 },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
        paddingTop: 2,
    },
    flexFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
        paddingTop: 2,
    },
    flexpolicy: {
        padding: 12,
        flexDirection: 'row',
        gap: 8,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 13,
    },
    itemwrapper: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        backgroundColor: '#fffeee',
        marginBottom: 20,
        marginTop: 20,
    },
    itemimage: {
        width: 60,
        height: 60,
    },
    bodyitem: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemtitle: {
        fontSize: 16,
        fontWeight: '400',
    },
    itemwrapperprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemprice: {
        fontSize: 16,
    },
    saleprice: {
        fontSize: 16,
        color: 'red',
    },
    itemquantyti: {},
    footerBuy: {
        position: 'absolute',
        bottom: 0,
        width: width,
        // marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
    },
    purchase_price: {
        flex: 1,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
    },
    buy: {
        backgroundColor: '#fc5b31',
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    buyText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#ffffff',
    },
    purchase_price1: {
        fontSize: 14,
        color: '#555555',
    },
    purchase_price2: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fc5b31',
    },
});
