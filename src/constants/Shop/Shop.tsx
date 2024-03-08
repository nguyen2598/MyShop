import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from 'react-native-elements';
import product from '@/src/api/product';
const data = [
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
    {
        image: 'https://down-vn.img.susercontent.com/file/a6ceab77a1fb5f64a03d5937d546bef1',
        title: 'Túi Handmade Tự Đan đan len tự làm - Phụ Kiện Đan Túi [Có video hướng dẫn]',
        price: '88.000',
        number_sold: 2800,
    },
];
interface IProduct {
    id: number;
    images: string;
    price: number;
    quantity_sold: number;
    title: string;
}
let ISearchDistance: [{ price: number[] }, { quantity_sold: number[] }];
export default function Shop() {
    const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
    const navigation: any = useNavigation();
    const [mode, setMode] = useState<'bag' | 'clothesMen' | 'clothesWon' | 'shoe' | 'handmade'>('handmade');
    const [modeSearch, setModeSearch] = useState<'new' | 'old' | 'icre' | 'desc' | 'selling' | 'less_interested'>(
        'new',
    );
    const [searchDistance, setSearchDistance] = useState<object>({});
    const goToBack = () => {
        navigation.goBack();
    };
    const goToDetail = (id: number) => {
        navigation.navigate('product_detail', {
            id: id, // Đây là id, bạn có thể thay đổi giá trị tùy ý
            otherParams: 'Hello from Home Screen!', // Bạn có thể truyền các params khác
        });
    };
    const {
        body,
        productList,
        productItem,
        productImage,
        productTitle,
        productFooter,
        productitemContainer,
        price,
        number_sold,
    } = styles;
    useEffect(() => {
        const fetchData = async () => {
            const code =
                mode === 'handmade'
                    ? `THM`
                    : mode === 'clothesMen'
                    ? 'QAN'
                    : mode === 'clothesWon'
                    ? `WMC`
                    : mode === 'bag'
                    ? `TXN`
                    : `GNN`;
            // const query = `?${code}&page=1`;
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
            let query = { code, page: 1, orderBy };
            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    console.log({ datas: response?.data?.response?.rows });
                    setDataProduct(response?.data?.response?.rows);
                }
            } catch (error) {}
        };
        fetchData();
    }, [mode]);
    const [filterVisible, setFilterVisible] = useState(false);

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const applyFilter = () => {
        // Xử lý việc áp dụng bộ lọc ở đây
        // Ví dụ: dispatch một action để lọc danh sách sản phẩm
        toggleFilter(); // Đóng modal sau khi áp dụng bộ lọc
    };
    const handleModeSearch = (state: 'new' | 'old' | 'icre' | 'desc' | 'selling' | 'less_interested') => {
        setModeSearch(state);
    };
    const handleSearchDistance = (key: string, value: number[][]) => {
        setSearchDistance((prev) => ({ ...prev, [key]: value }));
    };
    const handleApply = () => {
        const fetchData = async () => {
            const code =
                mode === 'handmade'
                    ? `THM`
                    : mode === 'clothesMen'
                    ? 'QAN'
                    : mode === 'clothesWon'
                    ? `WMC`
                    : mode === 'bag'
                    ? `TXN`
                    : `GNN`;
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
            let query: { [key: string]: any } = { code, page: 1, orderBy };
            query = { ...query, ...searchDistance };
            // searchDistance.forEach((obj) => {
            //     const keys = Object.keys(obj);
            //     query[keys[0]] = obj[keys[0]];
            // });
            //  `?modeSearch=${modeSearch}&${Object.keys(searchDistance[0])[0]}=${JSON.stringify(
            //     searchDistance[0][Object.keys(searchDistance[0])[0]],
            // )}&${Object.keys(searchDistance[1])[0]}=${searchDistance[1][Object.keys(searchDistance[1])[0]]}`;
            console.log(1, { query });
            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    console.log({ datas: response?.data?.response?.rows });
                    setDataProduct(response?.data?.response?.rows);
                }
            } catch (error) {}
        };
        fetchData();
    };
    const handleReset = () => {
        setModeSearch('new');
        setSearchDistance({});
    };
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const handleScroll = (event: any) => {
        console.log('va');
        // if (isLoad) return;
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        // // console.log(layoutMeasurement.height, contentOffset.y, +contentSize.height, +contentSize.height - 50);
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isEndReached) {
            // setIsLoad(true);
            const fetchData = async () => {
                const code =
                    mode === 'handmade'
                        ? `THM`
                        : mode === 'clothesMen'
                        ? 'QAN'
                        : mode === 'clothesWon'
                        ? `WMC`
                        : mode === 'bag'
                        ? `TXN`
                        : `GNN`;
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
                let query: { [key: string]: any } = { code, page: page + 1, orderBy };
                query = { ...query, ...searchDistance };
                // searchDistance.forEach((obj) => {
                //     const keys = Object.keys(obj);
                //     query[keys[0]] = obj[keys[0]];
                // });
                //  `?modeSearch=${modeSearch}&${Object.keys(searchDistance[0])[0]}=${JSON.stringify(
                //     searchDistance[0][Object.keys(searchDistance[0])[0]],
                // )}&${Object.keys(searchDistance[1])[0]}=${searchDistance[1][Object.keys(searchDistance[1])[0]]}`;
                console.log(1, { query });
                try {
                    const response: any = await product.getProductbyCateCodeApi(query);
                    if (response?.data?.err === 0) {
                        console.log({ datas: response?.data?.response?.rows });
                        setDataProduct((prev) => [...prev, ...response?.data?.response?.rows]);
                        setPage((prev) => prev + 1);
                    }
                } catch (error) {}
            };
            fetchData();
        } else {
            // setIsLoad(false);
        }
    };
    const handleSeeMore = () => {
        const fetchData = async () => {
            const code =
                mode === 'handmade'
                    ? `THM`
                    : mode === 'clothesMen'
                    ? 'QAN'
                    : mode === 'clothesWon'
                    ? `WMC`
                    : mode === 'bag'
                    ? `TXN`
                    : `GNN`;
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
            let query: { [key: string]: any } = { code, page: page + 1, orderBy };
            query = { ...query, ...searchDistance };
            // searchDistance.forEach((obj) => {
            //     const keys = Object.keys(obj);
            //     query[keys[0]] = obj[keys[0]];
            // });
            //  `?modeSearch=${modeSearch}&${Object.keys(searchDistance[0])[0]}=${JSON.stringify(
            //     searchDistance[0][Object.keys(searchDistance[0])[0]],
            // )}&${Object.keys(searchDistance[1])[0]}=${searchDistance[1][Object.keys(searchDistance[1])[0]]}`;
            console.log(1, { query });
            try {
                const response: any = await product.getProductbyCateCodeApi(query);
                if (response?.data?.err === 0) {
                    console.log({ datas: response?.data?.response?.rows });
                    setDataProduct((prev) => [...prev, ...response?.data?.response?.rows]);
                    setPage((prev) => prev + 1);
                }
            } catch (error) {}
        };
        fetchData();
    };
    // useEffect(() => {
    //     if (isAddData) {
    //         setPage((prev) => prev + 1);
    //         const query = `?page=${page + 1}&quantity_sold=DESC`;
    //         console.log({ query });
    //         setIsAddData(false);
    //         const getData = async () => {
    //             const response: any = await product.getTopProducts(query);
    //             if (response?.data?.err === 0) {
    //                 setProductDatas((prev) => [...prev, ...response?.data?.response?.rows]);
    //             }
    //             if (response?.data?.response?.rows?.length === 0) {
    //                 setIsLoad(true);
    //             }
    //         };
    //         getData();
    //     }
    // }, [isAddData]);
    console.log({ searchDistance });
    const [selectedButtonsPrice, setSelectedButtonsPrice] = useState<number[][]>([]);

    // Hàm xử lý khi ấn vào một button
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
    const [selectedButtonsQuantitySold, setSelectedButtonsQuantitySold] = useState<number[][]>([]);

    // Hàm xử lý khi ấn vào một button
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
    // console.log({ selectedButtonsPrice });
    return (
        // <ScrollView style={{ flex: 1, backgroundColor: 'blue' }}>
        <View style={styles.contaner}>
            <View style={styles.headerwrapper}>
                <View style={styles.headerShop}>
                    <TouchableOpacity onPress={goToBack}>
                        <IconAntDesign name="arrowleft" size={36} color="#ffffff" />
                    </TouchableOpacity>
                    <View style={styles.Shopwrapper}>
                        <Text style={styles.Shopwrapperinput}>Sản phẩm</Text>
                    </View>
                    <TouchableOpacity onPress={toggleFilter}>
                        <IconAntDesign name="filter" size={36} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={toggleFilter}>
                    <Text style={styles.filterButton}>Bộ lọc</Text>
                </TouchableOpacity> */}
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
                                    <View style={styles.modalboxInput}>
                                        <Input style={styles.modalInput} placeholder="Tối thiểu" />
                                        <Input style={styles.modalInput} placeholder="Tối đa" />
                                    </View>

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
                <ScrollView>
                    <View style={styles.navmenu}>
                        {/* <TouchableOpacity
                            onPress={() => setMode('new')}
                            style={
                                mode === 'new'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Mới nhất</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('selling')}
                            style={
                                mode === 'selling'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Bán chạy</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => setMode('handmade')}
                            style={
                                mode === 'handmade'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Túi Handmade</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('clothesWon')}
                            style={
                                mode === 'clothesWon'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Quần áo nữ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('clothesMen')}
                            style={
                                mode === 'clothesMen'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Quần áo nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('shoe')}
                            style={
                                mode === 'shoe'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Giày nữ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setMode('bag')}
                            style={
                                mode === 'bag'
                                    ? { ...styles.navmenuItem, borderBottomColor: 'red', borderBottomWidth: 2 }
                                    : styles.navmenuItem
                            }
                        >
                            <Text style={styles.navitemText}>Túi xách nữ</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.body}>
                {/* <ScrollView>
                    <View style={productList}>
                        {data.map((item, index) => (
                            <View style={productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={goToDetail}>
                                    <View style={productItem}>
                                        <View style={productImage}>
                                            <Image
                                                source={{ uri: item.image }}
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
                                        <View style={productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={price}>
                                                ₫{item.price}
                                            </Text>
                                            <Text style={number_sold}>Đã bán {item.number_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                </ScrollView> */}
                <ScrollView
                // onScroll={handleScroll}
                >
                    <View style={productList}>
                        {dataProduct.map((item: IProduct, index) => (
                            <View style={productitemContainer} key={index}>
                                <TouchableWithoutFeedback key={index} onPress={() => goToDetail(item.id)}>
                                    <View style={productItem}>
                                        <View style={productImage}>
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
                                        <View style={productTitle}>
                                            <Text numberOfLines={2} ellipsizeMode="tail">
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={productFooter}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={price}>
                                                ₫{item.price}
                                            </Text>
                                            <Text style={number_sold}>Đã bán {item.quantity_sold}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <Button
                    buttonStyle={styles.modalbuttonFooter1}
                    titleStyle={styles.modalbuttonTextFooter1}
                    title={'Xem thêm'}
                    onPress={handleSeeMore}
                />
            </View>
        </View>
        // {/* </ScrollView> */}
    );
}
const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        flexDirection: 'column',
    },
    headerwrapper: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerShop: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 16,
        backgroundColor: 'rgb(40, 176, 138)',
    },
    Shopwrapper: {
        // padding: 8,
        flex: 1,
    },
    Shopwrapperinput: {
        fontSize: 20,
        fontWeight: '900',
        color: '#ffffff',
    },
    Shopinput: {
        fontSize: 20,
    },
    navmenu: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    navmenuItem: {
        padding: 10,
        paddingBottom: 1,
        paddingTop: 1,
        borderRightWidth: 1,
    },
    navitemText: { fontSize: 16, color: '#555555' },
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
    // ///
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    filterButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    // modalView: {
    //     margin: 20,
    //     backgroundColor: 'white',
    //     borderRadius: 20,
    //     padding: 35,
    //     alignItems: 'center',
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    // },
    modalText: {
        fontSize: 20,
        paddingTop: 16,
        paddingBottom: 16,
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

    // /////////////////
    modalContentHeader: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
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
