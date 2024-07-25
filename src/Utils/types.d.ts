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
};

export type SearchMovieType = {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
};

export type SearchTypes = "Movies" | "Tv Series" | "Tv Serie Episodes";
