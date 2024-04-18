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
    async updateUser(data: {
        name: string;
        gender: string;
        datOfBirth: string;
        phone: string;
        email: string;
        address: string;
    }) {
        const url = '/api/user/update-user';
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default user;
