import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: true,
        userInfo: {},
    },
    reducers:{
        initUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

const {initUserInfo} = userSlice.actions
export default userSlice.reducer