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
            throw error;
        }
    },
    async sendmailResetPassword(data: { email: string }) {
        const url = '/api/auth/send-reset-email';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async completeResetPassword(data: { email: string; password: string }) {
        const url = '/api/auth/complete-reset-email';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default auth;
