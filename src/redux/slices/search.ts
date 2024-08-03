import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearch } from "@network/interfaces/search/search.ts";

// Начальное состояние
const initialState: ISearch = {
    text: '',
};

// Создание среза (slice) для поиска
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // Редуктор для обновления текста поиска
        setSearchText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        // Дополнительный пример: очистка текста поиска
        clearSearchText: (state) => {
            state.text = '';
        },
    },
});

// Экспортируем действия (actions) и редуктор
export const { setSearchText, clearSearchText } = searchSlice.actions;
export default searchSlice.reducer;