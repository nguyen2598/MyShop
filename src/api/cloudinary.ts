import axiosDefault from 'axios';
const cloudinary = {
    async uploadToCloudinary(dataImage: any) {
        const url = `https://api.cloudinary.com/v1_1/dv8beczw7/image/upload`;
        try {
            const response = await axiosDefault.post(url, dataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
};
export default cloudinary;
