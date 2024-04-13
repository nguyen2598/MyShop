import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Star } from '@/src/components';
import { Input } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
const imageUris: string[] = [
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
    'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
];
export default function ReviewPage() {
    const navigation: any = useNavigation();
    const [rating, setRating] = useState<number>(5);
    const goToBack = () => {
        navigation.goBack();
    };
    const handleRating = () => {
        setRating((prev) => (prev < 5 ? prev + 1 : 0));
    };
    return (
        <View style={styles.container}>
            <View style={styles.headersearch}>
                <View style={styles.headersearchleft}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Đánh giá sản phẩm</Text>
                </View>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: '500' }}>CHỌN</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyheader}>
                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            marginLeft: 8,
                            marginRight: 8,
                            borderWidth: 1,
                            // borderColor: '#000000',
                        }}
                        source={{
                            uri: 'https://i.truyenvua.com/ebook/190x247/lan-nay-toi-se-yeu-thuong-ban-than-hon_1675477657.jpg?gt=hdfgdfg&mobile=2',
                        }}
                    />
                    <View style={{ flex: 6 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>Cách đánh giá sản phẩm.</Text>
                        <Text></Text>
                    </View>
                </View>
                <View style={styles.bodyquanlity}>
                    <TouchableWithoutFeedback onPress={handleRating}>
                        <View style={styles.star}>
                            <Star rating={rating} size={24} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text
                        style={{
                            fontSize: 18,
                            color: rating > 3 ? '#33CC33' : rating > 2 ? '#CCCC00' : 'red',
                        }}
                    >
                        {rating === 5
                            ? 'tuyệt vời'
                            : rating === 4
                            ? 'tốt'
                            : rating === 3
                            ? 'bình thường'
                            : rating === 2
                            ? 'trung bình'
                            : rating === 1
                            ? 'tệ'
                            : 'rất tệ'}
                    </Text>
                </View>
                <View style={styles.bodyreview}>
                    <View style={styles.reviewimage}>
                        {/* <ScrollView horizontal> */}
                        <View style={{ padding: 4, width: (width - 20) / 4, height: (width - 20) / 4 }}>
                            <TouchableOpacity
                                // onPress={selectImages}
                                style={{
                                    borderStyle: 'dotted',
                                    borderWidth: 1,
                                    borderColor: '#000000',

                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#cccc',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 16,
                                }}
                            >
                                <IconAntDesign name="clouduploado" size={36} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                        {imageUris?.map((uri, index) => (
                            <View key={index} style={{ padding: 4, width: (width - 20) / 4, height: (width - 20) / 4 }}>
                                <Image
                                    key={index}
                                    source={{
                                        uri: uri,
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        marginRight: 16,
                                        borderWidth: 1,
                                        borderColor: '#000000',
                                    }}
                                />
                            </View>
                        ))}
                        {/* </ScrollView> */}
                    </View>

                    <View style={styles.reviewtext}>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical="top"
                            placeholder="Vui lòng ghi đánh giá vào đây"
                            style={{ padding: 8 }}
                        />
                    </View>
                </View>
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
    headersearch: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    headersearchleft: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 16,
    },
    body: {
        // padding: 10,
    },
    bodyheader: {
        flexDirection: 'row',
        gap: 16,
    },
    bodyquanlity: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    star: {},
    bodyreview: {},
    reviewimage: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    reviewtext: {
        margin: 14,
        borderColor: '#cccccc',
        borderWidth: 1,
    },
});
