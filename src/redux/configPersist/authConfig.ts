import AsyncStorage from '@react-native-async-storage/async-storage'

const authConfig = {
    key: 'auth', // key để xác định lưu trữ dữ liệu
    storage:AsyncStorage,
    whitelist: ['isLoggedIn', 'token'],
    // stateReconciler: autoMergeLevel2, //trong redux-toolkit thi ko cần vì nó có tích hợp sẵn r
    // Các tùy chọn khác của Redux Persist
};

export default authConfig;
