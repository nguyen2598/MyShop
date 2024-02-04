import { Dimensions } from "react-native";

const getWHScreen=()=>{
    const { width,height } = Dimensions.get('window');
    return {width,height}
}
export default getWHScreen()