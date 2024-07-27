import { instance } from "@network/network.ts";

// Define response types if necessary
interface SignInResponse {
    accessToken: string;
    refreshToken: string;
}

export const signIn = async (email: string): Promise<SignInResponse> => {
    try {
        const response = await instance.post<SignInResponse>(`auth/login?email=${email}`);
        return response.data;
    } catch (error) {
        console.error('Sign-in error:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await instance.post('auth/log-out');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
