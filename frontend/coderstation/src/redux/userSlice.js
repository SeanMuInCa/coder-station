import { createSlice } from '@redux/js/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
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