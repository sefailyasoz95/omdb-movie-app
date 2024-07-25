import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { searchMoviesByName } from "../Redux/action";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ThemeToggleButton from "../Components/ThemeToggleButton";

type Props = {};
const columns: Array<GridColDef> = [
	{
		field: "imdbID",
		headerName: "ID",
		headerClassName: "font-semibold text-xl",
	},
	{
		field: "Year",
		headerClassName: "font-semibold text-xl",
	},
	{
		field: "Title",
		width: 200,
		headerClassName: "font-semibold text-xl",
	},
	{
		field: "Poster",
		renderCell: (row) => <img src={row.value} className='h-full object-contain' />,
		headerClassName: "font-semibold text-xl",
	},
];
const HomePage = (props: Props) => {
	const [page, setPage] = useState(1);
	const { movies, loading } = useAppSelector((state) => state.global);

	const dipsatch = useAppDispatch();

	useEffect(() => {
		dipsatch(
			searchMoviesByName({
				page,
				searchValue: "movie",
			})
		);
	}, []);

	return (
		<div className='min-w-7xl flex items-center justify-center h-screen dark:bg-slate-900 bg-slate-200 relative'>
			<div className='absolute right-5 top-3'>
				<ThemeToggleButton />
			</div>

			<div className='shadow bg-white'>
				<DataGrid
					rows={movies}
					columns={columns}
					loading={loading}
					getRowId={(row) => row.imdbID}
					rowHeight={100}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					onPaginationModelChange={(val) => {
						if (val.page + 1 > page) {
							setPage(val.page + 1);
							dipsatch(
								searchMoviesByName({
									page: val.page + 1,
									searchValue: "movie",
								})
							);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default HomePage;
