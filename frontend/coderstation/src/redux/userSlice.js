import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        userInfo: {},
    },
    reducers:{
        initUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        updateLoginStatus: (state, action) => {
            state.isLogin = action.payload
        },
        resetUserInfo: (state) => {
            state.userInfo = {}
        }
    }
});

export const {initUserInfo, updateLoginStatus, resetUserInfo} = userSlice.actions
export default userSlice.reducer