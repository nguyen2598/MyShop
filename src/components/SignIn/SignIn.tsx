import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import { Link } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LoginApi } from '@/src/redux/slice';
const { width, height } = getWidthHeightScreen;
type FormValues = {
    email: string;
    password: string;
};
export default function SignIn() {
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        dispatch(LoginApi(data));
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
            <View>
                <Image source={require('../../../assets/Login.png')} style={{ height: 60, width: 180 }}></Image>
            </View>
            <View>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                    name="email"
                    rules={{
                        required: 'Vui lòng nhập email',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: 'Email  không hợp lệ',
                        },
                    }}
                />
                <View style={{}}>
                    <Text style={styles.spanErr}>{errors.email ? errors.email.message : ''}</Text>
                </View>
            </View>

            <View>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            onChangeText={field.onChange}
                            value={field.value}
                        />
                    )}
                    name="password"
                    rules={{
                        required: 'Vui lòng nhập mật khẩu',
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
                <Text>Bạn chưa có tải khoản?</Text>
                <Link to={{ screen: 'signup', params: { id: 'jane' } }} style={styles.linkText}>
                    Đăng ký
                </Link>
            </View>

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btn}>Đăng nhập</Text>
            </TouchableOpacity>
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
