
import { configureStore } from "@reduxjs/toolkit";
import { ChatReducer } from "../reducer/reducer.";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { AuthenticationReducer } from "../reducer/reducer.";
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    storage,

    
  }

  const allReducer=combineReducers({
    authreducer:AuthenticationReducer,
    chatreducer:ChatReducer
    
})

const persistedReducer = persistReducer(persistConfig, allReducer)

  

export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => [thunk],
})

export const persistor = persistStore(store);