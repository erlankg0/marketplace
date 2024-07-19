import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfile} from "@network/interfaces/profile/profile.ts";

const initialState: IProfile = {
    id: 0,
    imagePath: '',
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phoneNumber: '',
    hasSubscription: false,
    isOrganization: false
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile>) => {
            return {...state, ...action.payload};
        },
        clearProfile: () => initialState,
    }
})

export const {setProfile} = profileSlice.actions;

export default profileSlice.reducer;