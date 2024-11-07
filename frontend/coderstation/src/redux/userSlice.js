import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserInfoApi } from '../api/user'
export const updateUserInfoAsync = createAsyncThunk(
    'user/updateUserInfoAsync',
    async (payload, thunkApi) => {
        await updateUserInfoApi(payload.userId, payload.data);
        thunkApi.dispatch(updateUserInfo(payload.data));
    }
)

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
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
});

export const {initUserInfo, updateLoginStatus, resetUserInfo, updateUserInfo} = userSlice.actions
export default userSlice.reducer