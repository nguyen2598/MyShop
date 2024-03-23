import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import StarRating from '../Star/Star';

export default function Review() {
    return (
        <View style={styles.contentBox}>
            <View style={styles.contentBoxHeader}>
                <Text style={styles.headerText}>Đánh giá sản phẩm</Text>
                <View style={styles.headerleft}>
                    <StarRating rating={4.6} size={16} />
                    <Text style={styles.ratingNum}>4.6/5</Text>
                    <Text>(366 đánh giá)</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderText}>Mô tả sản phẩm</Text>
                </View>
                <View style={styles.contentBody}>
                    <ReviewItem />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    contentBox: {
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        padding: 10,
        paddingBottom: 0,
    },
    contentBoxHeader: {
        paddingBottom: 10,
        paddingTop: 4,
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingNum: {
        color: 'red',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    content: {},
    contentHeader: {
        paddingBottom: 8,
        paddingTop: 20,
    },
    contentHeaderText: {
        fontSize: 20,
        fontWeight: '600',
    },
    contentBody: {
        paddingBottom: 20,
    },
});
