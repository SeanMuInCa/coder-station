import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		SearchInfo: {
			keyWord: "",
			searchType: "",
		},
        searchResult: [],
	},
	reducers: {
		initSearchType: (state, action) => {
			state.SearchInfo.searchType = action.payload;
		},
		initSearchWord: (state, action) => {
			state.SearchInfo.keyWord = action.payload;
		},
		resetSearchInfo: (state) => {
			state.SearchInfo = { keyWord: "", searchType: "" };
		},
        initSearchResult: (state, action) => {
            state.searchResult = action.payload
        }
	},
});
export const {
	initSearchType,
	initSearchWord,
	resetSearchInfo,
    initSearchResult
} = searchSlice.actions;
export default searchSlice.reducer;
