import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISingUp} from "@interfaces/singup.ts";

const initialState: ISingUp = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    remember: false,
    isAuthenticated: false,
    password: '',
    password_confirm: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setMiddleName: (state, action: PayloadAction<string>) => {
            state.middleName = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        toggleRemember: (state) => {
            state.remember = !state.remember;
        },
        login: (state, action: PayloadAction<Partial<ISingUp>>) => {
            state.firstName = action.payload.firstName || '';
            state.lastName = action.payload.lastName || '';
            state.middleName = action.payload.middleName || '';
            state.email = action.payload.email || '';
            state.phone = action.payload.phone;
            state.password = action.payload.password || '';
            state.password_confirm = action.payload.password_confirm || '';
            toggleRemember();
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.firstName = '';
            state.lastName = '';
            state.middleName = '';
            state.email = '';
            state.phone = '';
            state.remember = false;
        }
    }
})

export const {
    setFirstName,
    setLastName,
    setMiddleName,
    setEmail,
    setPhone,
    toggleRemember,
    logout,
    login
} = profileSlice.actions;

export default profileSlice.reducer;
