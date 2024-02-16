import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import product from '@/src/api/product';
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
interface IProductSearch {
    id: number;
    images: string;
    price: number;
    quantity_sold: number;
    title: string;
}
export default function Search() {
    const navigation: any = useNavigation();
    const [text, setText] = useState<string>('');
    const [mode, setMode] = useState<'new' | 'selling' | 'icre' | 'desc' | 'oldest'>('new');
    const goToBack = () => {
        navigation.goBack();
    };
    const [dataSearch, setDataSearch] = useState<IProductSearch[]>([]);
    const goToDetail = (id: number) => {
        navigation.navigate('product_detail', {
            id: id, // Đây là id, bạn có thể thay đổi giá trị tùy ý
            otherParams: 'Hello from Home Screen!', // Bạn có thể truyền các params khác
        });
    };
    const {
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

    const handleInputSubmit = async (text: string) => {
        const orderBy =
            mode === 'new'
                ? `createdAt=DESC`
                : mode === 'selling'
                ? 'quantity_sold=DESC'
                : mode === 'icre'
                ? `price=ASC`
                : mode === 'desc'
                ? `price=DESC`
                : `createdAt=ASC`;
        const query = `?query=${text}&${orderBy}`;
        try {
            const response: any = await product.getSearchProduct(query);
            if (response?.data?.err === 0) {
                setDataSearch(response?.data?.response?.rows);
            }
        } catch (error) {}
    };

    useEffect(() => {
        const fetchData = async () => {
            const orderBy =
                mode === 'new'
                    ? `createdAt=DESC`
                    : mode === 'selling'
                    ? 'quantity_sold=DESC'
                    : mode === 'icre'
                    ? `price=ASC`
                    : mode === 'desc'
                    ? `price=DESC`
                    : `createdAt=ASC`;
            const query = `?query=${text}&${orderBy}`;
            try {
                const response: any = await product.getSearchProduct(query);
                if (response?.data?.err === 0) {
                    setDataSearch(response?.data?.response?.rows);
                }
            } catch (error) {}
        };
        fetchData();
    }, [mode]);
    return (
        // <ScrollView style={{ flex: 1, backgroundColor: 'blue' }}>
        <View style={styles.contaner}>
            <View style={styles.headerwrapper}>
                <View style={styles.headerSearch}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
                    <View style={styles.searchwrapper}>
                        <View style={styles.searchwrapperinput}>
                            <TextInput
                                style={styles.searchinput}
                                placeholder="Tìm shop t"
                                onChangeText={setText}
                                onSubmitEditing={() => {
                                    handleInputSubmit(text);
                                }}
                                value={text}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.navmenu}>
                        <TouchableOpacity
                            onPress={() => setMode('new')}
                            style={
                                mode === 'new'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Mới nhất</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('selling')}
                            style={
                                mode === 'selling'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Bán chạy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('desc')}
                            style={
                                mode === 'desc'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Giá⬇</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('icre')}
                            style={
                                mode === 'icre'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Giá⬆</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('oldest')}
                            style={
                                mode === 'oldest'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Cũ nhất</Text>
                        </TouchableOpacity>
                        {/* <View style={styles.navmenuItem}>
                            <Text style={styles.navitemText}>Giày nữ</Text>
                        </View> */}

                        {/* <View style={styles.navmenuItem}>
                            <Text style={styles.navitemText}>Túi xách nữ</Text>
                        </View> */}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={productList}>
                        {dataSearch.map((item, index) => (
                            <View style={productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={() => goToDetail(item.id)}>
                                    <View style={productItem}>
                                        <View style={productImage}>
                                            <Image
                                                source={{ uri: JSON.parse(item.images)?.[0] }}
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
                                                ₫{item.price}
                                            </Text>
                                            <Text style={number_sold}>Đã bán {item.quantity_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
        // {/* </ScrollView> */}
    );
}
const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        flexDirection: 'column',
    },
    headerwrapper: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 16,
    },
    searchwrapper: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
        borderRadius: 8,
    },
    searchwrapperinput: {},
    searchinput: {
        fontSize: 20,
    },
    navmenu: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    navmenuItem: {
        padding: 10,
        paddingBottom: 1,
        paddingTop: 1,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    navitemText: { fontSize: 16, color: '#555555' },
    body: {
        // marginBottom:20
        flex: 3,
    },
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
    new: {},
});
