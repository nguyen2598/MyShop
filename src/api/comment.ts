import axiosClient from './axiosClient';
const comment = {
    async getReview(query: { id_product: number; page: number }) {
        const url = '/api/review/get-review';
        try {
            const response = await axiosClient.get(url, {
                params: query,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    async getstar(query: { id_product: number }) {
        const url = '/api/review/get-star';
        try {
            const response = await axiosClient.get(url, {
                params: query,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    async createReview(data: {
        images: string[];
        rating: number;
        content: string;
        user_id: string;
        product_id: string;
        order_detail_code: string;
    }) {
        const url = '/api/review/add-to-review';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default comment;
