import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import StarRating from '../Star/Star';
import covertDateToString from '@/src/ultils/func/genDate';

export default function ReviewItem({
    reviewData,
}: {
    reviewData: {
        content: string;
        rating: number;
        images: string;
        Comment_date: string;
        user: {
            name: string;
        };
    };
}) {
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
                        <Text>{reviewData.user.name}</Text>
                        <Text>
                            <StarRating rating={reviewData.rating} size={16} />
                        </Text>
                    </View>
                </View>
                <View style={styles.headerright}>
                    {/* <AntDesign name="like2" size={16} color="Yellow" />
                    <Text>huu ich(7)</Text> */}
                    <Text>{covertDateToString(reviewData.Comment_date)}</Text>
                </View>
            </View>
            <View>
                <Text>{reviewData.content}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {JSON.parse(reviewData.images)?.map((uri: string, index: number) => (
                        <Image source={{ uri: uri }} width={80} height={80} key={index} />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingBottom: 16,
        marginBottom: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 2,
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
