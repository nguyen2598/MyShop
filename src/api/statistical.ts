import axiosClient from './axiosClient';
const statistical = {
    async getStatistical() {
        const url = `/api/statistical/get-statistical-month`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default statistical;
