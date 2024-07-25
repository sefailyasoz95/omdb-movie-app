export type Theme = "light" | "dark";
export interface ThemeContextType {
	theme?: Theme;
	toggleTheme: () => void;
}

export type InitialState = {
	error: boolean;
	success: boolean;
	message: string;
	movies: Array<any>;
	loading: boolean;
	movieDetail?: MovieDetailType;
};

export type SearchMovieType = {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
};

export type SearchTypes = "Movies" | "Tv Series" | "Tv Serie Episodes";

export type MovieDetailType = {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Response: string;
};
