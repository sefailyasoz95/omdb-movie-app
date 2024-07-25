import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { searchMoviesByName } from "../Redux/action";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {};
const columns: Array<GridColDef> = [
	{
		field: "imdbID",
		headerName: "ID",
	},
	{
		field: "Year",
	},
	{
		field: "Title",
		width: 200,
	},
	{
		field: "Poster",
	},
];
const HomePage = (props: Props) => {
	const dipsatch = useAppDispatch();
	const { movies } = useAppSelector((state) => state.global);
	useEffect(() => {
		dipsatch(
			searchMoviesByName({
				page: 1,
				searchValue: "movie",
			})
		);
	}, []);

	return (
		<div className='min-w-7xl flex items-center justify-center' style={{ height: "100vh" }}>
			<DataGrid
				rows={movies}
				columns={columns}
				getRowId={(row) => row.imdbID}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				// checkboxSe
			/>
		</div>
	);
};

export default HomePage;
