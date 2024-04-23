import { View, Text, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import StarRating from '../Star/Star';
import comment from '@/src/api/comment';

export default function Review({ id_product }: { id_product: number }) {
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [starReview, setStarReview] = useState<{ totalComments: number; totalStars: number }>({
        totalComments: 0,
        totalStars: 0,
    });
    const [reviewData, setReviewData] = useState<
        {
            content: string;
            rating: number;
            images: string;
            Comment_date: string;
            user: {
                name: string;
            };
        }[]
    >([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await comment.getReview({ id_product, page });
                console.log({ response: response.data.response.rows[0].user });
                if (response.data.response.rows) {
                    setReviewData(response.data.response.rows);
                    setMaxPage(Math.ceil(response.data.response.count / 4));
                }
                // if(response.data.response.rows)
            } catch (error) {
                setReviewData([]);
            }
        };
        fetchData();
    }, [page]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await comment.getstar({ id_product });
                if (response.data.response) {
                    setStarReview({
                        totalComments: response.data.response.totalComments,
                        totalStars: response.data.response.totalStars,
                    });
                }
                // if(response.data.response.rows)
            } catch (error) {
                setStarReview({
                    totalComments: 0,
                    totalStars: 0,
                });
            }
        };
        fetchData();
    }, []);
    console.log({ maxPage });
    return (
        <View style={styles.contentBox}>
            <View style={styles.contentBoxHeader}>
                <Text style={styles.headerText}>Đánh giá sản phẩm</Text>
                <View style={styles.headerleft}>
                    {starReview.totalComments > 0 ? (
                        <>
                            <StarRating
                                rating={parseFloat((starReview.totalStars / starReview.totalComments).toFixed(1))}
                                size={16}
                            />
                            <Text style={styles.ratingNum}>
                                {parseFloat((starReview.totalStars / starReview.totalComments).toFixed(1))}/5
                            </Text>
                            <Text>({starReview.totalComments} đánh giá)</Text>
                        </>
                    ) : (
                        <Text>Chưa có đánh giá nào</Text>
                    )}
                </View>
            </View>
            <View style={styles.content}>
                {/* <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderText}>Đánh giá</Text>
                </View> */}
                <View style={styles.contentBody}>
                    {reviewData.map((item, index) => (
                        <ReviewItem reviewData={item} />
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    {page > 1 ? (
                        <TouchableOpacity onPress={() => setPage((prev) => prev - 1)}>
                            <Text
                                style={{
                                    fontSize: 32,
                                    padding: 20,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    backgroundColor: '#ffffee',
                                }}
                            >
                                {'<'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        ''
                    )}
                    {page < maxPage ? (
                        <TouchableOpacity onPress={() => setPage((prev) => prev + 1)}>
                            <Text
                                style={{
                                    fontSize: 32,
                                    padding: 20,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    backgroundColor: '#ffffee',
                                }}
                            >
                                {'>'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        ''
                    )}
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
