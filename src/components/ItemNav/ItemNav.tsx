import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import ItemNavProps from "@/src/interface/ItemNavProps ";

export default function ItemNav({ icon, title, path }: ItemNavProps) {
  const navigation:any = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
    // Sử dụng navigation để chuyển hướng đến màn hình khác
    navigation.navigate(path);
  }}>
        <View style={styles.container}>
          <Text>

          {icon}
          </Text>
          <Text>

          {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f6f6f6',
    paddingRight:10,
    paddingLeft:10,
  }
})