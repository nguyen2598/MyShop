import axiosClient from './axiosClient';
const notification = {
    async getNotification(query: { page: number }) {
        const url = '/api/notification/get-notification';
        try {
            const response = await axiosClient.get(url, {
                params: query,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
};
export default notification;
