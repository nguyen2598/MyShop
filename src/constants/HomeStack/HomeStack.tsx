import { Header } from '@/src/components';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Main from '../Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { getLogout, logout } from '@/src/redux/slice';
const CustomDrawerContent = (props: any) => {
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const { currentData } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            {/* Phần Header của Drawer */}
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                <Image
                    source={{
                        uri: currentData?.avatar,
                    }}
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                />
                <Text style={{ paddingTop: 20 }}>{currentData?.name}</Text>
            </View>

            {/* Phần danh sách các mục trong Drawer */}
            {/* <DrawerItemList {...props} /> */}

            {/* Bổ sung các mục khác nếu cần */}

            {!isLoggedIn && (
                <View style={styles.boxContent}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('authentication')}
                        style={styles.boxItem}
                    >
                        <IconFontAwesome name="sign-out" size={30} color="#cccccc" />

                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isLoggedIn && (
                <View style={styles.boxContent}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('change_info')} style={styles.boxItem}>
                        <IconFontAwesome name="user" size={30} color="#cccccc" />

                        <Text>Thông tin cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('order_history')} style={styles.boxItem}>
                        <IconFontAwesome name="history" size={30} color="#cccccc" />
                        <Text>Lịch sử đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.boxContent}>
                <TouchableOpacity style={styles.boxItem} onPress={() => props.navigation.navigate('home')}>
                    <IconFontAwesome name="home" size={30} color="#cccccc" />
                    <Text>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxItem} onPress={() => props.navigation.navigate('contact')}>
                    <IconAntDesign name="user" size={30} color="#cccccc" />
                    <Text>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxItem} onPress={() => props.navigation.navigate('page_infor')}>
                    <IconFontAwesome name="exclamation-circle" size={30} color="#cccccc" />

                    <Text>Thông tin</Text>
                </TouchableOpacity>
            </View>
            {/* <DrawerItem
        label="Order History"
        onPress={() => props.navigation.navigate("order_history")}
      />
      <DrawerItem
        label="Change Info"
        onPress={() => props.navigation.navigate("change_info")}
      /> */}

            {isLoggedIn && (
                <TouchableOpacity
                    style={styles.boxItem}
                    onPress={() => {
                        dispatch(getLogout(''));
                        dispatch(logout(''));
                    }}
                >
                    <IconFontAwesome name="sign-out" size={30} color="#cccccc" />
                    <Text>Đăng xuất</Text>
                </TouchableOpacity>
            )}
        </DrawerContentScrollView>
    );
};
export default function HomeStack() {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: (props) => <Header {...props} />,
            }}
        >
            <Drawer.Screen name="Main" component={Main} options={{ title: 'Trang Chủ' }} />
            {/* <Drawer.Screen
        name="Authentication"
        component={Authentication}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Change_info" component={ChangeInfo} />
      <Drawer.Screen name="Oder_history" component={OderHistory} /> */}
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {},
    boxContent: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
    },
    boxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 12,
    },
});
