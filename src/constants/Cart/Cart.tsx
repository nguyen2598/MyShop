import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedbackBase,
    TouchableNativeFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import cart from '@/src/api/cart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import genPrice from '@/src/ultils/func/genNumberPrice';
import { setTitleHeaderName } from '@/src/redux/slice/titleSlice';
import dataToString from '@/src/ultils/func/Productencryption';
import { Toast } from '@/src/components';
import { getCountCart } from '@/src/redux/slice/cartSlice';
const { width, height } = getWidthHeightScreen;
interface ICartItem {
    product_id: number;
    quantity: number;
    id: number;
    product: {
        id: number;
        title: string;
        images: string;
        price: number;
        sale: number;
    };
}
export default function Cart() {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const { currentData } = useSelector((state: any) => state.user);
    const [cartData, setCartData] = useState<ICartItem[]>([]);
    const [checkedItems, setCheckedItems] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    console.log({ checkedItems });
    const fetchData = async (page: number) => {
        try {
            const query = `?page=${page}&user_id=${currentData?.id}`;
            const response: any = await cart.get20LimitCart(query);
            if (response?.data?.err === 0) {
                if (response.data?.response?.rows?.length < 1) {
                    setIsLoad(false);
                } else {
                    if (page === 1) setCartData(response.data?.response?.rows);
                    else setCartData((prev) => [...prev, ...response.data.response.rows]);
                }
            }
        } catch (error) {
            setCartData([]);
        }
    };
    useEffect(() => {
        dispatch(setTitleHeaderName('Giỏ hàng'));
        if (!currentData) return;
        fetchData(page);
        return () => {
            dispatch(setTitleHeaderName('Trang chủ'));
        };
    }, [page]);
    const handleCheck = (item: ICartItem) => {
        if (checkedItems.includes(item)) {
            // Nếu đã chọn, loại bỏ khỏi danh sách
            setCheckedItems(checkedItems.filter((checkedItem: any) => checkedItem !== item));
        } else {
            // Nếu chưa chọn, thêm vào danh sách
            setCheckedItems([...checkedItems, item]);
        }
    };
    const increaseQuantity = (itemIndex: number) => {
        const updatedCartData = [...cartData];
        updatedCartData[itemIndex].quantity += 1;
        setCartData(updatedCartData);
    };
    const decreaseQuantity = (itemIndex: number) => {
        const updatedCartData = [...cartData];
        if (updatedCartData[itemIndex].quantity > 1) {
            updatedCartData[itemIndex].quantity -= 1;
            setCartData(updatedCartData);
        }
    };
    useEffect(() => {
        let totalPrice = 0;
        cartData.forEach((item) => {
            if (checkedItems.includes(item)) {
                totalPrice += item.quantity * item.product.price;
            }
        });
        setTotal(totalPrice);
    }, [cartData, checkedItems]);
    console.log({ checkedItems });
    const handleBuy = () => {
        if (checkedItems.length < 1) {
            setShowToast(true);
        } else {
            navigation.navigate('checkout', {
                oder_params: dataToString(
                    checkedItems?.map((item: ICartItem, index: number) => ({
                        id: item?.product.id, // chỉ trueyenf id mấy cái dưới ko đc truyền vì dễ bị người dùng sửa
                        title: item?.product.title,
                        quantity: item.quantity,
                        price: item.product.price,
                        sale: item?.product.sale,
                        srcImage: JSON.parse(item?.product?.images)?.find((image: string) => image),
                    })),
                    25,
                ),
            });
        }
    };
    const [showToast, setShowToast] = useState(false);
    const deleteCart = async (id: number) => {
        try {
            console.log({ id });
            if (!id) {
                return;
            }
            const response = await cart.deleteCart(id);
            console.log({ response });
        } catch (error) {
            console.log({ error });
        }
    };
    const handleDeleteCart = async (id: number) => {
        Alert.alert(
            'Xác nhận xóa giỏ hàng',
            'Bạn có chắc muốn xóa giỏ hàng này?',
            [
                {
                    text: 'Hủy',
                    onPress: () => {
                        console.log('huy');
                    },
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: () => {
                        deleteCart(id);
                        setPage(1);
                        // fetchData();
                        setIsLoad(true);
                        dispatch(getCountCart(currentData.id));
                    },
                },
            ],
            { cancelable: false },
        );
    };
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
        // <View>
        <View style={{ backgroundColor: '#ddd', flex: 1 }}>
            <View style={{ paddingBottom: 72, flex: 1 }}>
                <ScrollView style={styles.wrapper} onScroll={handleScroll}>
                    {cartData.map((item, index) => (
                        <View style={styles.item} key={index}>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    style={{ width: 10, backgroundColor: 'red' }}
                                    key={index}
                                    checked={checkedItems.includes(item)}
                                    onPress={() => handleCheck(item)}
                                    containerStyle={styles.checkboxContainer}
                                    size={30}
                                />
                                <View style={styles.viewImage}>
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={{
                                            uri: JSON.parse(item?.product?.images)?.find((image: string) => image),
                                            // uri: 'https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-leqlpid8zicz6b',
                                        }}
                                    ></Image>
                                </View>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.bodyHeding}>
                                    <Text style={styles.headingText} numberOfLines={2} ellipsizeMode="tail">
                                        {item?.product.title}
                                    </Text>
                                </View>
                                <View style={styles.price}>
                                    <Text style={styles.priceText}>₫{genPrice(item?.product?.price * 1000)}</Text>
                                </View>
                                <View style={styles.footerBody}>
                                    <View style={styles.footerLeft}>
                                        <TouchableHighlight onPress={() => decreaseQuantity(index)}>
                                            <View style={styles.subtr}>
                                                <IconAntDesign name="minus" size={18} color="#555555" />
                                            </View>
                                        </TouchableHighlight>
                                        <Text style={styles.footerLeftNumber}>{item?.quantity}</Text>
                                        <TouchableHighlight onPress={() => increaseQuantity(index)}>
                                            <View style={styles.plus}>
                                                <IconAntDesign name="plus" size={18} color="#555555" />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.footerRight}
                                        onPress={() => {
                                            navigation.navigate('product_detail', { id: item?.product?.id });
                                        }}
                                    >
                                        <Text style={styles.footerRightText}>Chi tiết</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteCart(item?.id)}>
                                <View style={styles.close}>
                                    <IconAntDesign name="close" size={24} color="#FF0000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.footerBuy}>
                <View style={styles.purchase_price}>
                    <Text style={styles.purchase_price1}>Tổng thanh toán</Text>
                    <Text style={styles.purchase_price2}>₫{total > 0 ? `${genPrice(total * 1000)}` : '0'}</Text>
                </View>
                <TouchableOpacity onPress={handleBuy}>
                    <View style={styles.buy}>
                        <Text style={styles.buyText}>Mua hàng</Text>
                        <Text style={styles.buyText}>({checkedItems.length})</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {showToast && (
                <Toast
                    message="Bạn chưa chọn sản phẩm nào để mua"
                    onHide={() => setShowToast(false)}
                    icon={'exclamationcircle'}
                />
            )}
        </View>
        // </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        marginBottom: 60,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        padding: 10,
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 20,
        elevation: 5, // Độ sâu của đổ bóng trên Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    viewImage: {
        // flex:1,
        width: width * 0.25,
        height: width * 0.25,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    body: {
        // paddingLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 3,
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bodyHeding: {
        paddingBottom: 10,
    },
    headingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555555',
        lineHeight: 18,
    },
    price: {},
    priceText: {
        fontSize: 20,
        color: 'red',
    },
    footerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    footerLeftNumber: {
        fontSize: 18,
        fontWeight: '900',
        color: '#777777',
    },
    subtr: {},
    subtrText: {},
    plus: {},
    plusText: {},
    footerRight: {},
    footerRightText: {
        fontSize: 16,
        color: '#66CCFF',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        marginLeft: 0, // Remove left margin
        marginRight: 0, // Remove right margin
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerBuy: {
        position: 'absolute',
        bottom: 50,
        marginBottom: 20,
        width: width,
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
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
