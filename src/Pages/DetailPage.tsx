import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { searchMovieById } from "../Redux/action";
import { clearMovieDetail } from "../Redux/reducers";
import useToast from "../Hooks/useToast";

type Props = {};

const DetailPage = (props: Props) => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const { error, message, movieDetail } = useAppSelector((state) => state.global);
	useEffect(() => {
		if (error && message) {
			showToast({
				message,
				type: "error",
			});
		}
	}, [error, message]);

	useEffect(() => {
		const id = pathname.split("/details/")[1];
		dispatch(searchMovieById(id));
		return () => {
			dispatch(clearMovieDetail());
		};
	}, []);

	return (
		<div className='min-w-7xl flex flex-col items-center gap-y-10 h-screen bg-slate-300 relative'>
			{movieDetail?.Title}
		</div>
	);
};

export default DetailPage;
