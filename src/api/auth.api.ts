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

    completeRegistration: async (phone: string, otp: string, name: string, email: string, password: string) => {
        const payload = { phone, otp, name, email, password };
        const response = await apiClient.post('/auth/complete-registration', payload);
        return response.data;
    },

    login: async (phone: string, password: string) => {
        const payload = { phone, password };
        const response = await apiClient.post('/auth/login', payload);
        return response.data;
    },

    forgotPin: async (phone: string) => {
        const payload = { phone };
        const response = await apiClient.post('/auth/forgot-pin', payload);
        return response.data;
    },

    resetPassword: async (phone: string, otp: string, password: string) => {
        const payload = { phone, otp, password };
        const response = await apiClient.post('/auth/reset-password', payload);
        return response.data;
    }


};