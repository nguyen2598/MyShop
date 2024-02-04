import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Category, Collection, TopProduct } from '@/src/components';

export default function Home() {
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