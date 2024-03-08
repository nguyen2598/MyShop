import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemNavProps from '@/src/interface/ItemNavProps ';
import { useSelector } from 'react-redux';

export default function ItemNav({ icon, title, path }: ItemNavProps) {
    const { counts } = useSelector((state: any) => state.cart);
    const navigation: any = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    // Sử dụng navigation để chuyển hướng đến màn hình khác
                    navigation.navigate(path);
                }}
            >
                <View style={styles.container}>
                    <View>
                        <Text>{icon}</Text>
                        {path === 'cart' ? (
                            <View style={styles.numberCart}>
                                <Text style={styles.numberCartText}>{counts}</Text>
                            </View>
                        ) : (
                            ''
                        )}
                    </View>
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        paddingRight: 10,
        paddingLeft: 10,
    },
    numberCart: {
        width: 28,
        height: 28,
        position: 'absolute',
        top: -16,
        right: -16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        // padding: 4,

        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    numberCartText: {
        fontWeight: '900',
        fontSize: 12,
        color: '#fff',
    },
});
