import { ListProduct, Navbar, ProductDetail } from '@/src/components';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// interface HomeScreenProps {
//   navigation: HomeScreenNavigationProp;
// }
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../Cart/Cart';
import Contact from '../Contact/Contact';
import Home from '../Home/Home';
import Search from '../Search/Search';
import { StatusBar } from 'expo-status-bar';

export default function Main({ navigation }: { navigation: any }) {
    const Stack = createNativeStackNavigator();
    const gotoAuthentication = () => {
        navigation.navigate('authentication');
    };
    const gotoChangeInfo = () => {
        navigation.navigate('change_info');
    };
    const gotoOrderHistory = () => {
        navigation.navigate('order_history');
    };

    return (
        <View style={styles.SafeAreaView}>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="home">
                    <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                    {/* Đổi tên hiển thị của Header */}
                    <Stack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
                    {/* Tắt Header */}
                    <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="contact" component={Contact} options={{ headerShown: false }} />
                    <Stack.Screen name="list_product" component={ListProduct} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="product_detail" component={ProductDetail}  options={{ headerShown: false }}/> */}
                </Stack.Navigator>
                {/* <TouchableOpacity onPress={gotoAuthentication}>
        <Text>Click oon to</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoChangeInfo}>
        <Text>gotoChangeInfo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoOrderHistory}>
        <Text>Oder_history</Text>
      </TouchableOpacity> */}
                <Navbar />
            </View>
            {/* <StatusBar backgroundColor="white"  /> */}
        </View>
    );
}
const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        // backgroundColor:'red'
    },
    container: {
        // marginTop:20,
        flex: 1,
        backgroundColor: 'yellow',
        // marginBottom: 20,
    },
    unsafeArea: {
        flex: 0,
        backgroundColor: 'white',
    },
});
