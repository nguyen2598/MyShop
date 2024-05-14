import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

interface ToastProps {
    message: string;
    onHide: () => void;
    icon: string;
}

const Toast = ({ message, onHide, icon }: ToastProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [textWidth, setTextWidth] = useState<number>(0);

    const handleTextLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(onHide);
            }, 2000); // Thời gian hiển thị của thông báo (2 giây trong ví dụ này)
        });
    }, [fadeAnim, onHide]);

    return (
        <Animated.View
            style={[styles.container, [{ transform: [{ translateX: -textWidth / 2 }] }], { opacity: fadeAnim }]}
            onLayout={handleTextLayout}
        >
            <IconAntDesign name={icon} size={30} color="#cccccc" />
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        padding: 20,
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        left: '50%', // Căn giữa theo trục X
        top: '50%', // Căn giữa theo trục Y
        zIndex: 9999,
    },
    message: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Toast;
