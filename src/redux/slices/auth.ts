import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth} from "@network/interfaces/auth/auth.ts";

const initialState: IAuth = {
    accessToken: '',
    refreshToken: ''
}


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
            localStorage.setItem(state.accessToken, 'accessToken');
            localStorage.setItem(state.refreshToken, 'refreshToken');
        },
        logout: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
})


export const {setAccessToken, setRefreshToken, logout, login} = authSlice.actions;
export default authSlice.reducer;

