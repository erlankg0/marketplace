import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISingUp} from "@interfaces/singup.ts";

const initialState: ISingUp = {
    firstName: '',
    lastName: '',
    patronymicName: '',
    email: '',
    phoneNumber: '',
    remember: false,
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
            state.patronymicName = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        toggleRemember: (state) => {
            state.remember = !state.remember;
        },
        login: (state, action: PayloadAction<ISingUp>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.patronymicName = action.payload.patronymicName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.remember = action.payload.remember; // Or set it to true if you want to enable it during login
        },
        logout: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.patronymicName = '';
            state.email = '';
            state.phoneNumber = '';
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
