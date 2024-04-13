import React from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

export default function Notification() {
    const navigation: any = useNavigation();
    const handleTextLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
    };
    const handleReview = (title: string, srcImage: string, id: number) => {
        navigation.navigate('review', {});
    };
    const Item = ({ title, srcImage, id }: { title: string; srcImage: string; id: number }) => {
        return (
            <TouchableOpacity onPress={() => handleReview(title, srcImage, id)}>
                <View style={styles.itemwrapper}>
                    <View>
                        <Image
                            style={styles.itemimage}
                            source={{
                                uri: srcImage,
                            }}
                        />
                    </View>
                    <View style={styles.bodyitem}>
                        <Text style={styles.itemtitle} numberOfLines={1}>
                            {title}
                        </Text>
                        <Text>bạn đã đặt hàng thành công vui lòng vào đánh giá</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

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
            <View style={styles.body}>
                <FlatList
                    data={[
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
                    ]}
                    renderItem={({ item }) => <Item />}
                    keyExtractor={(item) => item.id}
                />
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
    body: {
        // paddingLeft: 20,
        // paddingRight: 20,
    },
    itemwrapper: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        backgroundColor: '#fffeee',
        marginBottom: 4,
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
});
