import { createSlice } from '@reduxjs/toolkit';
import { getRandomHexColor } from '../utils/tools';
const typeSlice = createSlice({
    name: 'type',
    initialState: {
        type:[]
    },
    reducers:{
        initTypeInfo: (state, action) => {
            let arr = action.payload
            arr.forEach(element => {
                element.color = getRandomHexColor()
            });
            console.log(arr);
            
            state.type = arr
        },
    }
});

export const {initTypeInfo} = typeSlice.actions
export default typeSlice.reducer