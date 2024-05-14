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
    async getOrderItemToUser(data: { page: number; status: string }) {
        const url = `/api/order/get-order-item?page=${data.page}&status=${data.status}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getOrderItemToAdmin(params: object) {
        const url = `/api/order/get-order-item-admin`;
        try {
            const response = await axiosClient.get(url, {
                params: params,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getOrderSuccess() {
        const url = `/api/order/get-order-success`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async approve(data: object) {
        const url = '/api/order/approve';
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default order;
