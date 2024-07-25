import axios from "axios";
import { OMDB_API_KEY } from "./constant";

export const axiosClient = axios.create({
	baseURL: `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`,
});
