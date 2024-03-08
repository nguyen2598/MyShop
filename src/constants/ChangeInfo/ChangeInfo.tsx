import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ChangeInfo({ navigation }: { navigation: any }) {
    const { currentData } = useSelector((state: any) => state.user);

    const goToBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 20,
                    elevation: 5, // Độ sâu của đổ bóng trên Android
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                }}
            >
                <Image
                    source={{
                        uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/275304331_477369247457966_2848070944219672109_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeELUyGTwNDTkTdrpL818WXxHxLUUoSSwQofEtRShJLBCllDOR-KNDAyWdtBDBfLRccpOFykOdiKG0_6MKErlquT&_nc_ohc=lo0JYUdEOo8AX_UBNMl&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAMbemaDh2NS3t80M0SsKweXG8JOLtye9QrnLzkOJyIQQ&oe=65C32BCC',
                    }}
                    style={{ width: 100, borderWidth: 1, borderColor: 'red', borderRadius: 1000, height: 100 }}
                ></Image>
            </View>
            <View style={styles.body}>
                <View style={styles.wrapperBottom}>
                    <View style={styles.wrapper}>
                        <Text style={styles.textLeft}>Tài khoản</Text>
                        <Text style={styles.textRight}>B20DCCN477</Text>
                    </View>
                </View>
                <View style={styles.wrapperBottom}>
                    <View style={styles.wrapper}>
                        <Text style={styles.textLeft}>Tên</Text>
                        <TextInput style={styles.textRight} editable={false} value={currentData?.name || ''} />
                    </View>
                </View>
                <View style={styles.wrapperBottom}>
                    <View style={styles.wrapper}>
                        <Text style={styles.textLeft}>Số điện thoại</Text>
                        <TextInput style={styles.textRight} editable={false} value={currentData?.phone || ''} />
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.textLeft}>Email</Text>
                        <Text style={styles.textRight}>{currentData?.email}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.textLeft}>Địa chỉ</Text>
                        <TextInput style={styles.textRight} editable={false} value={currentData?.address || ''} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: 16,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    wrapperBottom: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 8,
        elevation: 5, // Độ sâu của đổ bóng trên Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    textLeft: {
        fontSize: 16,
        fontWeight: '600',
    },
    textRight: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555555',
    },
});
