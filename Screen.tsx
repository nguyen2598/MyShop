import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    Authentication,
    ChangeInfo,
    Main,
    OderHistory,
    PayPage,
    Search,
    Notification,
    ReviewPage,
    Manage,
    Statistical,
    ProductManagement,
    ApproveOrders,
} from './src/constants';
import HomeStack from './src/constants/HomeStack/HomeStack';
import { ProductDetail } from './src/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent, getLogout, logout } from './src/redux/slice';
import { io } from 'socket.io-client';
global.socket = io('http://localhost:5000');
export default function Screen() {
    const roomRef: any = useRef(null);
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const { isLoggedIn, token } = useSelector((state: any) => state.auth);
    const { currentData } = useSelector((state: any) => state.user);
    // console.log({ currentData, isLoggedIn, token });
    useEffect(() => {
        const timeOut = setTimeout(() => {
            isLoggedIn && dispatch(getCurrent());
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [isLoggedIn]);
    useEffect(() => {
        if (currentData === null || isLoggedIn === false) {
            dispatch(getLogout(''));
            dispatch(logout(''));
        }
        if (currentData?.id) {
            if (roomRef?.current) {
                leaveRoom(roomRef.current);
            }
            roomRef.current = currentData?.id;
            joinRoom(currentData?.id);
            console.log('co vao day', currentData?.id);
        }
    }, [currentData]);
    const joinRoom = (id: string) => {
        socket.emit('join-room', id);
    };
    const leaveRoom = (id: string) => {
        socket.emit('leave-room', id);
    };
    useEffect(() => {
        socket.on('send_notification', (data) => {
            console.log({ data });
        });
    }, []);
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
                <Stack.Screen name="notification" component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name="checkout" component={PayPage} options={{ headerShown: false }} />
                <Stack.Screen name="manage" component={Manage} options={{ headerShown: false }} />
                <Stack.Screen name="statistical" component={Statistical} options={{ headerShown: false }} />
                <Stack.Screen name="product-manage" component={ProductManagement} options={{ headerShown: false }} />
                <Stack.Screen name="review" component={ReviewPage} options={{ headerShown: false }} />
                <Stack.Screen name="approve-orders" component={ApproveOrders} options={{ title: 'Duyệt đơn' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
