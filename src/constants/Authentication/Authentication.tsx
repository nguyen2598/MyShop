import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp } from "@/src/components";
import getWidthHeightScreen from "@/src/ultils/func/getWidthHeightScreen";
const { width, height } = getWidthHeightScreen;
export default function Authentication({ navigation }: { navigation: any }) {
  const Stack = createNativeStackNavigator();
  const goToBack = () => {
    navigation.goBack();
  };
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
