import { format, isAfter, subYears } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
export default function InforModal({
    isVisible,
    closeModal,
    userData,
    onSave,
}: {
    isVisible: boolean;
    closeModal: any;
    userData:
        | { name: string; gender: string; datOfBirth: string; phone: string; email: string; address: string }
        | undefined;
    onSave: (data: any) => void;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({
        name: '',
        phone: '',
        address: '',
        email: '',
        date: '',
    });
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [gender, setGender] = useState(userData?.gender || ''); // Lưu giá trị giới tính
    const [dob, setDob] = useState(userData?.datOfBirth || ''); // Lưu giá trị ngày sinh
    const [formData, setFormData] = useState<{ [key: string]: string }>({
        name: userData?.name || '',
        phone: userData?.phone || '',
        address: userData?.address || '',
        email: userData?.email || '',
        gender: userData?.gender || '',
        datOfBirth: userData?.datOfBirth || '',
    });
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const eighteenYearsAgo = subYears(new Date(), 0);
        if (isAfter(date, eighteenYearsAgo)) {
            hideDatePicker();
            return;
        }
        const formattedDate = format(date, 'dd/MM/yyyy');
        setDob(formattedDate);
        setValidationErrors((prev) => ({
            ...prev,
            ['date']: '',
        }));
        setFormData((prevState) => ({
            ...prevState,
            ['datOfBirth']: formattedDate,
        }));
        hideDatePicker();
    };
    const handleSave = () => {
        let errors = 0;
        if (!formData.name) {
            errors++;
            setValidationErrors((prev) => ({ ...prev, name: 'Không được để trống trường này' }));
        }
        if (!formData.phone) {
            errors++;

            setValidationErrors((prev) => ({ ...prev, phone: 'Không được để trống trường này' }));
        }
        if (!formData.address) {
            errors++;

            setValidationErrors((prev) => ({ ...prev, address: 'Không được để trống trường này' }));
        }
        if (!formData.email) {
            errors++;

            setValidationErrors((prev) => ({ ...prev, email: 'Không được để trống trường này' }));
        }
        if (!formData.datOfBirth) {
            errors++;

            setValidationErrors((prev) => ({ ...prev, date: 'Không được để trống trường này' }));
        }
        if (!formData.gender) {
            errors++;
            console.log('bugggg', gender, 'dfg');
            setValidationErrors((prev) => ({ ...prev, gender: 'Không được để trống trường này' }));
        }

        // Nếu có lỗi, không tiến hành lưu dữ liệu
        if (errors > 0) {
            return;
        }

        // Nếu không có lỗi, tiến hành lưu dữ liệu
        onSave(formData);
        closeModal();
    };
    const handleInputChange = (key: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [key]: '',
        }));
    };
    return (
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Sửa thông tin</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Mã khách hàng: </Text>
                        <Text style={styles.wrapperModalRight}>B20DCCN477</Text>
                    </View>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Tên: </Text>
                        <TextInput
                            style={styles.wrapperModalRight}
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                    </View>
                    <Text style={styles.errorText}>{validationErrors['name']}</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Giới tính: </Text>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="Nam"
                                    status={formData.gender === 'nam' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setValidationErrors((prev) => ({
                                            ...prev,
                                            ['gender']: '',
                                        }));
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            ['gender']: 'nam',
                                        }));
                                    }}
                                />
                                <Text>Nam</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="Nữ"
                                    status={formData.gender === 'nữ' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setValidationErrors((prev) => ({
                                            ...prev,
                                            ['gender']: '',
                                        }));
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            ['gender']: 'nữ',
                                        }));
                                    }}
                                />
                                <Text>Nữ</Text>
                            </View>
                        </View>
                        {/* <TextInput
                            style={styles.wrapperModalRight}
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        /> */}
                    </View>
                    <Text style={styles.errorText}>{validationErrors['gender']}</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Ngày sinh: </Text>
                        <TouchableOpacity onPress={showDatePicker} style={styles.wrapperModalRight}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#28b08a' }}>{dob.toString()} </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>{validationErrors['date']}</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Số điện thoại: </Text>
                        <TextInput
                            style={styles.wrapperModalRight}
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                        />
                    </View>
                    <Text style={styles.errorText}>{validationErrors['phone']}</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Dịa chỉ:</Text>
                        <TextInput
                            style={styles.wrapperModalRight}
                            value={formData.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                        />
                    </View>
                    <Text style={styles.errorText}>{validationErrors['address']}</Text>
                    <View style={styles.wrapperModal}>
                        <Text style={styles.wrapperModalLeft}>Email: </Text>
                        <TextInput
                            style={styles.wrapperModalRight}
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                    <Text style={styles.errorText}>{validationErrors['email']}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Button title="Lưu" onPress={handleSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
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
    errorText: {
        color: 'red',
        fontSize: 12,
        textAlign: 'right',
    },
});
