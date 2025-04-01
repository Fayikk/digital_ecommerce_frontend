import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchQuery",
    initialState: {
        value: '',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.value = action.payload;
        },
        clearSearchQuery: (state) => {
            state.value = '';
        },
        resetSearchQuery: (state) => {
            state.value = '';
        }

    }
})

export const {setSearchQuery,clearSearchQuery,resetSearchQuery} = searchSlice.actions
export default searchSlice.reducer