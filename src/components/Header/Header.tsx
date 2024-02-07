import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header({ navigation }: any) {
    return (
      // <SafeAreaView style={styles.AndroidSafeArea}>

        <View style={{...styles.AndroidSafeArea, flexDirection: 'column', justifyContent: 'space-between',position:'relative' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Text style={styles.navIcon}> <IconFontAwesome name="bars" size={30} color="#ffffff" /></Text>
                </TouchableOpacity>
                <View style={styles.wrapperText}></View>
                <Text style={styles.nameText}>Trang chủ </Text>
            </View>
            {/* <TextInput placeholder="useless placeholder" style={styles.searchInput}/> */}
            {/* Add other header components as needed */}
        </View>
      // </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  AndroidSafeArea:{
    // flex: 1,
    backgroundColor: "#28b08a",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding:10,
    paddingBottom:16
  },
  container:{
    // marginTop: 32,
    flexDirection:'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    gap:20
  },
  navIcon:{

  },
  wrapperText:{
    // flex:1,
    // flexDirection:'row',
    // justifyContent: 'center',
  },
  nameText:{
fontSize:20,
fontWeight:'900',
color:'#fff'
  },
  searchInput:{
borderColor:'#cccccc',
borderWidth:1,
padding:8,
fontSize:20,
borderRadius:4,
color:'#aaa'
  }
})
