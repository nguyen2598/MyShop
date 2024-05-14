import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetail } from './src/components';
import {
    ApproveOrders,
    Authentication,
    ChangeInfo,
    ListProductReview,
    Manage,
    Notification,
    OderHistory,
    PayPage,
    ProductManagement,
    ReviewPage,
    Search,
    Statistical,
} from './src/constants';
import HomeStack from './src/constants/HomeStack/HomeStack';
import { getCurrent, getLogout, logout } from './src/redux/slice';
import io from 'socket.io-client';
import Global from './src/Class/Global';
import { Alert } from 'react-native';
import { ENV } from './src/ultils/environment';
// const socket = io('http://localhost:5000');
Global.setSocket(io(`${ENV.urlServer}:5000`));
export default function Screen() {
    const roomRef: any = useRef(null);
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const { isLoggedIn, token } = useSelector((state: any) => state.auth);
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
            console.log({ id: currentData?.id });
        }
    }, [currentData]);
    const joinRoom = (id: string) => {
        console.log({ joinRoom: id });
        Global.getSocket?.emit('join-room', id);
    };
    const leaveRoom = (id: string) => {
        Global.getSocket?.emit('leave-room', id);
    };
    // useEffect(() => {
    //     Global.getSocket?.on('send_notification_oder_review', (data) => {
    //         console.log({ data });
    //         Alert.alert(JSON.stringify(data));
    //     });
    // }, []);

    // Firebase
    // useEffect(() => {
    //     console.log('code day');
    //     const getDeviceToken = async () => {
    //         // Lấy token của thiết bị
    //         try {
    //             const deviceToken = await messaging().getToken();
    //             console.log('Token của thiết bị:', deviceToken);
    //         } catch (error) {
    //             console.log('err', error);
    //         }

    //         // Gửi token về máy chủ
    //         // sendTokenToServer(deviceToken);
    //     };

    //     getDeviceToken();

    //     // Đăng ký lắng nghe sự kiện khi token thay đổi
    //     // const unsubscribe = messaging().onTokenRefresh((newToken) => {
    //     //     console.log('Token mới của thiết bị:', newToken);
    //     //     // Gửi token mới về máy chủ khi token thay đổi
    //     //     // sendTokenToServer(newToken);
    //     // });

    //     // return unsubscribe;
    // }, []);
    // const sendTokenToServer = (token) => {
    //     // Gửi token về máy chủ bằng phương thức POST hoặc một cách phù hợp khác
    //     fetch('https://your-server.com/api/save-token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: token,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Token đã được gửi về máy chủ:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Lỗi khi gửi token về máy chủ:', error);
    //         });
    // };
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
                <Stack.Screen name="approve-orders" component={ApproveOrders} options={{ headerShown: false }} />
                <Stack.Screen name="list-review" component={ListProductReview} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
