import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Contact() {
    return (
        <ScrollView
            style={{
                flex: 1,
            }}
        >
            <View style={styles.contact}>
                <View style={styles.viewimage}>
                    <Image style={styles.image} source={require('../../../assets/map.png')}></Image>
                </View>
                <View style={styles.body}>
                    <View style={styles.item}>
                        <Text style={styles.itemleft}>
                            <IconEvilIcons name="location" size={30} color="#28b08a" />
                        </Text>
                        <Text style={styles.itemright}>Thượng Đình, Thanh Xuân, Hà Nội, Việt Nam</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemleft}>
                            <IconAntDesign name="phone" size={30} color="#28b08a" />
                        </Text>
                        <Text style={styles.itemright}>(+84) 0963014082</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemleft}>
                            <IconFontAwesome name="send" size={30} color="#28b08a" />
                        </Text>
                        <Text style={styles.itemright}>admin@gmail.com</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemleft}>
                            <IconAntDesign name="mail" size={30} color="#28b08a" />
                        </Text>
                        <Text style={styles.itemright}>(+84) 0964725082</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contact: {
        flex: 1,
        padding: 10,
        marginBottom: 80,
    },
    viewimage: {
        aspectRatio: 1, // Tỉ lệ không quan trọng, vì hình ảnh sẽ điều chỉnh theo kích thước của container
        elevation: 5, // Độ sâu của đổ bóng trên Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    image: {
        flex: 1,
        width: undefined, // Chiều rộng sẽ tự động điều chỉnh theo chiều rộng của container
        height: undefined,
    },
    body: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        elevation: 5, // Độ sâu của đổ bóng trên Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        padding: 10,
        borderRadius: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 4,
        paddingBottom: 24,
        paddingTop: 20,
    },
    itemleft: {},
    itemright: {
        fontSize: 14,
        fontWeight: '600',
        color: '#c53b84',
    },
});
