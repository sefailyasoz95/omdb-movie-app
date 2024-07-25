import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../Utils/axiosClient";
import axios from "axios";
import { OMDB_API_KEY } from "../Utils/constant";
type Body = {
	searchValue: string;
	page: number;
};
export const searchMoviesByName = createAsyncThunk("app/searchMoviesByName", async (data: Body) => {
	try {
		const response = await axios.get(
			`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${data.searchValue}&page=${data.page}`
		);
		if (response.data.Response === "True") {
			console.log("response.data.Search: ", response.data.Search);

			return {
				data: response.data.Search,
				message: "",
			};
		} else {
			return {
				data: [],
				message: "No Search Result!",
			};
		}
	} catch (error) {
		return {
			data: [],
			message: "Something went wrong!",
		};
	}
});
