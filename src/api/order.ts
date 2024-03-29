import axiosClient from './axiosClient';

const order = {
    async purchase(data: object) {
        const url = '/api/order/purchase';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default order;
