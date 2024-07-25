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
	reducers: {
		clearMovies: (state) => {
			state.movies = [];
		},
	},
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
				if (!action.payload.message) {
					state.movies = action.payload.newSearch ? action.payload.data : [...state.movies, ...action.payload.data];
				} else {
					state.movies = [];
					state.message = action.payload.message;
					state.error = true;
				}
				state.loading = false;
			});
		// *********** searchMoviesByName END *********** \\
	},
});

export const { clearMovies } = reducer.actions;

export default reducer.reducer;
