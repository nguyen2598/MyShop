import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import { Link } from '@react-navigation/native';
import ConfirmRegister from '../ConfirmRegister/ConfirmRegister';
import auth from '@/src/api/auth';
const { width, height } = getWidthHeightScreen;
interface RegisterFormProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterForm() {
    const [isConfirmed, setIsConfirmed] = useState<Boolean>(false);
    const [messEmail, setMessEmail] = useState<string>('');
    const [dataRes, setDataRes] = useState<string>('');
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<RegisterFormProps>();

    const onSubmit = async (data: RegisterFormProps) => {
        try {
            const response: any = await auth.firstRegister(data);
            console.log(response);
            if (response?.data?.err === 1) {
                setMessEmail(response?.data?.msg);
                setIsConfirmed(true);
                setDataRes(response?.data?.data);
                // return <ConfirmRegister dataCode={response?.data?.data} />;
            } else {
                setMessEmail(response?.data?.msg);
            }
        } catch (error) {
            setMessEmail('Kết nối bị mất');
        }
    };

    return (
        <>
            {isConfirmed ? (
                <ConfirmRegister dataCode={dataRes} />
            ) : (
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
                        <Image
                            source={require('../../../assets/register.png')}
                            style={{ height: 60, width: 180 }}
                        ></Image>
                    </View>
                    <View>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Name"
                                    onChangeText={field.onChange}
                                    value={field.value}
                                />
                            )}
                            name="name"
                            rules={{
                                required: 'Vui lòng nhập Tên',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/i,
                                    message: 'Tên có đủ chữ hoa-thường-số',
                                },
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>{errors.name ? errors.name.message : ''}</Text>
                        </View>
                    </View>

                    <View>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email"
                                    onChangeText={(text) => {
                                        field.onChange(text);
                                        setMessEmail('');
                                    }}
                                    value={field.value}
                                />
                            )}
                            name="email"
                            rules={{
                                required: 'Vui lòng nhập email',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: 'Email có dạng abc@gmail.com',
                                },
                            }}
                        />
                        <View style={{}}>
                            <Text style={styles.spanErr}>
                                {messEmail?.length > 0 ? messEmail : errors.email ? errors.email.message : ''}
                            </Text>
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

                    <View>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Xác nhận mật khẩu"
                                    secureTextEntry
                                    onChangeText={field.onChange}
                                    value={field.value}
                                />
                            )}
                            name="confirmPassword"
                            rules={{
                                required: 'Vui lòng nhập lại mật khẩu',
                                validate: (value) => {
                                    return value === getValues('password') || 'Mật khẩu xác nhận không khớp';
                                },
                            }}
                        />
                        <View>
                            <Text style={styles.spanErr}>
                                {errors.confirmPassword ? errors.confirmPassword.message : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.redirect}>
                        <Text>Đã có tài khoản?</Text>
                        <Link to={{ screen: 'login', params: { id: 'jane' } }} style={styles.linkText}>
                            Đăng nhập
                        </Link>
                    </View>

                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.btn}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
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
