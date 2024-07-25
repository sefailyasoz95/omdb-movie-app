import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../Utils/types";
import { searchMovieById, searchMoviesByName } from "./action";

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	movies: [],
	loading: false,
	movieDetail: undefined,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {
		clearMovies: (state) => {
			state.movies = [];
		},
		clearMovieDetail: (state) => {
			state.movieDetail = undefined;
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
				// *********** searchMoviesByName END *********** \\
			})
			.addCase(searchMovieById.pending, (state) => {
				// *********** searchMovieById START *********** \\
				state.loading = true;
				state.success = false;
				state.error = false;
				state.message = "";
			})
			.addCase(searchMovieById.fulfilled, (state, action) => {
				if (!action.payload.message) {
					state.movieDetail = action.payload.data;
				} else {
					state.message = action.payload.message;
					state.error = true;
				}
				state.loading = false;
			});
		// *********** searchMovieById END *********** \\
	},
});
export const { clearMovies, clearMovieDetail } = reducer.actions;

export default reducer.reducer;
