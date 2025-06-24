
import { configureStore } from "@reduxjs/toolkit";
import { ChatReducer } from "../reducer/reducer.";
import { thunk } from "redux-thunk";

export const store=configureStore({
    reducer:{chatreducer:ChatReducer},
    middleware: (getDefaultMiddleware) => [thunk],
})