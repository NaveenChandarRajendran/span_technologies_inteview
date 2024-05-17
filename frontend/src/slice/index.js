import { combineSlices } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import employeeReducer from './dashboardSlice';
import { persistReducer } from 'redux-persist'

const rootReducer = combineSlices(
    {
        employee: employeeReducer
    }
)

const persistConfig = {
    key: 'root',
    storage
};


export const persistedReducer = persistReducer(persistConfig, rootReducer);