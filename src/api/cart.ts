import axiosClient from './axiosClient';
const cart = {
    async get20LimitCart(query: string) {
        const url = `/api/cart/get-cart${query}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async addToCart(data: object) {
        const url = '/api/cart/add-to-cart';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getCountCartApi(id: number) {
        const url = `/api/cart/get-count?user_id=${id}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteCart(id: number) {
        const url = `/api/cart/delete-cart/${id}`;
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default cart;
