import {useSelector, useDispatch, TypedUseSelectorHook} from "react-redux";
import {AddDispatch, RootState} from "@redux/store.ts";

export const useAddDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;