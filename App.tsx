import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Authentication, ChangeInfo, Main, OderHistory, Search } from './src/constants';
import HomeStack from './src/constants/HomeStack/HomeStack';
import { ProductDetail } from './src/components';
import store, { persistor } from './src/redux/store';
import Screen from './Screen';
export default function App() {
    const Stack = createNativeStackNavigator();
    
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="main" component={HomeStack} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="authentication"
                            component={Authentication}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="change_info"
                            component={ChangeInfo}
                            options={{ headerShown: true, title: 'Thông tin cá nhân' }}
                        />
                        <Stack.Screen
                            name="order_history"
                            component={OderHistory}
                            options={{ title: 'Lịch sử đặt hàng' }}
                        />
                        <Stack.Screen
                            name="product_detail"
                            component={ProductDetail}
                            options={{ headerShown: false, title: 'New Authentication Screen' }}
                        />
                        <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer> */}
                <Screen/>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
