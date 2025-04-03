import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/
//https://localhost:7014/api/Order/CreateOrder

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            const token = localStorage.getItem('token');
            if(token){
                headers.set('Authorization',`Bearer ${token}`);
            }

            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['Order'],
    endpoints:(builder) =>({

        createOrder:builder.mutation({
            query:() => ({
                url:`Order/CreateOrder`,
                method:'POST'
            }),
            invalidatesTags:['Order'],
        }),
        getUserOrders:builder.query({
            query:() => ({
                url:`Order/GetUserOrders`,
                method:'GET',
            }),
            providesTags:['Order'],
        }),

        // getMainCategories:builder.query({
        //     query:() => 'MainCategory',
        //     providesTags:['MainCategory'],
        // })
    })
})

export const {useCreateOrderMutation,useGetUserOrdersQuery} = orderApi;