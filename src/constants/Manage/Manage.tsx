import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import product from '@/src/api/product';
import genPrice from '@/src/ultils/func/genNumberPrice';
import { Button } from 'react-native-elements';
interface IProductSearch {
    id: number;
    images: string;
    price: number;
    quantity_sold: number;
    title: string;
}
export default function Manage() {
    const navigation: any = useNavigation();
    const [isLoad, setIsLoad] = useState<boolean>(true);

    const [text, setText] = useState<string>('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [mode, setMode] = useState<'bag' | 'clothesMen' | 'clothesWon' | 'shoe' | 'handmade' | ''>('');
    const [modeSearch, setModeSearch] = useState<'new' | 'old' | 'icre' | 'desc' | 'selling' | 'less_interested'>(
        'new',
    );
    const [searchDistance, setSearchDistance] = useState<object>({});
    const [page, setPage] = useState<number>(1);
    const [dataSearch, setDataSearch] = useState<IProductSearch[]>([]);
    const [selectedButtonsPrice, setSelectedButtonsPrice] = useState<number[][]>([]);

    const [selectedButtonsQuantitySold, setSelectedButtonsQuantitySold] = useState<number[][]>([]);
    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const goToBack = () => {
        navigation.goBack();
    };
    const handleInputSubmit = async (text: string) => {
        const fetchData = async () => {
            let query: { [key: string]: any } = { querySearch: text, page: 1, orderBy: { createdAt: 'DESC' } };

            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    console.log({ datas: response?.data?.response?.rows });
                    setDataSearch(response?.data?.response?.rows);
                }
            } catch (error) {}
        };
        fetchData();
    };
    const goToDetail = (id: number) => {
        navigation.navigate('product_detail', {
            id: id, // Đây là id, bạn có thể thay đổi giá trị tùy ý
            isChange: true,
        });
    };
    const handleButtonPress = (buttonName: number[]) => {
        let newArr = selectedButtonsPrice.filter((item) => `${item}` !== `${buttonName}`);
        // Kiểm tra xem button đã được chọn chưa
        if (newArr.length === selectedButtonsPrice.length) {
            handleSearchDistance('price', [...selectedButtonsPrice, buttonName]);
            setSelectedButtonsPrice((prev) => [...prev, buttonName]); // Nếu đã chọn, hủy chọn nó
        } else {
            handleSearchDistance('price', newArr);
            setSelectedButtonsPrice(newArr); // Nếu chưa chọn, thêm nó vào mảng selectedButtonsPrice
        }
    };
    const handleButtonPressQuantitySold = (buttonName: number[]) => {
        let newArr = selectedButtonsQuantitySold.filter((item) => `${item}` !== `${buttonName}`);
        // Kiểm tra xem button đã được chọn chưa
        if (newArr.length === selectedButtonsQuantitySold.length) {
            handleSearchDistance('quantity_sold', [...selectedButtonsQuantitySold, buttonName]);
            setSelectedButtonsQuantitySold((prev) => [...prev, buttonName]); // Nếu đã chọn, hủy chọn nó
        } else {
            handleSearchDistance('quantity_sold', newArr);
            setSelectedButtonsQuantitySold(newArr); // Nếu chưa chọn, thêm nó vào mảng selectedButtonsPrice
        }
    };
    const handleCreateProduct = () => {
        navigation.navigate('product-manage', {});
    };
    const handleMode = (state: 'bag' | 'clothesMen' | 'clothesWon' | 'shoe' | 'handmade' | '') => {
        setMode(state);
    };
    const handleModeSearch = (state: 'new' | 'old' | 'icre' | 'desc' | 'selling' | 'less_interested') => {
        setModeSearch(state);
    };

    const handleSearchDistance = (key: string, value: number[][]) => {
        setSearchDistance((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        const fetchData = async () => {
            setPage(1);
            const code =
                mode === 'handmade'
                    ? `THM`
                    : mode === 'clothesMen'
                    ? 'QAN'
                    : mode === 'clothesWon'
                    ? `WMC`
                    : mode === 'bag'
                    ? `TXN`
                    : mode === 'shoe'
                    ? `GNN`
                    : ``;
            const orderBy =
                modeSearch === 'new'
                    ? { createdAt: 'DESC' }
                    : modeSearch === 'old'
                    ? { createdAt: 'ASC' }
                    : modeSearch === 'selling'
                    ? { quantity_sold: 'DESC' }
                    : modeSearch === 'icre'
                    ? { price: 'ASC' }
                    : modeSearch === 'desc'
                    ? { price: 'DESC' }
                    : { quantity_sold: 'ASC' };
            let query: { [key: string]: any } = { querySearch: text, code, page: 1, orderBy };
            query = { ...query, ...searchDistance };

            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    setDataSearch(response?.data?.response?.rows);
                }
            } catch (error) {
                setDataSearch([]);
            }
        };
        fetchData();
    };
    const handleReset = () => {
        setMode('');
        setModeSearch('new');
        setSearchDistance({});
        setSelectedButtonsQuantitySold([]);
        setSelectedButtonsPrice([]);
    };
    const handleLoadMore = async () => {
        if (!isLoad) return;
        const code =
            mode === 'handmade'
                ? `THM`
                : mode === 'clothesMen'
                ? 'QAN'
                : mode === 'clothesWon'
                ? `WMC`
                : mode === 'bag'
                ? `TXN`
                : mode === 'shoe'
                ? `GNN`
                : ``;
        const orderBy =
            modeSearch === 'new'
                ? { createdAt: 'DESC' }
                : modeSearch === 'old'
                ? { createdAt: 'ASC' }
                : modeSearch === 'selling'
                ? { quantity_sold: 'DESC' }
                : modeSearch === 'icre'
                ? { price: 'ASC' }
                : modeSearch === 'desc'
                ? { price: 'DESC' }
                : { quantity_sold: 'ASC' };
        let query: { [key: string]: any } = { querySearch: text, code, page: page + 1, orderBy };
        setPage((prev) => prev + 1);
        query = { ...query, ...searchDistance };
        try {
            const response: any = await product.getProductbyCateCodeApi(query);
            if (response?.data?.err === 0) {
                setDataSearch((prev) => [...prev, ...response?.data?.response?.rows]);
            }
            if (response?.data?.response?.rows?.length === 0) {
                setIsLoad(false);
            }
        } catch (error) {
            setDataSearch([]);
        }
    };
    useEffect(() => {
        handleApply();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <View style={styles.headerleft}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#28b08a" />
                    </TouchableOpacity>
                    <View style={styles.searchwrapperinput}>
                        <TextInput
                            style={styles.searchinput}
                            placeholder="Tìm shop t"
                            onChangeText={setText}
                            onSubmitEditing={() => {
                                handleInputSubmit(text);
                            }}
                            value={text}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={toggleFilter}>
                    <IconAntDesign name="filter" size={36} color="#cccccc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreateProduct}>
                    <IconAntDesign name="plus" size={36} color="#28b08a" />
                </TouchableOpacity>
                <Modal
                    isVisible={filterVisible}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    swipeDirection="right"
                    onBackdropPress={toggleFilter}
                    onSwipeComplete={toggleFilter}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <ScrollView style={{ marginBottom: 64 }}>
                            <View style={styles.modalContentHeader}>
                                <Text style={styles.modalText}>Bộ lọc sản phẩm</Text>
                            </View>
                            <View style={styles.modalContentBodyItem}>
                                <View style={styles.modalContentBodyItemHeader}>
                                    <Text style={styles.modalItemtext}>Lọc theo loại</Text>
                                </View>
                                <View style={styles.modalboxbutton}>
                                    <Button
                                        buttonStyle={
                                            mode === 'bag'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            mode === 'bag'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Túi xách nữ"
                                        onPress={() => handleMode('bag')}
                                    />
                                    <Button
                                        buttonStyle={
                                            mode === 'clothesMen'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            mode === 'clothesMen'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Quần áo nam"
                                        onPress={() => handleMode('clothesMen')}
                                    />
                                    <Button
                                        buttonStyle={
                                            mode === 'clothesWon'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            mode === 'clothesWon'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Quần áo nữ"
                                        onPress={() => handleMode('clothesWon')}
                                    />
                                    <Button
                                        buttonStyle={
                                            mode === 'shoe'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            mode === 'shoe'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Giày nữ"
                                        onPress={() => handleMode('shoe')}
                                    />
                                    <Button
                                        buttonStyle={
                                            mode === 'handmade'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            mode === 'handmade'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Túi handmade"
                                        onPress={() => handleMode('handmade')}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalContentBodyItem}>
                                <View style={styles.modalContentBodyItemHeader}>
                                    <Text style={styles.modalItemtext}>Lọc theo giá</Text>
                                </View>
                                <View style={styles.modalboxbutton}>
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'new'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'new'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Mới nhất"
                                        onPress={() => handleModeSearch('new')}
                                    />
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'old'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'old'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Cũ nhất"
                                        onPress={() => handleModeSearch('old')}
                                    />
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'icre'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'icre'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Giá ⬆"
                                        onPress={() => handleModeSearch('icre')}
                                    />
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'desc'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'desc'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Giá ⬇"
                                        onPress={() => handleModeSearch('desc')}
                                    />
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'selling'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'selling'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Bán chạy"
                                        onPress={() => handleModeSearch('selling')}
                                    />
                                    <Button
                                        buttonStyle={
                                            modeSearch === 'less_interested'
                                                ? { ...styles.modalbutton, backgroundColor: '#EE4D2D' }
                                                : styles.modalbutton
                                        }
                                        titleStyle={
                                            modeSearch === 'less_interested'
                                                ? {
                                                      ...styles.modalbuttonText,
                                                      color: '#ffffff',
                                                  }
                                                : styles.modalbuttonText
                                        }
                                        title="Ít quan tâm"
                                        onPress={() => handleModeSearch('less_interested')}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalContentBodyItem}>
                                <View style={styles.modalContentBodyItemHeader}>
                                    <Text style={styles.modalItemtext}>Lọc theo khoảng giá</Text>
                                </View>
                                <View style={styles.modalboxItem}>
                                    <View style={styles.modalboxInput}>
                                        {/* <Input
                                            style={styles.modalInput}
                                            placeholder="Tối thiểu"
                                            // value={searchDistance?.price}
                                        />
                                        <Input style={styles.modalInput} placeholder="Tối đa" /> */}
                                    </View>
                                    <View style={styles.modalboxbutton}>
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(JSON.stringify([0, 50]))
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(JSON.stringify([0, 50]))
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="0-50k"
                                            onPress={() => {
                                                // handleSearchDistance('price', [0, 50]);
                                                handleButtonPress([0, 50]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(JSON.stringify([50, 100]))
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(JSON.stringify([50, 100]))
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="50k-100k"
                                            onPress={() => {
                                                // handleSearchDistance('price', [50, 100]);
                                                handleButtonPress([50, 100]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([100, 150]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([100, 150]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="100k-150k"
                                            onPress={() => {
                                                // handleSearchDistance('price', [100, 150]);
                                                handleButtonPress([100, 150]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([150, 200]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([150, 200]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="150k-200k"
                                            onPress={() => {
                                                // handleSearchDistance('price', [150, 200]);
                                                handleButtonPress([150, 200]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([200, 999999999999999]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsPrice).includes(
                                                    JSON.stringify([200, 999999999999999]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="Trên 200k"
                                            onPress={() => {
                                                // handleSearchDistance('price', [200, 999999999999999]);

                                                handleButtonPress([200, 999999999999999]);
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.modalContentBodyItem}>
                                <View style={styles.modalContentBodyItemHeader}>
                                    <Text style={styles.modalItemtext}>Lọc theo khoảng bán</Text>
                                </View>
                                <View style={styles.modalboxItem}>
                                    {/* <View style={styles.modalboxInput}>
                                        <Input style={styles.modalInput} placeholder="Tối thiểu" />
                                        <Input style={styles.modalInput} placeholder="Tối đa" />
                                    </View> */}

                                    <View style={styles.modalboxbutton}>
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([0, 100]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([0, 100]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="0-100sp"
                                            onPress={() => {
                                                // handleSearchDistance('QuanselectedButtonsQuantitySold', [0, 100]);
                                                handleButtonPressQuantitySold([0, 100]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([100, 500]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([100, 500]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="100-500sp"
                                            onPress={() => {
                                                // handleSearchDistance('QuanselectedButtonsQuantitySold', [100, 500]);
                                                handleButtonPressQuantitySold([100, 500]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([500, 1000]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([500, 1000]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="500-1000sp"
                                            onPress={() => {
                                                // handleSearchDistance('QuanselectedButtonsQuantitySold', [500, 1000]);
                                                handleButtonPressQuantitySold([500, 1000]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([1000, 1500]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([1000, 1500]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="1000-1500sp"
                                            onPress={() => {
                                                // handleSearchDistance('QuanselectedButtonsQuantitySold', [1000, 1500]);
                                                handleButtonPressQuantitySold([1000, 1500]);
                                            }}
                                        />
                                        <Button
                                            buttonStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([1500, 999999999999999]),
                                                )
                                                    ? styles.modalbuttonHighLight
                                                    : styles.modalbutton
                                            }
                                            titleStyle={
                                                JSON.stringify(selectedButtonsQuantitySold).includes(
                                                    JSON.stringify([1500, 999999999999999]),
                                                )
                                                    ? styles.modalbuttonTextHighLight
                                                    : styles.modalbuttonText
                                            }
                                            title="Trên 1500sp"
                                            onPress={() => {
                                                // handleSearchDistance('QuanselectedButtonsQuantitySold', [1500, 999999999999999]);

                                                handleButtonPressQuantitySold([1500, 999999999999999]);
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.modalContentFooter}>
                            <Button
                                buttonStyle={styles.modalbuttonFooter1}
                                titleStyle={styles.modalbuttonTextFooter1}
                                title={'Thiết lập lại'}
                                onPress={handleReset}
                            />
                            <Button
                                buttonStyle={styles.modalbuttonFooter2}
                                titleStyle={styles.modalbuttonTextFooter2}
                                title="Áp dụng"
                                onPress={handleApply}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.productList}>
                        {dataSearch.map((item, index) => (
                            <View style={styles.productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={() => goToDetail(item.id)}>
                                    <View style={styles.productItem}>
                                        <View style={styles.productImage}>
                                            <Image
                                                source={{ uri: JSON.parse(item.images)?.[0] }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    objectFit: 'contain',
                                                }}
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View style={styles.productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={styles.productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
                                                ₫{genPrice(item.price * 1000)}
                                            </Text>
                                            <Text style={styles.number_sold}>Đã bán {item.quantity_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                    {dataSearch.length > 9 && isLoad ? <Button title={'Xem thêm'} onPress={handleLoadMore} /> : ''}
                </ScrollView>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#ffffff',
        // width: width,
        // padding: 20,
    },
    headerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 16,
        justifyContent: 'space-between',
    },
    headerleft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 16,
    },
    shadowHeader: {
        padding: 1,
        borderRadius: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        elevation: 2,
    },
    searchwrapper: {},
    searchwrapperinput: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
        borderRadius: 8,
    },
    searchinput: {
        fontSize: 20,
    },
    body: {
        // marginBottom:20
        flex: 3,
    },
    productList: {
        width: '100%',
        // display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: "blue",
    },
    productitemContainer: {
        width: '50%',
        padding: 4,
    },
    productItem: {
        display: 'flex',
        backgroundColor: '#ffff',
        borderRadius: 2,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        paddingTop: '100%',
        backgroundColor: 'yellow',
        position: 'relative',
    },
    productTitle: {
        padding: 4,
    },
    productFooter: {
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        color: 'red',
    },
    number_sold: {
        fontSize: 12,
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#eeeeee',
        // padding: 22,
        // justifyContent: 'center',
        // alignItems: 'center',

        width: '76%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    modalContentHeader: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
    },
    modalText: {
        fontSize: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    modalContentBodyItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
    },
    modalContentBodyItemHeader: {},
    modalItemtext: { fontSize: 16, paddingBottom: 16 },
    modalboxbutton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    modalbutton: {
        backgroundColor: '#eeeeee',
        padding: 24,
        paddingTop: 4,
        paddingBottom: 4,
    },
    modalbuttonHighLight: {
        backgroundColor: '#EE4D2D',
        padding: 24,
        paddingTop: 4,
        paddingBottom: 4,
    },
    modalbuttonText: {
        color: '#555555',
    },
    modalbuttonTextHighLight: {
        color: '#ffffff',
    },
    modalboxItem: {},
    modalboxInput: {},
    modalInput: {},
    modalContentFooter: {
        position: 'absolute',
        bottom: 0,
        padding: 16,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        gap: 24,
    },
    modalbuttonFooter1: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#ffffff',
        borderColor: '#EE4D2D',
        borderWidth: 1,
    },
    modalbuttonTextFooter1: {
        fontSize: 16,
        color: '#EE4D2D',
    },
    modalbuttonFooter2: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#EE4D2D',
    },
    modalbuttonTextFooter2: {
        fontSize: 16,
    },
});
