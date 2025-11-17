import apiClient from "./axios.config";

export const AuthApi = {
    requestOtp: async (phone: string) => {
        const payload = { phone };
        const response = await apiClient.post('/auth/request-otp', payload);
        return response.data;
    },

    verifyOtp: async (phone: string, otp: string) => {
        const payload = { phone, otp };
        console.log(payload)
        const response = await apiClient.post('/auth/verify-otp', payload);
        return response.data;
    },
};