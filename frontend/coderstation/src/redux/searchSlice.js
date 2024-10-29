import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		SearchInfo: {
			keyWord: "",
			searchType: "issue",
		},
        searchResult: [],
		searchMode: false,
	},
	reducers: {
		initSearchType: (state, action) => {
			state.SearchInfo.searchType = action.payload;
		},
		initSearchWord: (state, action) => {
			state.SearchInfo.keyWord = action.payload;
		},
		resetSearchInfo: (state) => {
			state.SearchInfo = { keyWord: "", searchType: "issue" };
		},
        initSearchResult: (state, action) => {
            state.searchResult = action.payload
        },
		initSearchMode: (state, action) => {
			state.searchMode = action.payload;
		},
	},
});
export const {
	initSearchType,
	initSearchWord,
	resetSearchInfo,
    initSearchResult,
	initSearchMode,
} = searchSlice.actions;
export default searchSlice.reducer;
