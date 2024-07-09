import {combineReducers, configureStore} from "@reduxjs/toolkit";
import singUp from "@redux/slices/singup.ts";
import auth from "@redux/slices/auth.ts";

const rootReducer = combineReducers({
    singUp,
    auth
})

const store = configureStore({
    reducer: rootReducer
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;