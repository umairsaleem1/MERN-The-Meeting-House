import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';



const store = configureStore({
    reducer: {
        steps: stepsReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;