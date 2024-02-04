import { View, Text, Image, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = getWidthHeightScreen;
export default function Cart() {
    return (
        // <View>
        <ScrollView style={{ backgroundColor: '#ddd', flex: 1 }}>
            <View>
                <View style={styles.wrapper}>
                    <View style={styles.item}>
                        <View style={styles.viewImage}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{
                                    uri: 'https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-leqlpid8zicz6b',
                                }}
                            ></Image>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.bodyHeding}>
                                <Text style={styles.headingText} numberOfLines={2} ellipsizeMode="tail">
                                    el tẩy tế bào da chết Rosette Peeling Gel loại bỏ sợi bã nhờn cho da căng mịn Nhật
                                    Bản No.1 Cosme 120g
                                </Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.priceText}>133$</Text>
                            </View>
                            <View style={styles.footerBody}>
                                <View style={styles.footerLeft}>
                                    <TouchableHighlight onPress={() => console.log(1)}>
                                        <View style={styles.subtr}>
                                        <IconAntDesign name="minus" size={18} color="#555555" />
                                        </View>
                                    </TouchableHighlight>
                                    <Text  style={styles.footerLeftNumber}>1</Text>
                                    <TouchableHighlight onPress={() => console.log(1)}>
                                        <View style={styles.plus}>
                                        <IconAntDesign name="plus" size={18} color="#555555" />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.footerRight}>
                                    <Text style={styles.footerRightText}>Show details</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
        // </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        marginBottom:60
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:12,
        padding: 10,
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom:20,
        elevation: 5, // Độ sâu của đổ bóng trên Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    },
    viewImage: {
      // flex:1,
        width: width * 0.25,
        height: width * 0.25,
        borderWidth:1,
        borderColor:'#cccccc',
    },
    body: {
        // paddingLeft: 10,
        flexDirection: 'column',
        justifyContent:'space-between',
        flex: 3,
    },
    bodyHeding: {
        paddingBottom: 10,
    },
    headingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555555',
        lineHeight: 18,
    },
    price: {
      
    },
    priceText: {
      fontSize:20,
      color:'red'
    },
    footerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
      flexDirection: 'row',
      gap:16,
      alignItems: 'center',
    },
    footerLeftNumber:{
      fontSize:18,
      fontWeight:'900',
      color:'#777777'
    },
    subtr: {},
    subtrText: {
    },
    plus: {},
    plusText: {},
    footerRight: {},
    footerRightText: {
      fontSize:16,
      color:'#66CCFF'
    },
});
