import { createSlice } from '@reduxjs/toolkit';

const typeSlice = createSlice({
    name: 'type',
    initialState: {
        type:[]
    },
    reducers:{
        initTypeInfo: (state, action) => {
            state.type = action.payload
        },
    }
});

export const {initTypeInfo} = typeSlice.actions
export default typeSlice.reducer