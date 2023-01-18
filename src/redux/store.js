import { combineReducers, configureStore,  } from "@reduxjs/toolkit";
import { userReducer } from "./Users";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import { productReducer } from "./product";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
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