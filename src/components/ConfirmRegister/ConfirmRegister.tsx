import { CompleteRegister } from '@/src/redux/slice';
import getWidthHeightScreen from '@/src/ultils/func/getWidthHeightScreen';
import simpleXORDecryption from '@/src/ultils/func/simpleXORDecryption';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = getWidthHeightScreen;
type FormValues = {
    email: string;
    password: string;
    name: string;
    code: string;
};
export default function ConfirmRegister({ dataCode }: { dataCode: string }) {
    const { msg } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        console.log(data);
        const {
            name,
            email,
            password,
        }: {
            email: string;
            password: string;
            name: string;
        } = simpleXORDecryption(dataCode, 25);
        data.name = name;
        data.email = email;
        data.password = password;
        dispatch(CompleteRegister(data));
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
                <Image source={require('../../../assets/register.png')} style={{ height: 60, width: 180 }}></Image>
            </View>
            <View>
                <View style={{ padding: 10, paddingLeft: 0 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#888888' }}>Vui lòng vào mail lấy mã</Text>
                </View>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mã xác nhận"
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
                    <Text style={styles.spanErr}>{msg.length > 0 ? msg : errors.code ? errors.code.message : ''}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btn}>Xác nhận</Text>
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
});
