import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../Utils/axiosClient";
import axios from "axios";
import { OMDB_API_KEY } from "../Utils/constant";
import { SearchTypes } from "../Utils/types";
type Body = {
	searchValue: string;
	page: number;
	type: SearchTypes;
	releaseYear?: number;
};
export const searchMoviesByName = createAsyncThunk("app/searchMoviesByName", async (data: Body) => {
	try {
		const type = data.type === "Movies" ? "movie" : data.type === "Tv Series" ? "series" : "episodes";
		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${data.searchValue}&type=${type}&page=${data.page}&y=${data.releaseYear}`
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
