// https://localhost:7014/api/Payment/create-checkout-session

import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/

export const paymentApi = createApi({
    reducerPath:'paymentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    endpoints:(builder) =>({

        checkout_stripe:builder.mutation({
            query:(data) => ({
                url:`Payment/create-checkout-session`,
                method:'POST',
                body:data
            }),
        }),


        // getMainCategories:builder.query({
        //     query:() => 'MainCategory',
        //     providesTags:['MainCategory'],
        // })
    })
})

export const {useCheckout_stripeMutation} = paymentApi;