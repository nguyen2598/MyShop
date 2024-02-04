import IconMenu from '@/src/ultils/NavbarMenu';
import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ItemNav from '../ItemNav/ItemNav';

export default function Navbar() {
  return (
    <View style={styles.container}>
      {IconMenu.map((item,index)=>(
        <ItemNav key={index} icon={item.icon} title={item.title} path={item.path}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'#f6f6f6',
    
  }
})