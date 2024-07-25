import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { searchMoviesByName } from "../Redux/action";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { SearchTypes } from "../Utils/types";
import useToast from "../Hooks/useToast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {};
const columns: Array<GridColDef> = [
	{
		field: "imdbID",
		headerName: "ID",
		headerClassName: "font-semibold lg:text-xl",
	},
	{
		field: "Year",
		headerClassName: "font-semibold lg:text-xl",
	},
	{
		field: "Title",
		width: 400,
		headerClassName: "font-semibold lg:text-xl",
	},
	{
		field: "Poster",
		renderCell: (row) => <img src={row.value} className='h-full object-contain' />,
		headerClassName: "font-semibold lg:text-xl flex flex-1",
		cellClassName: "flex flex-1",
	},
];
const debounce = 250;
type FormValueTypes = {
	releaseYear?: number;
	searchValue: string;
	searchType: SearchTypes;
};
const HomePage = (props: Props) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const { movies, loading, error, message } = useAppSelector((state) => state.global);
	const { showToast } = useToast();
	const [formValues, setFormValues] = useState<FormValueTypes>({
		releaseYear: undefined,
		searchValue: "Pokemon",
		searchType: "Movies",
	});
	const dipsatch = useAppDispatch();
	useEffect(() => {
		if (error && message) {
			showToast({
				message,
				type: "error",
			});
		}
	}, [error, message]);

	useEffect(() => {
		if (formValues.searchValue) {
			var timeout = setTimeout(() => {
				dipsatch(
					searchMoviesByName({
						page,
						searchValue: formValues.searchValue,
						type: formValues.searchType,
						releaseYear: formValues.releaseYear,
					})
				);
			}, debounce);

			return () => {
				if (timeout) {
					clearTimeout(timeout);
				}
			};
		} else {
			// if I don't give a search value API returns error, to avoid this I handled it myself
			showToast({
				message: "You need to enter a search value",
				type: "error",
			});
		}
	}, [formValues]);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({ ...formValues, [event.currentTarget.name]: event.currentTarget.value });
	};

	const handleChange = (event: SelectChangeEvent) => {
		setFormValues({ ...formValues, searchType: event.target.value as SearchTypes });
	};
	return (
		<div className='min-w-7xl flex flex-col items-center gap-y-10 h-screen bg-slate-300 relative'>
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className='flex flex-col items-center w-full gap-y-5 xl:w-1/3 mt-20'>
				<TextField
					id='outlined-search'
					label={`Search in ${formValues.searchType}`}
					onChange={handleInput}
					name='searchValue'
					type='search'
					autoFocus
					value={formValues.searchValue}
					className='w-11/12'
				/>
				<TextField
					id='outlined-search'
					label={`Enter a release year`}
					onChange={handleInput}
					name='releaseYear'
					type='number'
					value={formValues.releaseYear}
					className='w-11/12'
				/>
				<FormControl className='w-11/12'>
					<InputLabel id='select-label'>Search In</InputLabel>
					<Select
						labelId='select-label'
						id='select'
						name='searchType'
						value={formValues.searchType}
						label='SearchType'
						onChange={handleChange}>
						<MenuItem value={"Movies"} className='text-slate-200'>
							Movies
						</MenuItem>
						<MenuItem value={"Tv Series"}>Tv Series</MenuItem>
						<MenuItem value={"Tv Serie Episodes"}>Tv Serie Episodes</MenuItem>
					</Select>
				</FormControl>
			</motion.div>
			{movies.length > 0 ? (
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
						delay: 0.5,
					}}
					className='h-[611px] w-11/12 xl:w-1/2 bg-white drop-shadow-lg'>
					<DataGrid
						rows={movies}
						columns={columns}
						loading={loading}
						getRowId={(row) => row.imdbID}
						rowHeight={100}
						onRowClick={(row) => {
							navigate(`/details/${row.id}`);
						}}
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
										type: formValues.searchType,
									})
								);
							}
						}}
					/>
				</motion.div>
			) : (
				<code className='text-slate-900'>Search for some movies first..</code>
			)}
		</div>
	);
};

export default HomePage;
