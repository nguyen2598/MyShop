import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

export default function OderHistory({ navigation }: { navigation: any }) {
    const goToBack = () => {
        navigation.goBack();
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.oder_item}>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Mã sản phẩm:</Text>
                            <Text style={{...styles.wrapperRight,...styles.greenColor}}>ORD</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Ảnh:</Text>
                            <Image style={{...styles.wrapperRight,width:50,height:50,borderWidth:1,borderColor:'blue'}}
                           source={{
                                    uri: 'https://down-vn.img.susercontent.com/file/c7d3de107f3cfd4e79cffb5b91ad3ede',
                                }}
                            ></Image>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Tên:</Text>
                            <Text style={{...styles.wrapperRight,fontWeight:'bold',color:'#555'}}
                            numberOfLines={1} ellipsizeMode="tail"
                            >
                                Túi len tự đan phối màu, túi handmade tự đan siêu hot tiktok set đầy đủ phụ kiện (có
                                video hướng dẫn)
                            </Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Thời gian đặt:</Text>
                            <Text style={{...styles.wrapperRight,...styles.pinkColor}}>2024-3-2 25:08:14</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Trạng thái:</Text>
                            <Text style={{...styles.wrapperRight,...styles.greenColor}}>Pending</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.wrapperLeft}>Giá:</Text>
                            <Text style={{...styles.wrapperRight,...styles.pinkColor,fontWeight:'900',fontSize:20}}>148$</Text>
                        </View>
                    </View>
                   
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        padding: 10,
    },
    oder_item: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        paddingBottom: 16,
        paddingTop: 16,
        borderRadius: 10,
    },
    wrapper: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
    },
    wrapperLeft:{
      fontSize:16,
      color:'#999999',
      fontWeight:'bold',
    },
    wrapperRight:{
      maxWidth:200,
      fontSize:16,
      paddingBottom:4,
      paddingTop:4,
    },
    greenColor:{
      color:'#28b08a'

    },
    pinkColor:{
      color:'#c53b84'
    }
});
