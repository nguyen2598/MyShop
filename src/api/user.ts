import axiosClient from './axiosClient';
const user = {
    async getApiCurrent() {
        const url = '/api/user/get-current';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
};
export default user;
