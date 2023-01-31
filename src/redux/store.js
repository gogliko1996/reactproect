import { combineReducers, configureStore,  } from "@reduxjs/toolkit";
import { userReducer } from "./Users";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import { productReducer } from "./product";
import {  reitinRreduser } from "./reitingSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
}

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    reiting: reitinRreduser
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store  = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);