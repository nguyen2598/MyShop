import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Authentication, ChangeInfo, Main, OderHistory, Search } from "./src/constants";
import HomeStack from "./src/constants/HomeStack/HomeStack";
import { ProductDetail } from "./src/components";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        
        
      >
        <Stack.Screen
          name="main"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        {/* Đổi tên hiển thị của Header */}
        <Stack.Screen
          name="authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
        {/* Tắt Header */}
        <Stack.Screen name="change_info" component={ChangeInfo} options={{ headerShown: true,title: "Thông tin cá nhân" }}/>
        <Stack.Screen name="order_history" component={OderHistory} options={{title:'Lịch sử đặt hàng'}}/>
        <Stack.Screen name="product_detail" component={ProductDetail}  options={{ headerShown: false,title: "New Authentication Screen" }}/>
        <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
