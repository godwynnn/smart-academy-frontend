
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
const persistedReducer = persistReducer(persistConfig, AuthenticationReducer)

  const allReducer=combineReducers({
    authreducer:persistedReducer,
    chatreducer:ChatReducer
    
})


export const store=configureStore({
    reducer:{allReducer},
    middleware: (getDefaultMiddleware) => [thunk],
})

export const persistor = persistStore(store);