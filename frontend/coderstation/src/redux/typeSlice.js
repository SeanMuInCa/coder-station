import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getTypeListApi } from "../api/type";
export const getTypeList = createAsyncThunk(
	"type/getTypeList",
	async (_, trunkApi) => {
		const res = await getTypeListApi();
        trunkApi.dispatch(initTypeInfo(res.data))
	}
);
const typeSlice = createSlice({
	name: "type",
	initialState: {
		type: [],
        loading: false,
	},
	reducers: {
		initTypeInfo: (state, action) => {
            state.type = action.payload
			// if (!state.loading) {
			// 	let arr = action.payload;
			// 	arr.forEach((element) => {
			// 		element.color = getRandomHexColor();
			// 	});
			// 	console.log(arr);

			// 	state.type = arr;
			// }
		},
        updateLoadingStatus: (state, action) => {
            state.loading = action.payload
        }
	},
});

export const { initTypeInfo, updateLoadingStatus } = typeSlice.actions;
export default typeSlice.reducer;
