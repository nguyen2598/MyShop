import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const StarRating = ({ rating, size }: { rating: number; size: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(
                <Text key={i} style={{ color: 'gold' }}>
                    <FontAwesome name="star" size={size} color="#FFCC00" />
                </Text>,
            );
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(
                <Text key={i} style={{ color: 'gold' }}>
                    <FontAwesome name="star-half-empty" size={size} color="#FFCC00" />
                </Text>,
            );
        } else {
            stars.push(
                <Text key={i} style={{ color: 'gold' }}>
                    <FontAwesome name="star-o" size={size} color="#FFCC00" />
                </Text>,
            );
        }
    }

    return <View style={{ flexDirection: 'row', gap: 4 }}>{stars}</View>;
};

export default StarRating;
