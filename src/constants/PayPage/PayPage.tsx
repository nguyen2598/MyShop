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
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
type ItemProps = { title: string; srcImage: string; price: number; quantity: number };
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
                <Text style={styles.itemprice}>{price}.000</Text>
                <Text style={styles.itemquantyti}>x{quantity}</Text>
            </View>
        </View>
    </View>
);
export default function PayPage() {
    const navigation: any = useNavigation();
    const goToBack = () => {
        navigation.goBack();
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
            <View>
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
                        <View>
                            <Item
                                title={'Đồ BỘ NỮ GÂN HÌNH PHỐI REN NỮ TÍNH SI TÌNH SIU CẤP VIPPRO'}
                                srcImage={'https://down-vn.img.susercontent.com/file/sg-11134201-23030-0j5w3ckz9aova1'}
                                price={99}
                                quantity={2}
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
                                <Text style={{ fontSize: 16 }}>Thành tiền ({2} sản phẩm): </Text>
                                <Text style={{ color: 'red' }}>198.000</Text>
                            </View>
                        </View>
                        <View>
                            <Item
                                title={'Đồ BỘ NỮ GÂN HÌNH PHỐI REN NỮ TÍNH SI TÌNH SIU CẤP VIPPRO'}
                                srcImage={'https://down-vn.img.susercontent.com/file/sg-11134201-23030-0j5w3ckz9aova1'}
                                price={99}
                                quantity={2}
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
                                <Text style={{ fontSize: 16 }}>Thành tiền ({2} sản phẩm): </Text>
                                <Text style={{ color: 'red' }}>198.000</Text>
                            </View>
                        </View>
                        <View>
                            <Item
                                title={'Đồ BỘ NỮ GÂN HÌNH PHỐI REN NỮ TÍNH SI TÌNH SIU CẤP VIPPRO'}
                                srcImage={'https://down-vn.img.susercontent.com/file/sg-11134201-23030-0j5w3ckz9aova1'}
                                price={99}
                                quantity={2}
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
                                <Text style={{ fontSize: 16 }}>Thành tiền ({2} sản phẩm): </Text>
                                <Text style={{ color: 'red' }}>198.000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bill}>
                        <View style={styles.flexHeading}>
                            <IconMaterialIcons name="event-note" size={28} color="#CCCC00" />
                            <Text style={{ fontSize: 18, fontWeight: '400' }}>Chi tiết thanh toán</Text>
                        </View>
                        <View>
                            <View style={styles.flexRow}>
                                <Text>Tổng tiền hàng</Text>
                                <Text style={{ color: 'red' }}>234556</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text>Tổng cộng Voucher giảm giá</Text>
                                <Text style={{ color: 'red' }}>1234567</Text>
                            </View>
                            <View style={styles.flexFooter}>
                                <Text style={{ fontSize: 18, fontWeight: '900' }}>Tổng thanh toán</Text>
                                <Text style={{ fontSize: 18, fontWeight: '900', color: 'red' }}>1234567</Text>
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
    bill: { padding: 12 },
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
});
