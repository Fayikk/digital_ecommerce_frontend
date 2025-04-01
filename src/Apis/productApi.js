import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/Product/GetWithPagination

export const productApi = createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL+"Product",
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['MainCategory'],
    endpoints:(builder) =>({
        getProductWithPagination:builder.mutation({
            query:(model) => ({
                url:'GetWithPagination',
                method:'POST',
                body:model
            }),
            invalidatesTags:['MainCategory'],
        }),
        getProductDetailById:builder.query({
            query:(id) => ({
                url:`GetById?id=${id}`,
                method:'GET',
            }),
            providesTags:['MainCategory'],
        }),
    })
})

export const {useGetProductWithPaginationMutation,useGetProductDetailByIdQuery} = productApi;