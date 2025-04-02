import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        authValue:{
            id:null,
            name:null,
            email:null,
            role:null,
            token:null,
            isAuthenticated:false,
        }
    },
    reducers: {
        setAuth: (state, action) => {
            state.authValue = action.payload
        },
        clearAuth: (state) => {
            state.authValue = {
                id:null,
                name:null,
                email:null,
                role:null,
                token:null,
                isAuthenticated:false,
            }
        },
        resetAuth: (state) => {
            state.authValue = {
                id:null,
                name:null,
                email:null,
                role:null,
                token:null,
                isAuthenticated:false,
            }
        }

    }
})

export const {setAuth,clearAuth,resetAuth} = authSlice.actions
export default authSlice.reducer