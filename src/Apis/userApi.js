import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/https://localhost:7014/api/User/SignIn

export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL+"User",
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['User'],
    endpoints:(builder) =>({
        signIn:builder.mutation({
            query:(model) => ({
                url:'/SignIn',
                method:'POST',
                body:model
            }),
            invalidatesTags:['User'],
        }),
        signUp:builder.mutation({
            query:(model) => ({
                url:'/SignUp',
                method:'POST',
                body:model
            }),
            invalidatesTags:['User'],
        }),
        // getMainCategories:builder.query({
        //     query:() => 'MainCategory',
        //     providesTags:['MainCategory'],
        // })
    })
})

export const {useSignInMutation,useSignUpMutation} = userApi;