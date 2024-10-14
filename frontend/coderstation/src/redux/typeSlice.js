import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTypeListApi } from "../api/type";
export const getTypeList = createAsyncThunk(
	"type/getTypeList",
    async ()=>{
        const res = await getTypeListApi();
        return res.data;
    }
);
const typeSlice = createSlice({
	name: "type",
	initialState: {
		type: [],
	},
	reducers: {
		
	},
    //for async
    extraReducers:(builder)=>{
        builder.addCase(getTypeList.fulfilled,(state,action)=>{
            state.type = action.payload
        })
    }
});

export const { initTypeInfo, updateLoadingStatus } = typeSlice.actions;
export default typeSlice.reducer;
