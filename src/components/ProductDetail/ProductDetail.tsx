import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import Swiper from 'react-native-swiper';
import Category from '../Category/Category';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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
export default function ProductDetail() {
    const route = useRoute();
    const { id, otherParams }: any = route.params;
    const navigation: any = useNavigation();
    const goToBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{ backgroundColor: '#eeeeee', flex: 1,flexDirection:'column' }}>
            <TouchableOpacity onPress={goToBack} style={styles.backPage}>
            
                <IconAntDesign name="arrowleft" size={36} color="#ffffff" />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.conatiner}>
                    <View style={styles.contentBox1}>
                        <View
                            style={{
                                height: height * 0.48,
                                backgroundColor: '#fff',
                                shadowColor: '#2e272b',
                            }}
                        >
                            <Swiper style={styles.wrapper}>
                                <View style={styles.slide1}>
                                    <Image
                                        style={styles.image_banner}
                                        source={{
                                            uri: 'https://down-vn.img.susercontent.com/file/bad56edcbd19de3269ff43e8a2e28f34',
                                        }}
                                    ></Image>
                                </View>
                                <View style={styles.slide2}>
                                    <Image
                                        style={styles.image_banner}
                                        source={{
                                            uri: 'https://down-vn.img.susercontent.com/file/bad56edcbd19de3269ff43e8a2e28f34',
                                        }}
                                    ></Image>
                                </View>
                                <View style={styles.slide3}>
                                    <Image
                                        style={styles.image_banner}
                                        source={{
                                            uri: 'https://down-vn.img.susercontent.com/file/bad56edcbd19de3269ff43e8a2e28f34',
                                        }}
                                    ></Image>
                                </View>
                            </Swiper>
                        </View>
                        <View style={styles.wrapperPr}>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.priced}>₫</Text>
                                <Text style={styles.price}>38.000</Text>
                            </View>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.title}>
                                    Túi Handmade Tự Đan DIY Đầy Đủ Phụ kiện dây xích chắc chắn -Túi dệt len ​​thủ công
                                    hot TIKTOK
                                </Text>
                            </View>
                            <View style={styles.number_sold}>
                                <Text>Đã bán 439</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentBox}>
                        <View style={styles.contentBoxHeader}>
                            <Text style={styles.headerText}>Phí vận chuyển</Text>
                        </View>
                        <View>
                            <Text>Miễn phí vận chuyển cho đơn hàng trên ₫99.000</Text>
                            <Text>Nhận hàng vào 7/2</Text>
                        </View>
                    </View>
                    <View style={styles.contentBox}>
                        <View style={styles.contentBoxHeader}>
                            <Text style={styles.headerText}>Sản phẩm nổi bật</Text>
                        </View>
                        <View>
                            <View>
                                <View style={styles.productList}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {data.map((item, index) => (
                                            <View style={styles.productitemContainer} key={index}>
                                                <TouchableWithoutFeedback onPress={() => console.log('hihi')}>
                                                    <View style={styles.productItem}>
                                                        <View style={styles.productImage}>
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
                                                        <View style={styles.productTitle}>
                                                            <Text
                                                                numberOfLines={2}
                                                                ellipsizeMode="tail"
                                                                style={{ fontSize: 12 }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.productFooter}>
                                                            <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode="tail"
                                                                style={styles.priceImage}
                                                            >
                                                                ₫{item.price}
                                                            </Text>
                                                            <Text style={styles.number_soldImage}>
                                                                Đã bán {item.number_sold}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentBox}>
                        <View style={styles.contentBoxHeader}>
                            <Text style={styles.headerText}>Chi tiết sản phẩm</Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                                <Text style={styles.contentHeaderText}>Mô tả sản phẩm</Text>
                            </View>
                            <View style={styles.contentBody}>
                                <Text style={styles.contentBodyText}>
                                    Túi handmade tự đan là sản phẩm phù hợp với chị em có sở thích đan móc, có thể đan
                                    để dành cho bản thân hoặc tặng cho những người thân yêu như một món quà ý nghĩa. Đặc
                                    biệt các bạn nam cũng có thể mua để đan tặng người yêu, chắc chắn sẽ làm các nàng
                                    ưng ý. Ngày nay, túi đeo chéo là món thời trang không thể thiếu đối với chị em phụ
                                    nữ bởi sự gọn nhẹ, linh hoạt, có thể cầm hay đeo vai 💕BỘ NGUYÊN LIỆU BAO GỒM: -
                                    Canvas nhựa (có thể là 1 canvas liền hoặc 3 canvas rời) - 1 kim nhựa - 1 dây đeo, 1
                                    mác nai - 2 khoen chữ D, 2 nút khóa - Len các loại
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    backPage: {
        position: 'absolute',
        top:  Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        left:10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius:200,
        padding:4,
        // width: 200,
        // height: 200,
        zIndex:999999
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    conatiner: {
        backgroundColor: '#eeeeee',
        // flex: 1,
    },
    wrapper: {
        height: height * 0.48,
        // backgroundColor: 'red',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image_banner: {
        width: '100%',
        height: '100%',
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 10,
    },
    price: {
        color: 'red',
        lineHeight: 19,
        fontSize: 20,
    },
    priced: { color: 'red', lineHeight: 12, fontSize: 12 },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666666',
    },
    number_sold: {},
    contentBox1: {
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    contentBox: {
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        padding: 10,
    },
    contentBoxHeader: {
        paddingBottom: 10,
        paddingTop: 4,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    wrapperPr: {
        padding: 10,
    },
    content: {},
    contentHeader: {
        paddingBottom: 8,
        paddingTop: 20,
    },
    contentHeaderText: {
        fontSize: 20,
        fontWeight: '600',
    },
    contentBody: {},
    contentBodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666666',
    },
    productList: {
        width: '100%',
        // display:'flex',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // backgroundColor: "blue",
    },
    productitemContainer: {
        width: 110,
        padding: 4,
    },
    productItem: {
        display: 'flex',
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: '#eeee',
        borderRadius: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
    },
    productImage: {
        width: '100%',
        paddingTop: '100%',
        backgroundColor: 'yellow',
        position: 'relative',
    },
    productTitle: {
        padding: 2,
        paddingTop: 8,
    },
    productFooter: {
        padding: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 4,
    },
    priceImage: {
        fontSize: 16,
        color: 'red',
    },
    number_soldImage: {
        fontSize: 12,
    },
});
