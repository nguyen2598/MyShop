import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, Slider } from 'react-native-elements';
import Modal from 'react-native-modal';
export default function SaleModal({
    isVisible,
    closeModal,
    onSave,
}: {
    isVisible: boolean;
    closeModal: () => void;

    onSave: (data: any) => void;
}) {
    const [value, setValue] = useState<number>(0);

    const handleSliderChange = (newValue: number) => {
        const roundedValue = Math.round(newValue);
        setValue(roundedValue);
    };
    return (
        <Modal isVisible={isVisible} onBackdropPress={closeModal} style={{ margin: 50 }}>
            <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Text>Giảm giá: {value}%</Text>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={value}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                />
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Button title="Hủy" onPress={closeModal} />
                    <Button title="Lưu" onPress={() => onSave(value)} />
                </View>
            </View>
        </Modal>
    );
}
