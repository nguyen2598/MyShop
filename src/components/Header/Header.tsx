import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header({ navigation }: any) {
    return (
      // <SafeAreaView style={styles.AndroidSafeArea}>

        <View style={{...styles.AndroidSafeArea, flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 16 ,position:'relative' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Text style={styles.navIcon}> <IconFontAwesome name="bars" size={30} color="#cccccc" /></Text>
                </TouchableOpacity>
                <Text style={styles.nameText}>Wearing a Dress</Text>
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
    backgroundColor: "white",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container:{
    // marginTop: 32,
    flexDirection:'row',
    // justifyContent:'space-between'
    alignItems: 'center',
    gap:20
  },
  navIcon:{

  },
  nameText:{

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
