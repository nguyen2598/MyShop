import {
    View,
    Button,
    Image,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import cloudinary from '@/src/api/cloudinary';
import { Controller, useForm } from 'react-hook-form';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Picker from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import pickerStateInit from '@/src/ultils/pickerItem';
import PayPage from '../PayPage/PayPage';
import { useNavigation, useRoute } from '@react-navigation/native';
import product from '@/src/api/product';
type FormValues = {
    title: string;
    description: string;
    price: string;
    quantity: string;
    categoryCode: string;
    images: string[];
};
type PickerItem = {
    label: string;
    value: string;
    icon: any;
};
interface RouteParams {
    data:
        | {
              id: number;
              title: string;
              description: string;
              images: string;
              price: number;
              quantity_sold: number;
              quantity: number;
              categoryCode: string;
              sale: number;
          }
        | undefined;
}
export default function ProductManagement() {
    const route = useRoute();
    const { data: dataProduct }: RouteParams = (route.params as any) || {};
    const [bug, setbug] = useState<any>('ffff');
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
    const [textHeight, setTextHeight] = useState<number>(0);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
        data.images = imageUris;
        data.categoryCode = selectedValue;
        console.log({ data });
        try {
            if (!dataProduct) {
                console.log('vo day');
                const response = await product.createProduct(data);
                console.log('cre', { response });
            } else {
                if (dataProduct) {
                    const response = await product.updateProduct(data, dataProduct.id);
                    console.log('up', { response });
                }
            }
            navigation.navigate('home');
        } catch (error) {
            console.log({ error });
        }
    };

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

    const handleTextLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setTextHeight(height);
    };

    const [items, setItem] = useState<PickerItem[]>(pickerStateInit);
    const navigation: any = useNavigation();
    const goToBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (dataProduct) {
            setValue('title', dataProduct.title);
            setValue(
                'description',
                dataProduct.description.replace(/(\\n)+/g, '\n').replace(/(\",\")|(\[\")|(\"])/g, ''),
            );
            setValue('price', JSON.stringify(dataProduct.price * 1000));
            setValue('quantity', JSON.stringify(dataProduct.quantity));
            setImageUris(JSON.parse(dataProduct.images));
            setSelectedValue(dataProduct?.categoryCode);
        } else setSelectedValue(items[0].value);
    }, []);
    const handleDeleteImage = (indexImage: number) => {
        setImageUris((prev) => prev.filter((image, index) => index != indexImage));
    };
    console.log({ dataProduct: dataProduct?.description });
    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <TouchableOpacity onPress={goToBack}>
                    <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>{!dataProduct ? 'Thêm sản phẩm' : 'Sửa thông tin sản phẩm'}</Text>
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.inputGroud}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <View style={styles.inputForm}>
                                    <Text
                                        onLayout={handleTextLayout} //hàm này sẽ được gọi mỗi khi kích thước hoặc vị trí của thành phần thay đổi trên màn hình.
                                        style={{
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            marginRight: 10,
                                            position: 'absolute',
                                            top: '0%',
                                            left: 16,
                                            transform: [{ translateY: -textHeight / 2 }],
                                            backgroundColor: '#ffffff',
                                            fontSize: 16,
                                            zIndex: 1000,
                                        }}
                                    >
                                        Tên sản phẩm
                                    </Text>
                                    <TextInput
                                        // placeholder="Tên sản phẩm"
                                        style={{
                                            flex: 1,
                                            borderWidth: 0,
                                            padding: 16,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            fontSize: 16,
                                        }}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                    />
                                </View>
                            )}
                            name="title"
                            rules={{
                                required: 'Vui lòng nhập tên sản phẩm',
                                minLength: {
                                    value: 6,
                                    message: 'Tên phải có ít nhất 6 ký tự',
                                },
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>{errors.title ? errors.title.message : ''}</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroud}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <View style={styles.inputForm}>
                                    <Text
                                        onLayout={handleTextLayout} //hàm này sẽ được gọi mỗi khi kích thước hoặc vị trí của thành phần thay đổi trên màn hình.
                                        style={{
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            marginRight: 10,
                                            position: 'absolute',
                                            top: '0%',
                                            left: 16,
                                            transform: [{ translateY: -textHeight / 2 }],
                                            backgroundColor: '#ffffff',
                                            fontSize: 16,
                                            zIndex: 1000,
                                        }}
                                    >
                                        Mô tả
                                    </Text>
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            borderWidth: 0,
                                            padding: 16,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            fontSize: 16,
                                        }}
                                        multiline={true} // cho phep xuống dòng
                                        numberOfLines={4} // mã là 4 dòng quá tự scroll
                                        onChangeText={field.onChange}
                                        value={field.value}
                                    />
                                </View>
                            )}
                            name="description"
                            rules={{
                                required: 'Vui lòng nhập mô tả sản phẩm',
                                minLength: {
                                    value: 6,
                                    message: 'Mô tả phải có ít nhất 6 ký tự',
                                },
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>{errors.description ? errors.description.message : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.inputGroud}>
                        <View style={styles.inputForm}>
                            <Text
                                onLayout={handleTextLayout} //hàm này sẽ được gọi mỗi khi kích thước hoặc vị trí của thành phần thay đổi trên màn hình.
                                style={{
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    marginRight: 10,
                                    position: 'absolute',
                                    top: '0%',
                                    left: 16,
                                    transform: [{ translateY: -textHeight / 2 }],
                                    backgroundColor: '#ffffff',
                                    fontSize: 16,
                                    zIndex: 1000,
                                }}
                            >
                                Ảnh sản phẩm
                            </Text>
                            <View style={{ padding: 8, paddingTop: 16, paddingBottom: 16 }}>
                                <ScrollView horizontal>
                                    <TouchableOpacity
                                        onPress={selectImages}
                                        style={{
                                            borderStyle: 'dotted',
                                            borderWidth: 1,
                                            borderColor: '#000000',

                                            width: 60,
                                            height: 60,
                                            backgroundColor: '#cccc',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconAntDesign name="clouduploado" size={36} color="#ffffff" />
                                    </TouchableOpacity>
                                    {imageUris?.map((uri, index) => (
                                        <View
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 8,
                                            }}
                                            key={index}
                                        >
                                            <Image
                                                key={index}
                                                source={{
                                                    uri: uri,
                                                }}
                                                style={{
                                                    width: 60,
                                                    height: 60,

                                                    borderWidth: 1,
                                                    borderColor: '#000000',
                                                }}
                                            />
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    backgroundColor: '#ffffff',
                                                }}
                                            >
                                                <TouchableOpacity onPress={() => handleDeleteImage(index)}>
                                                    <IconAntDesign name="closecircleo" size={18} color="#000000" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
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
                        <View style={{}}>
                            <Text style={styles.spanErr}> </Text>
                        </View>
                    </View>
                    <View style={styles.inputGroud}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <View style={styles.inputForm}>
                                    <Text
                                        onLayout={handleTextLayout} //hàm này sẽ được gọi mỗi khi kích thước hoặc vị trí của thành phần thay đổi trên màn hình.
                                        style={{
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            marginRight: 10,
                                            position: 'absolute',
                                            top: '0%',
                                            left: 16,
                                            transform: [{ translateY: -textHeight / 2 }],
                                            backgroundColor: '#ffffff',
                                            fontSize: 16,
                                            zIndex: 1000,
                                        }}
                                    >
                                        Giá tiền
                                    </Text>
                                    <TextInput
                                        // placeholder="Tên sản phẩm"
                                        style={{
                                            flex: 1,
                                            borderWidth: 0,
                                            padding: 16,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            fontSize: 16,
                                        }}
                                        keyboardType="numeric"
                                        onChangeText={field.onChange}
                                        value={field.value}
                                    />
                                </View>
                            )}
                            name="price"
                            rules={{
                                required: 'Vui lòng nhập giá tiền',
                                // minLength: {
                                //     value: 6,
                                //     message: 'Tên phải có ít nhất 6 ký tự',
                                // },
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>{errors.price ? errors.price.message : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.inputGroud}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <View style={styles.inputForm}>
                                    <Text
                                        onLayout={handleTextLayout} //hàm này sẽ được gọi mỗi khi kích thước hoặc vị trí của thành phần thay đổi trên màn hình.
                                        style={{
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            marginRight: 10,
                                            position: 'absolute',
                                            top: '0%',
                                            left: 16,
                                            transform: [{ translateY: -textHeight / 2 }],
                                            backgroundColor: '#ffffff',
                                            fontSize: 16,
                                            zIndex: 1000,
                                        }}
                                    >
                                        Số lượng
                                    </Text>
                                    <TextInput
                                        // placeholder="Tên sản phẩm"
                                        style={{
                                            flex: 1,
                                            borderWidth: 0,
                                            padding: 16,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            fontSize: 16,
                                        }}
                                        value={field.value}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            field.onChange(text);
                                            // Kiểm tra giá trị nhập vào
                                            if (parseInt(text) <= 0) {
                                                control.setError('quantity', {
                                                    type: 'manual',
                                                    message: 'Số lượng phải lớn hơn 0',
                                                });
                                            } else {
                                                control.setError('quantity', {
                                                    type: 'manual',
                                                    message: '',
                                                });
                                            }
                                        }}
                                    />
                                </View>
                            )}
                            name="quantity"
                            rules={{
                                required: 'Vui lòng nhập số lượng sản phẩm',
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>{errors.quantity ? errors.quantity.message : ''}</Text>
                        </View>
                    </View>
                    {/* <View style={{ borderColor: '#ccc', borderWidth: 1 }}>
                    <Picker
                        onValueChange={(value) => console.log(value)}
                        items={[
                            {
                                label: 'foot',
                                value: 'football',
                            },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                        value={'football'}
                        placeholder={{}}
                    />
                </View> */}
                    {/* <View> */}
                    <DropDownPicker
                        open={open}
                        setOpen={setOpen}
                        items={items}
                        value={selectedValue}
                        setValue={setSelectedValue}
                        setItems={setItem}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                    />
                    {/* </View> */}
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.btn}>{!dataProduct ? 'Thêm sản phẩm' : 'Sửa thông tin'}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View>
                    <Button title="Thêm sản phẩm" />
                </View> */}
                </View>
            </ScrollView>
            {/* <ScrollView>
                {imageUris.map((uri, index) => (
                    <Image key={index} source={{ uri: uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
                ))}
            </ScrollView> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#ffffff',
        // width: width,
    },
    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 16,
        marginBottom: 20,
    },
    body: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputGroud: { margin: 8, marginLeft: 0, marginRight: 0 },
    inputForm: {
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    spanErr: {
        fontSize: 12,
        color: 'red',
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btn: {
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 24,
        backgroundColor: '#eee',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555555',
    },
});
