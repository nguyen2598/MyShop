import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Authentication, ChangeInfo, Main, OderHistory, Search, Shop } from './src/constants';
import HomeStack from './src/constants/HomeStack/HomeStack';
import { ProductDetail } from './src/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, getLogout, logout } from './src/redux/slice';
export default function Screen() {
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const { currentData } = useSelector((state: any) => state.user);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            isLoggedIn && dispatch(getCurrent());
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [isLoggedIn]);
    useEffect(() => {
        if (currentData === null) {
            dispatch(getLogout(''));
            dispatch(logout(''));
        }
    }, [currentData]);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="main" component={HomeStack} options={{ headerShown: false }} />
                {/* Đổi tên hiển thị của Header */}
                <Stack.Screen name="authentication" component={Authentication} options={{ headerShown: false }} />
                {/* Tắt Header */}
                <Stack.Screen
                    name="change_info"
                    component={ChangeInfo}
                    options={{ headerShown: true, title: 'Thông tin cá nhân' }}
                />
                <Stack.Screen name="order_history" component={OderHistory} options={{ title: 'Lịch sử đặt hàng' }} />
                <Stack.Screen
                    name="product_detail"
                    component={ProductDetail}
                    options={{ headerShown: false, title: 'New Authentication Screen' }}
                />
                <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="shop" component={Shop} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
