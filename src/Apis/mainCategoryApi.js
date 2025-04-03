import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/

export const mainCategoryApi = createApi({
    reducerPath:'mainCategoryApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['MainCategory'],
    endpoints:(builder) =>({
        getMainCategories:builder.query({
            query:() => 'MainCategory',
            providesTags:['MainCategory'],
        }),
        addMainCategory:builder.mutation({
            query:(body) => ({
                url:'MainCategory',
                method:'POST',
                body,
            }),
            invalidatesTags:['MainCategory'],
        }),
    })
})

export const {useGetMainCategoriesQuery,useAddMainCategoryMutation} = mainCategoryApi;