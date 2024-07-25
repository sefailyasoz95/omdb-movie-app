import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../Utils/types";
import { searchMoviesByName } from "./action";

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	movies: [],
	loading: false,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// *********** searchMoviesByName START *********** \\
			.addCase(searchMoviesByName.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = false;
				state.message = "";
			})
			.addCase(searchMoviesByName.fulfilled, (state, action) => {
				state.movies = [...state.movies, ...action.payload.data];
				state.loading = false;
			});
		// *********** searchMoviesByName END *********** \\
	},
});

export const {} = reducer.actions;

export default reducer.reducer;
