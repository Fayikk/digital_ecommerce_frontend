import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/
// https://localhost:7014/api/SubCategory/SubCategories
export const subCategoryApi = createApi({
    reducerPath:'subCategoryApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            headers.set('Content-Type','application/json');
            return headers;
        }
    }),
    tagTypes:['SubCategory'],
    endpoints:(builder) =>({
       addSubCategory:builder.mutation({
            query:(body) => ({
                url:'SubCategory',
                method:'POST',
                body,
            }),
            invalidatesTags:['SubCategory'],
        }),
        getSubCategories:builder.query({
            query:() => 'SubCategory/SubCategories',
            providesTags:['SubCategory'],
        }),
    })
})

export const {useAddSubCategoryMutation,useGetSubCategoriesQuery} = subCategoryApi;