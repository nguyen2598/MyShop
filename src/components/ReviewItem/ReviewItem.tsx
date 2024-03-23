import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import StarRating from '../Star/Star';

export default function ReviewItem() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={styles.headerleft}>
                    <Image
                        source={{
                            uri: 'https://img.lazcdn.com/g/p/f333a159a8b846c5de42b6a9cbbcfff5.jpg_80x80q80.jpg_.webp',
                        }}
                        style={{ width: 32, height: 32, borderRadius: 32 }}
                    />
                    <View>
                        <Text>07thaovan</Text>
                        <Text>
                            <StarRating rating={4} size={16} />
                        </Text>
                    </View>
                </View>
                <View style={styles.headerright}>
                    <AntDesign name="like2" size={16} color="Yellow" />
                    <Text>huu ich(7)</Text>
                </View>
            </View>
            <View>
                <Text>day la t</Text>
                <Text>day la t</Text>
                <Text>day la t</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerright: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
