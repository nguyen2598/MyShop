import { View, Text, StatusBar, StyleSheet, Image, ScrollView } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import order from '@/src/api/order';
import covertDateToString from '@/src/ultils/func/genDate';
interface IReview {
    id: number;
    srcImage: string;
    title: string;
    date: string;
    order_detail_code: string;
}
export default function ListProductReview() {
    const navigation: any = useNavigation();
    const [dataReview, setDataReview] = useState<IReview[]>([]);
    const goToBack = () => {
        navigation.goBack();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await order.getOrderSuccess();
                setDataReview(
                    response.data.response.rows.map((item: any) => ({
                        id: item?.product?.id,
                        srcImage: JSON.parse(item?.product?.images)?.find((image: string) => image),
                        title: item?.product?.title,
                        date: item?.updatedAt,
                        order_detail_code: item?.order_detail_code,
                    })),
                );
                // console.log({
                //     response: response.data.response.rows.map((item: any) => ({
                //         id: item?.product?.id,
                //         srcImage: JSON.parse(item?.product?.images)?.find((image: string) => image),
                //         title: item?.product?.title,
                //         date: item?.updatedAt,
                //     })),
                // });
            } catch (error) {
                setDataReview([]);
                console.log({ error });
            }
        };
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <TouchableOpacity onPress={goToBack}>
                    <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Đánh giá sản phẩm</Text>
            </View>
            <View style={styles.shadowHeader}></View>
            <View style={{ paddingBottom: 72, flex: 1 }}>
                <ScrollView>
                    {dataReview.map(({ srcImage, title, date, id, order_detail_code }, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                navigation.navigate('review', {
                                    id_product: id,
                                    srcImage: srcImage,
                                    title: title,
                                    order_detail_code: order_detail_code,
                                })
                            }
                        >
                            <View style={styles.itemwrapper}>
                                <View>
                                    <Image style={styles.itemimage} source={{ uri: srcImage }} />
                                </View>
                                <View style={styles.bodyitem}>
                                    <Text style={styles.itemtitle} numberOfLines={1}>
                                        {title}
                                    </Text>
                                    <View style={styles.itemwrapperprice}>
                                        <View>
                                            <Text style={[styles.itemprice]}>{covertDateToString(date)}</Text>
                                        </View>
                                        {/* <Text style={styles.itemquantyti}>x{quantity}</Text> */}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
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
    itemwrapper: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        backgroundColor: '#fffeee',
        marginBottom: 5,
        marginTop: 10,
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
});
