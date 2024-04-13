import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import product from '@/src/api/product';
import genPrice from '@/src/ultils/func/genNumberPrice';
interface IProductSearch {
    id: number;
    images: string;
    price: number;
    quantity_sold: number;
    title: string;
}
export default function Manage() {
    const navigation: any = useNavigation();
    const [text, setText] = useState<string>('');
    const [dataSearch, setDataSearch] = useState<IProductSearch[]>([]);
    const goToBack = () => {
        navigation.goBack();
    };
    const handleInputSubmit = async (text: string) => {
        const fetchData = async () => {
            let query: { [key: string]: any } = { querySearch: text, page: 1, orderBy: { createdAt: 'DESC' } };

            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    console.log({ datas: response?.data?.response?.rows });
                    setDataSearch(response?.data?.response?.rows);
                }
            } catch (error) {}
        };
        fetchData();
    };
    const goToDetail = (id: number) => {
        navigation.navigate('product_detail', {
            id: id, // Đây là id, bạn có thể thay đổi giá trị tùy ý
            isChange: true,
        });
    };
    const handleCreateProduct = () => {
        navigation.navigate('product-manage', {});
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <View style={styles.headerleft}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
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
                <TouchableOpacity onPress={handleCreateProduct}>
                    <IconAntDesign name="plus" size={36} color="#28b08a" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.productList}>
                        {dataSearch.map((item, index) => (
                            <View style={styles.productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={() => goToDetail(item.id)}>
                                    <View style={styles.productItem}>
                                        <View style={styles.productImage}>
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
                                        <View style={styles.productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={styles.productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
                                                ₫{genPrice(item.price * 1000)}
                                            </Text>
                                            <Text style={styles.number_sold}>Đã bán {item.quantity_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
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
        justifyContent: 'space-between',
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
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
    searchwrapper: {},
    searchwrapperinput: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
        borderRadius: 8,
    },
    searchinput: {
        fontSize: 20,
    },
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
});
