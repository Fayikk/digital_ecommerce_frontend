import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL+"ShoppingCart",
        prepareHeaders:(headers) => {
            const token = localStorage.getItem('token');
            if(token){
                headers.set('Authorization',`Bearer ${token}`);
            }

            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['Cart'],
    endpoints:(builder) =>({
        // https://localhost:7014/api/ShoppingCart/GetCart
        //https://localhost:7014/api/ShoppingCart/AddCart
        getCart:builder.query({
            query:() => ({
                url:`GetCart`,
                method:'GET',
            }),
            providesTags:['Cart'],
        }),
        addCart:builder.mutation({
            query:(productId) => ({
                url:`AddCart?productId=${productId}`,
                method:'POST'
            }),
            invalidatesTags:['Cart'],
        }),
        removeFromCart:builder.mutation({
            query:(productId) => ({
                url:`RemoveFromCart?productId=${productId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Cart'],
        }),
        removeCart:builder.mutation({
            query:(cartId) => ({
                url:`RemoveCart?cartId=${cartId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Cart'],
        }),



        // getMainCategories:builder.query({
        //     query:() => 'MainCategory',
        //     providesTags:['MainCategory'],
        // })
    })
})

export const {useGetCartQuery,useAddCartMutation,useRemoveFromCartMutation,useRemoveCartMutation} = cartApi;