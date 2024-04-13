/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import GoalDaily from './GoalDaily';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

export default function OderPage() {
    const navigation = useNavigation();
    const [data2, setData2] = useState();

    const [sound, setSound] = useState(null);
    const [linkAudio, setLinkAudio] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/apple`);

                const json = await response.json();
                console.log({ res: json[0] });
                setData2(json[0]);
                setLinkAudio(json[0]?.phonetics[0]?.audio);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [isPlaying, setIsPlaying] = useState(false);
    const soundObject = useRef(new Audio.Sound()).current;
    const [soundLoaded, setSoundLoaded] = useState(false);
    const toggleSound = async () => {
        try {
            console.log('vo day');
            if (isPlaying) {
                console.log('vo day2');
                await soundObject.stopAsync();
            } else {
                console.log('vo day3');
                if (!soundLoaded) {
                    await soundObject.loadAsync({
                        uri: 'https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3',
                    });
                    setSoundLoaded(true);
                }
                await soundObject.playAsync();
            }
            console.log('vo day5');
            setIsPlaying((prev) => !prev);
        } catch (error) {
            console.log('vo err');
            console.error('Error toggling sound: ', error);
        }
    };
    return (
        <View
            style={{
                display: 'flex',
                // justifyContent: 'center',
                // paddingTop: 30,
                backgroundColor: '#181A20',
                height: '100%',
                // paddingBottom: 80,
            }}
        >
            {/* <ScrollView> */}

            <View style={styles.select}>
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // paddingBottom: 80,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            height: '120%',
                            width: '60%',
                            borderRadius: 10,
                            // paddingBottom: 80,
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}
                        >
                            <View style={{ position: 'absolute', top: 20, right: 10, zIndex: 99999 }}>
                                <TouchableOpacity onPress={toggleSound}>
                                    <Image
                                        style={{ height: 150, width: 150 }}
                                        source={require('../../../assets/Login.png')}
                                    />
                                    <Text style={{ color: 'red', fontSize: 40 }}>
                                        {isPlaying ? 'Stop Sound' : 'Play Sound'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <ScrollView>
                                    <Text style={styles.mean}>mối bất hoà</Text>
                                    <Text style={styles.sentense}>apple of the eye</Text>
                                    <Text style={styles.mean}>đồng tử, con ngươi</Text>
                                    <Text style={styles.mean}>vật quí báu phải giữ gìn nhất</Text>
                                    <Text style={styles.sentense}>the apple of Sodom ; Dead Sea apple</Text>
                                    <Text style={styles.mean}>quả táo trông mã ngoài thì đẹp nhưng trong đã thối</Text>
                                    <Text style={styles.mean}>
                                        (nghĩa bóng) thành tích bề ngoài, thành tích giả tạo
                                    </Text>
                                    <Text style={styles.sentense}>the rotten apple injures its neighbours</Text>
                                    <Text style={styles.mean}>(tục ngữ) con sâu làm rầu nồi canh</Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}

            <View
                style={{
                    height: '22%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginTop: 50,
                    alignItems: 'center',
                }}
            ></View>
            <View
                style={{
                    // paddingTop: 30,
                    flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                {/* <Menu navigation={navigation} /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    select: {
        paddingTop: 50,
        height: '50%',
    },
    button1: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#6949FF',
        margin: 10,
        width: '40%',
        color: 'white',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 100,
        alignItems: 'center',
    },
    mean: {
        paddingTop: 5,
    },
    sentense: {
        color: '#0099FF',
        paddingTop: 5,
    },
});
