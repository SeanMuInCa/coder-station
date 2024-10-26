import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import typeReducer from './typeSlice'
import searchReducer from './searchSlice'
export default configureStore({
    reducer : {
        user : userReducer,
        type : typeReducer,
        search: searchReducer,
    }
});