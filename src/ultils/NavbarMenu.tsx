import { ReactElement } from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ItemNavProps from '../interface/ItemNavProps ';
const IconMenu: ItemNavProps[] = [
    {
        title: 'Home',
        icon: <IconFontAwesome name="home" size={30} color="#cccccc" />,
        path: 'home',
    },
    {
        title: 'Cart',
        icon: <IconAntDesign name="shoppingcart" size={30} color="#cccccc" />,
        path: 'cart',
    },
    {
        title: 'Search',
        icon: <IconAntDesign name="search1" size={30} color="#cccccc" />,
        path: 'search',
    },
    {
        title: 'Shop',
        icon: <IconEntypo name="shop" size={30} color="#cccccc" />,
        path: 'shop',
    },
];

export default IconMenu;
