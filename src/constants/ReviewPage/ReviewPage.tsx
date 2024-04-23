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
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Star } from '@/src/components';
import * as ImagePicker from 'expo-image-picker';
import { Input } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import comment from '@/src/api/comment';
import { useSelector } from 'react-redux';
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
    const { srcImage, title, id_product, order_detail_code } = useRoute().params as any;
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
    const [reviewText, setReviewText] = useState<string>('');

    const [validateInput, setValidateInput] = useState<boolean>(true);
    const { currentData } = useSelector((state: any) => state.user);
    const selectImages = async () => {
        let selectedUris = [];
        try {
            setIsLoadingImage(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                const result: any = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All, // chon dc ca anh ca video
                    quality: 1,
                    allowsMultipleSelection: true,
                    // multiple: true,
                });

                if (!result.cancelled) {
                    selectedUris = result?.assets?.map((asset: any) => asset?.uri);
                    // setImageUris(selectedUris);

                    // Upload images to Cloudinary and get their URLs
                    const cloudinaryUrls = await Promise.all(
                        selectedUris
                            ?.map(async (uri: any) => {
                                // Implement your Cloudinary upload logic here
                                // Example: Use the Cloudinary API to upload the image
                                // and retrieve the URL
                                // Replace 'YOUR_CLOUD_NAME', 'YOUR_UPLOAD_PRESET', and 'YOUR_API_KEY'
                                const cloudinaryUrl = await uploadToCloudinary(uri);
                                return cloudinaryUrl;
                            })
                            ?.filter((item: any) => item),
                    );

                    if (Array.isArray(cloudinaryUrls)) {
                        setImageUris((prev) => [...prev, ...cloudinaryUrls?.filter((item: any) => item)]);
                    }
                }
            } else {
                alert('Permission to access camera roll is required!');
                // setIsLoadingImage(false);
            }
        } catch (error) {
            Alert.alert('Thông báo', 'Bạn vẫn chưa chọn ảnh');
            // setIsLoadingImage(false);
        } finally {
            setIsLoadingImage(false);
        }
    };

    const uploadToCloudinary = async (uri: any) => {
        try {
            const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dv8beczw7/image/upload';
            const formData = new FormData();
            let dataImage: any = { uri, type: 'image/jpeg', name: 'my_image.jpg' };
            formData.append('file', dataImage);
            formData.append('upload_preset', 'k3rijx8y');
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            return null;
        }
    };
    const goToBack = () => {
        navigation.goBack();
    };
    const handleRating = () => {
        setRating((prev) => (prev < 5 ? prev + 1 : 0));
    };
    const onSave = (data: {
        images: string[];
        rating: number;
        content: string;
        user_id: string;
        product_id: string;
        order_detail_code: string;
    }) => {
        const update = async () => {
            try {
                const response = await comment.createReview(data);
                if (response?.data?.err === 0) {
                    navigation.navigate('home');
                }
            } catch (error) {
                Alert.alert('co loi xay ra');
            }
        };
        update();
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
                <TouchableOpacity
                    onPress={() =>
                        onSave({
                            images: imageUris,
                            rating,
                            content: reviewText,
                            user_id: currentData?.id,
                            product_id: id_product,
                            order_detail_code: order_detail_code,
                        })
                    }
                >
                    <Text style={{ fontSize: 16, color: 'red', fontWeight: '500' }}>CHỌN</Text>
                </TouchableOpacity>
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
                            uri: srcImage,
                        }}
                    />
                    <View style={{ flex: 6 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>{title}</Text>
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
                                onPress={selectImages}
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
                            {isLoadingImage ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // transform: [{ translateY: -textHeight / 2 }],
                                        backgroundColor: '#ffffff',
                                        zIndex: 90,
                                    }}
                                >
                                    <ActivityIndicator size="large" color="#aaaaaa" />
                                </View>
                            ) : (
                                ''
                            )}
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
                            onChangeText={(text) => {
                                setReviewText((prev) => text);
                                setValidateInput((prev) => false);
                            }}
                            value={reviewText}
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
