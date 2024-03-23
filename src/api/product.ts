import axiosClient from './axiosClient';

const product = {
    async getTopProducts(query: string) {
        const url = `/api/product${query}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProductRelate(categoryCode: string, id: string) {
        const url = `/api/product/product-relate?categoryCode=${categoryCode}&id=${id}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async get10Products(query: string) {
        const url = `/api/product${query}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProductDetail(id: string) {
        const url = `/api/product/detail?id=${id}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getSearchProduct(query: string) {
        const url = `/api/product/search${query}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProductbyCateCodeApi(query: object) {
        const url = `/api/product/search`;
        try {
            const response = await axiosClient.get(url, {
                params: query,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProductsApi() {
        const url = '/api/product/all';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async getProductsLimitApi(query: string) {
        const url = `/api/product`;
        try {
            const response = await axiosClient.get(url, { params: query });
            return response;
        } catch (error) {
            return error;
        }
    },
    async getNewProductsApi() {
        const url = `/api/product/new-product`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            return error;
        }
    },
    async createProduct(data: {
        title: string;
        description: string;
        price: string;
        quantity: string;
        categoryCode: string;
        images: string[];
    }) {
        const url = `/api/product/create-product`;
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default product;
