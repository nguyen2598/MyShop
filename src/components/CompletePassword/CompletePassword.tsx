import auth from '@/src/api/auth';
import { LoginApi } from '@/src/redux/slice';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from '../Toast/Toast';
const { width, height } = getWidthHeightScreen;
type FormValues = {
    code: string;
    password: string;
    email: string;
};
export default function CompletePassword() {
    const dispatch = useDispatch();
    const navigation: any = useNavigation();
    const { email } = useRoute().params as any;
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
        try {
            data.email = email;
            const response = await auth.completeResetPassword(data);
            if (response?.data?.err === 0) {
                navigation.navigate('login');
            }
        } catch (error: any) {
            let data;
            if (error.response) {
                // Nếu có phản hồi từ server
                data = error.response.data;
            } else if (error.request) {
                // Nếu không có phản hồi từ server
                data = { err: -1, msg: 'Server bị lỗi vui lòng thử lại' };
            } else {
                // Nếu có lỗi xảy ra khi gửi request
                data = { err: -1, msg: 'Request error' };
            }
            setToastMessage(data?.msg);
            setShowToast(true);
        }
    };
    return (
        <View
            style={{
                marginTop: 80,
                display: 'flex',
                flexDirection: 'column',
                // justifyContent:'center',
                alignItems: 'center',
            }}
        >
            {/* <View>
                <Image source={require('../../../assets/Login.png')} style={{ height: 60, width: 180 }}></Image>
            </View> */}
            <View>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Code"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                    name="code"
                    rules={{
                        required: 'Vui lòng nhập code',
                    }}
                />
                <View style={{}}>
                    <Text style={styles.spanErr}>{errors.code ? errors.code.message : ''}</Text>
                </View>
            </View>
            <View>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu mới"
                            secureTextEntry
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                    name="password"
                    rules={{
                        required: 'Vui lòng nhập mật khẩu mới',
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự',
                        },
                    }}
                />
                <View>
                    <Text style={styles.spanErr}>{errors.password ? errors.password.message : ''}</Text>
                </View>
            </View>
            <View style={styles.redirect}>
                <Text>Đã có tài khoản?</Text>
                <Link to={{ screen: 'login', params: { id: 'jane' } }} style={styles.linkText}>
                    Đăng nhập
                </Link>
            </View>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btn}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            {showToast && <Toast message={toastMessage} onHide={() => setShowToast(false)} icon={'checkcircleo'} />}
        </View>
    );
}
const styles = StyleSheet.create({
    textInput: {
        width: width - 60,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    spanErr: {
        // height: 46,
        fontSize: 12,
        color: 'red',
        padding: 10,
        paddingBottom: 20,
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
    redirect: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
