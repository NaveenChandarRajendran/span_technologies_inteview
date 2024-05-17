import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './slice';

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat()
})

export default store;