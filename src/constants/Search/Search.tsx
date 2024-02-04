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
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
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
export default function Search() {
    const navigation: any = useNavigation();
    const goToBack=()=>{
      navigation.goBack();
    }
    const goToDetail = () => {
        navigation.navigate('product_detail', {
            id: 123, // Đây là id, bạn có thể thay đổi giá trị tùy ý
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
                                <TextInput style={styles.searchinput} placeholder="Tìm shop t" />
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.navmenu}>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>

                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                            <View style={styles.navmenuItem}>
                                <Text style={styles.navitemText}>Mới nhất</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.body}>
                      <ScrollView>
                    <View style={productList}>

                        {data.map((item, index) => (
                            <View style={productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={goToDetail}>
                                    <View style={productItem}>
                                        <View style={productImage}>
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
                                        <View style={productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={price}>
                                                ₫{item.price}
                                            </Text>
                                            <Text style={number_sold}>Đã bán {item.number_sold}</Text>
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
      flex:1,
      flexDirection:'column'
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
        borderColor: '#ccc',
    },
    navitemText: { fontSize: 16, color: '#555555' },
    body: {
      // marginBottom:20
      flex:3
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
});
