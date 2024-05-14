import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import Global from '@/src/Class/Global';
import covertDateToString from '@/src/ultils/func/genDate';
import notification from '@/src/api/notification';

export default function Notification() {
    const navigation: any = useNavigation();
    const handleTextLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
    };
    const handleReview = () => {
        navigation.navigate('list-review');
    };

    const Item = ({ type, content, date }: { type: string; content: string; date: string }) => {
        return (
            <TouchableOpacity onPress={() => handleReview()}>
                <View style={styles.itemwrapper}>
                    <View>
                        <Image
                            style={styles.itemimage}
                            source={{
                                uri: 'https://www.pushengage.com/wp-content/uploads/2022/10/How-to-Add-a-Push-Notification-Icon.png',
                            }}
                        />
                    </View>
                    <View style={styles.bodyitem}>
                        <Text style={styles.itemtitle} numberOfLines={1}>
                            {type === 'send_notification_oder_review' ? 'Đánh giá sản phẩm' : 'Thông báo'}
                        </Text>
                        <Text>{content}</Text>
                        <Text>{covertDateToString(date)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const goToBack = () => {
        navigation.goBack();
    };
    const [dataNotification, setDataNotification] = useState<{ type: string; content: string; date: string }[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await notification.getNotification({ page: 1 });
                if (response?.data?.response?.rows) {
                    setDataNotification(response?.data?.response?.rows);
                }
            } catch (error) {
                setDataNotification([]);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        Global.getSocket?.on('send_notification_oder_review', (data) => {
            console.log({ data });
            // Alert.alert(JSON.stringify(data));
            setDataNotification((prev) => [data, ...prev]);
        });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <TouchableOpacity onPress={goToBack}>
                    <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Thông báo</Text>
            </View>
            <View style={styles.body}>
                {dataNotification.length > 0 ? (
                    <FlatList
                        data={dataNotification}
                        renderItem={({ item }) => <Item type={item.type} content={item.content} date={item.date} />}
                        keyExtractor={(item, index) => item.type + index}
                    />
                ) : (
                    <Text>Không có thông báo nào</Text>
                )}
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
