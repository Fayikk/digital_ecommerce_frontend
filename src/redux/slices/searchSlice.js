import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchQuery",
    initialState: {
        value: '',
        categoryId:null,
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
        },
        setSearchCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        clearSearchCategoryId: (state) => {
            state.categoryId = null;
        },
        resetSearchCategoryId: (state) => {
            state.categoryId = null;
        }
    }
})

export const {setSearchQuery
    ,clearSearchQuery,resetSearchQuery,
    setSearchCategoryId,clearSearchCategoryId,resetSearchCategoryId} = searchSlice.actions
export default searchSlice.reducer