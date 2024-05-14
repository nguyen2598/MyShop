import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Bar, Line } from '@/src/components';
import statistical from '@/src/api/statistical';

export default function Statistical() {
    const navigation: any = useNavigation();
    const [statisticalLine, setStatisticalLine] = useState<{ labels: string[]; data: number[] }>({
        labels: [],
        data: [],
    });
    const goToBack = () => {
        navigation.goBack();
    };
    useEffect(() => {
        const fetchData = async () => {
            const response: any = await statistical.getStatistical();
            console.log({ response });
            setStatisticalLine({
                labels: response?.data?.map((item: any) => item.month),
                data: response?.data?.map((item: any) => item.revenue * 1000),
            });
        };
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerleft}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Thống kê</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Bar data={[...statisticalLine.data]} labels={[...statisticalLine.labels]} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#ffffff',
        // width: width,
        // padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 16,
    },
    body: {},
});
