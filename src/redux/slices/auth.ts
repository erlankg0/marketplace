import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth} from "@network/interfaces/auth/auth.ts";

const initialState: IAuth = {
    accessToken: '',
    refreshToken: '',
    isAuthorized: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        login: (state) => {
            localStorage.setItem('accessToken', state.accessToken);
            localStorage.setItem('refreshToken', state.refreshToken);
            state.isAuthorized = !state.isAuthorized;
        },
        logout: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.isAuthorized = !state.isAuthorized;
        }
    }
});

export const {setAccessToken, setRefreshToken, logout, login} = authSlice.actions;
export default authSlice.reducer;
