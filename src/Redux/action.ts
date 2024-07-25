import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OMDB_API_KEY } from "../Utils/constant";
import { SearchTypes } from "../Utils/types";
type Body = {
	searchValue: string;
	page: number;
	type: SearchTypes;
	releaseYear?: number;
};
const baseURL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;
export const searchMoviesByName = createAsyncThunk("app/searchMoviesByName", async (data: Body) => {
	try {
		// the reason for me to not use the axiosClient that I created is, axios adds '/' to the end of the baseURL and it just cannot be removed
		// or I couldn't figure out and having that '/' causes request to fail.
		const type = data.type === "Movies" ? "movie" : data.type === "Tv Series" ? "series" : "episodes";
		const response = await axios.get(
			`${baseURL}&s=${data.searchValue}&type=${type}&page=${data.page}&y=${data.releaseYear}`
		);
		if (response.data.Response === "True") {
			return {
				data: response.data.Search,
				message: "",
				newSearch: data.page === 1,
			};
		} else {
			return {
				data: [],
				message: response.data.Error,
			};
		}
	} catch (error) {
		return {
			data: [],
			message: "Something went wrong!",
		};
	}
});

export const searchMovieById = createAsyncThunk("app/searchMovieById", async (id: string) => {
	try {
		const response = await axios.get(`${baseURL}&i=${id}&plot=full`);
		if (response.data.Response === "True") {
			return {
				data: response.data,
				message: "",
			};
		} else {
			return {
				data: [],
				message: response.data.Error,
			};
		}
	} catch (error) {
		return {
			data: [],
			message: "Something went wrong!",
		};
	}
});
