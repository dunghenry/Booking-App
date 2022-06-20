import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;