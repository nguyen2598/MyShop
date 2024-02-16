import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { Category, Collection, TopProduct } from '@/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    // const getAllKeys = async () => {
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         console.log('Keys in AsyncStorage:', keys);
    //         return keys;
    //     } catch (error) {
    //         console.error('Error getting keys from AsyncStorage:', error);
    //         return [];
    //     }
    // };
    // getAllKeys();
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const scrollViewRef: any = useRef(null);
    const [isAddData, setIsAddData] = useState<boolean>(false);
    const handleLoadMoreData = () => {
        // Gọi API hoặc thực hiện logic để lấy thêm dữ liệu
        setIsAddData(true);
        console.log('co co');
    };

    const handleScroll = (event: any) => {
        if (isLoad) return;
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        // console.log(layoutMeasurement.height, contentOffset.y, +contentSize.height, +contentSize.height - 50);
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        if (isEndReached) {
            handleLoadMoreData();
            // setIsLoad(true);
        } else {
            // setIsLoad(false);
        }
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            onContentSizeChange={() => {
                console.log('dc dc');
            }}
        >
            <View style={styles.container}>
                <Collection />
                <Category />
                <Category />
                <Category />
                <TopProduct isAddData={isAddData} setIsAddData={setIsAddData} setIsLoad={setIsLoad} isLoad={isLoad} />
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        // marginBottom:50
        paddingBottom: 60,
    },
});
