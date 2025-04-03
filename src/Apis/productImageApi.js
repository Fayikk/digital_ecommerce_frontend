import { BASE_URL } from '@/Constants/Url';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// https://localhost:7014/api/https://localhost:7014/api/ProductImage/UploadImage

export const productImageApi = createApi({
    reducerPath:'productImageApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL+"ProductImage",
        prepareHeaders:(headers) => {
            return headers;
        }
    }),
    tagTypes:['ProductImage'],
    endpoints:(builder) =>({
       addProductImage:builder.mutation({
            query:(body) => {
                debugger;
                console.log("body",body); // Log the body for debugging
                const productImageDTO = new FormData();
                productImageDTO.append('ProductId', body.productId); // Append the productId to the FormData object

                body.file.forEach((image) => {
                    productImageDTO.append('File', image); // Append each image to the FormData object
                })

                console.log('FormData:', productImageDTO); // Log the FormData object for debugging

              return {
                url:'/UploadImage',
                method:'POST',
                body:productImageDTO,
              }
            },
            invalidatesTags:['ProductImage'],
        }),
    })
})

export const {useAddProductImageMutation} = productImageApi;