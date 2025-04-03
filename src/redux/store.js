import { configureStore,combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from "redux-persist";
import counterReducer from "./slices/counterSlice";
import searchQueryReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
import { mainCategoryApi } from "@/Apis/mainCategoryApi";
import { productApi } from "@/Apis/productApi";
import { userApi } from "@/Apis/userApi";
import { cartApi } from "@/Apis/cartApi";
import { paymentApi } from "@/Apis/paymentApi";
import { orderApi } from "@/Apis/orderApi";
import { subCategoryApi } from "@/Apis/subCategoryApi";
import { productImageApi } from "@/Apis/productImageApi";

const persistConfig = {
    key: "root",
    storage,
};
const rootReducer = combineReducers({
   counter:counterReducer,
   searchQuery:searchQueryReducer,
   auth:authReducer,
   [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
   [productApi.reducerPath]: productApi.reducer,
   [userApi.reducerPath]: userApi.reducer,
   [cartApi.reducerPath]: cartApi.reducer,
   [paymentApi.reducerPath]: paymentApi.reducer,
   [orderApi.reducerPath]: orderApi.reducer,
   [subCategoryApi.reducerPath]: subCategoryApi.reducer,
   [productImageApi.reducerPath]: productImageApi.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>  
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(mainCategoryApi.middleware,productImageApi.middleware,subCategoryApi.middleware,orderApi.middleware,productApi.middleware,userApi.middleware,cartApi.middleware,paymentApi.middleware),
});

export const persistor = persistStore(store);