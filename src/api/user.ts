import axiosClient from './axiosClient';
const user = {
    async getApiCurrent() {
        const url = '/api/user/get-current';
        try {
            const response = await axiosClient.get(url);
            console.log({ response });
            return response;
        } catch (error) {
            console.log({ error });
            return error;
        }
    },
};
export default user;
