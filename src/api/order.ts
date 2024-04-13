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
    async getOrderToUser() {
        const url = '/api/order/get-order';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getOrderItemToUser() {
        const url = '/api/order/get-order-item';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getOrderItemToAdmin() {
        const url = '/api/order/get-order-item-admin';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default order;
