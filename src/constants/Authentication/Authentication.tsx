import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConfirmRegister, SignIn, SignUp } from "@/src/components";
import getWidthHeightScreen from "@/src/ultils/func/getWidthHeightScreen";
import { useSelector } from "react-redux";
const { width, height } = getWidthHeightScreen;
export default function Authentication({ navigation }: { navigation: any }) {
  const Stack = createNativeStackNavigator();
  const goToBack = () => {
    navigation.goBack();
  };
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  useEffect(() => {
    // Sử dụng useEffect để kiểm tra isLoggedIn khi component được mount
    if (isLoggedIn) {
      navigation.navigate("home"); // Chuyển hướng đến trang home
    }
  }, [isLoggedIn]);
  return (
    <View style={{flex:1,backgroundColor:'red',
    }}>
       <Stack.Navigator
        initialRouteName="login"
      >
        <Stack.Screen
          name="login"
          component={SignIn}
          options={{ headerShown: false }}
        />
        {/* Đổi tên hiển thị của Header */}
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </View>
  );
}
