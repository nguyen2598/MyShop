import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Category, Collection, TopProduct } from '@/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('Keys in AsyncStorage:', keys);
      return keys;
    } catch (error) {
      console.error('Error getting keys from AsyncStorage:', error);
      return [];
    }
  };
  getAllKeys()
  return (
    <ScrollView>
      
    <View style={styles.container}>
      <Collection/>
      <Category/>
      <Category/>
      <Category/>
      <TopProduct/>
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    // marginBottom:50
    paddingBottom:60
  },

});