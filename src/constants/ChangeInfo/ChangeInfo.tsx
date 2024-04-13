import user from '@/src/api/user';
import { InforModal } from '@/src/components';
import { getCurrent } from '@/src/redux/slice';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeInfo({ navigation }: { navigation: any }) {
    const { currentData } = useSelector((state: any) => state.user);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const closeModal = () => {
        setIsModalVisible(false);
    };
    const openModal = () => {
        setIsModalVisible(true);
    };

    const goToBack = () => {
        navigation.goBack();
    };
    const onSave = (data: {
        name: string;
        gender: string;
        datOfBirth: string;
        phone: string;
        email: string;
        address: string;
    }) => {
        const update = async () => {
            const response = await user.updateUser(data);
            if (response?.data?.err === 0) {
                dispatch(getCurrent());
            }
        };
        update();
    };
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 20,
                        elevation: 5, // Độ sâu của đổ bóng trên Android
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                    }}
                >
                    <Image
                        source={{
                            uri:
                                currentData?.avatar ||
                                'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
                        }}
                        style={{ width: 100, borderWidth: 1, borderColor: '#cccccc', borderRadius: 1000, height: 100 }}
                    ></Image>
                </View>
                <View style={styles.body}>
                    <View style={styles.wrapperBottom}>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Tài khoản</Text>
                            <Text style={styles.textRight}>B20DCCN477</Text>
                        </View>
                    </View>
                    <View style={styles.wrapperBottom}>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Tên</Text>
                            <Text style={styles.textRight}>{currentData?.name || ''}</Text>

                            {/* <TextInput style={styles.textRight} editable={false} value={currentData?.name || ''} /> */}
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Giới tính</Text>
                            <Text style={styles.textRight}>{currentData?.gender || ''}</Text>

                            {/* <TextInput style={styles.textRight} editable={false} value={currentData?.gender || ''} /> */}
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Ngày sinh</Text>
                            <Text style={styles.textRight}>{currentData?.datOfBirth || ''}</Text>

                            {/* <TextInput
                                style={styles.textRight}
                                editable={false}
                                value={currentData?.datOfBirth || ''}
                            /> */}
                        </View>
                    </View>
                    <View style={styles.wrapperBottom}>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Số điện thoại</Text>
                            {/* <TextInput
                                style={styles.textRight}
                                editable={false}
                                keyboardType="numeric"
                                value={currentData?.phone || ''}
                            /> */}
                            <Text style={styles.textRight}>{currentData?.phone || ''}</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Email</Text>
                            <Text style={styles.textRight}>{currentData?.email}</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.textLeft}>Địa chỉ</Text>
                            <Text style={styles.textRight}>{currentData?.address || ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <Button
                        title={'Sửa thông tin'}
                        buttonStyle={{
                            padding: 20,
                            paddingBottom: 12,
                            paddingTop: 12,
                            borderRadius: 16,
                            // backgroundColor: '#0000ff',
                            borderWidth: 1,
                            borderColor: 'orange',
                        }}
                        onPress={() => openModal()}
                    />
                </View>
            </View>
            <InforModal isVisible={isModalVisible} closeModal={closeModal} userData={currentData} onSave={onSave} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: 16,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    wrapperBottom: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 8,
        elevation: 5, // Độ sâu của đổ bóng trên Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    textLeft: {
        fontSize: 16,
        fontWeight: '600',
    },
    textRight: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555555',
    },
    wrapperModal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    wrapperModalLeft: {
        width: '30%',
        fontSize: 12,
        fontWeight: '400',
        color: '#c53b84',
    },
    wrapperModalRight: {
        width: '70%',
        flexWrap: 'wrap',
        fontSize: 12,
        fontWeight: '400',
        color: '#28b08a',
        borderColor: '#cccccc',
        borderWidth: 1,
        paddingLeft: 8,
    },
});
