import axiosClient from './axiosClient';

const auth = {
    async firstRegister(data: object) {
        const url = '/api/auth/first-register';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
    async completedRegister(data: object) {
        const url = '/api/auth/completed-register';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
    async login(data: object) {
        const url = '/api/auth/login';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            return error;
        }
    },
    // get(id) {
    //     const url = `/categories/${id}`;
    //     return axiosClient.get(url);
    // },
    // add(data) {
    //     const url = `/categories/`;
    //     return axiosClient.post(url, data);
    // },
    // update(data) {
    //     const url = `/categories/${data.id}`;
    //     return axiosClient.patch(url, data);
    // },
    // remove(id) {
    //     const url = `/categories/${id}`;
    //     return axiosClient.delete(url);
    // },
};
export default auth;
