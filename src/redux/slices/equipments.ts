import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEquipment, IEquipments} from "@network/interfaces/equipment/equipment.ts";

const initialState: IEquipments = {
    equipments: [],
}

const equipmentsSlice = createSlice({
    name: 'equipments',
    initialState,
    reducers: {
        setEquipments: (state, action: PayloadAction<IEquipment[]>) => {
            return {...state, equipments: action.payload}
        },
    }
})

export const {setEquipments} = equipmentsSlice.actions
export default equipmentsSlice.reducer;