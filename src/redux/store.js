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
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>  
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(mainCategoryApi.middleware,productApi.middleware,userApi.middleware),
});

export const persistor = persistStore(store);