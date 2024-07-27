import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "@network/interfaces/auth/auth.ts";

const initialState: IAuth = {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    isAuthorized: !!localStorage.getItem('accessToken')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
            state.isAuthorized = true; // Ensure isAuthorized reflects the token state
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
            localStorage.setItem('refreshToken', action.payload);
        },
        login: (state) => {
            localStorage.setItem('accessToken', state.accessToken);
            localStorage.setItem('refreshToken', state.refreshToken);
            state.isAuthorized = true;
        },
        logout: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.isAuthorized = false; // Ensure isAuthorized reflects the logout state
        }
    }
});

export const { setAccessToken, setRefreshToken, logout, login } = authSlice.actions;
export default authSlice.reducer;
