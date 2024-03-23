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
type ItemProps = { id: number; title: string; srcImage: string; price: number; quantity: number };
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

const Item = ({ title, srcImage, price, quantity }: ItemProps) => (
    <View style={styles.itemwrapper}>
        <View>
            <Image style={styles.itemimage} source={{ uri: srcImage }} />
        </View>
        <View style={styles.bodyitem}>
            <Text style={styles.itemtitle} numberOfLines={1}>
                {title}
            </Text>
            <View style={styles.itemwrapperprice}>
                <Text style={styles.itemprice}>₫{genPrice(price * 1000)}</Text>
                <Text style={styles.itemquantyti}>x{quantity}</Text>
            </View>
        </View>
    </View>
);
export default function PayPage() {
    const navigation: any = useNavigation();
    const route = useRoute();
    const { oder_params }: any = route.params;
    const [oderData, setOrderData] = useState<ItemProps[]>();
    const [priceProduct, setPriceProduct] = useState<number>(0);
    const goToBack = () => {
        navigation.goBack();
    };
    useEffect(() => {
        let data = stringToObject(oder_params, 25);
        setOrderData(data);
        let totalPrice = 0;
        data.forEach((item: ItemProps) => {
            totalPrice += item.quantity * item.price;
        });
        setPriceProduct(totalPrice);
    }, [oder_params]);
    const handleBuy = () => {
        navigation.navigate('checkout', {
            // oder_params: dataToString(
            //     checkedItems?.map((item: ICartItem, index: number) => ({
            //         title: item?.product.title,
            //         quantity: item.quantity,
            //         price: item.product.price,
            //         srcImage: JSON.parse(item?.product?.images)?.find((image: string) => image),
            //     })),
            //     25,
            // ),
        });
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
                                <Text style={{ fontSize: 16 }}>Thanh Nhi</Text>
                                <Text>|</Text>
                                <Text>0963465730</Text>
                            </View>
                            <View>
                                <Text>
                                    ngách 59 ngõ 147 đường 234 phường thanh xuân trung quận thanh xuân thành phố hà nội
                                </Text>
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
                                    <Text style={{ color: 'red' }}>₫{genPrice(data.price * data.quantity * 1000)}</Text>
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
                                <Text style={{ color: 'red' }}>₫{genPrice(priceProduct * 1000)}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text>Tổng cộng Voucher giảm giá</Text>
                                <Text style={{ color: 'red' }}>₫{genPrice(20 * 1000)}</Text>
                            </View>
                            <View style={styles.flexFooter}>
                                <Text style={{ fontSize: 18, fontWeight: '900' }}>Tổng thanh toán</Text>
                                <Text style={{ fontSize: 18, fontWeight: '900', color: 'red' }}>
                                    ₫
                                    {priceProduct * 1000 - 20 * 1000 > 0
                                        ? genPrice(priceProduct * 1000 - 20 * 1000)
                                        : 0}
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
                        ₫{priceProduct * 1000 - 20 * 1000 > 0 ? genPrice(priceProduct * 1000 - 20 * 1000) : 0}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleBuy}>
                    <View style={styles.buy}>
                        <Text style={styles.buyText}>Đặt hàng</Text>
                        {/* <Text style={styles.buyText}>({checkedItems.length})</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
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
