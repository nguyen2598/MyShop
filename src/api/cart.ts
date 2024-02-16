import axiosClient from './axiosClient';
const cart = {
    async get20LimitCart(query: string) {
        const url = `/api/cart/get-cart${query}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async addToCart(data: object) {
        const url = '/api/cart/add-to-cart';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
};
export default cart;
