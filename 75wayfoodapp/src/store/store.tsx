
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authReducer'
import partnerReducer from './reducers/partnerReducer'
import restorentReducer from './reducers/restorentReducer'
import {api} from '../services/api'
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    restorent:restorentReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();