import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from './stepsSlice';
import authReducer from './authSlice';
import roomsReducer from './roomsSlice';



const store = configureStore({
    reducer: {
        steps: stepsReducer,
        auth: authReducer,
        rooms: roomsReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;