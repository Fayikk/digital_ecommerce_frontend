import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL+"ShoppingCart",
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['Cart'],
    endpoints:(builder) =>({
        // https://localhost:7014/api/ShoppingCart/GetCart

        getCart:builder.query({
            query:() => ({
                url:`GetCart`,
                method:'GET',
            }),
            providesTags:['Cart'],
        }),

        // getMainCategories:builder.query({
        //     query:() => 'MainCategory',
        //     providesTags:['MainCategory'],
        // })
    })
})

export const {useGetCartQuery} = cartApi;