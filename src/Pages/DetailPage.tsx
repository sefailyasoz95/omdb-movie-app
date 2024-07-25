import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { searchMovieById } from "../Redux/action";
import { clearMovieDetail } from "../Redux/reducers";
import useToast from "../Hooks/useToast";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
type Props = {};

const DetailPage = (props: Props) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const { error, message, movieDetail, loading } = useAppSelector((state) => state.global);
	useEffect(() => {
		if (error && message) {
			showToast({
				message,
				type: "error",
			});
			goBack();
		}
	}, [error, message]);

	useEffect(() => {
		const id = pathname.split("/details/")[1];
		dispatch(searchMovieById(id));
		return () => {
			dispatch(clearMovieDetail());
		};
	}, []);
	const goBack = () => navigate("/");
	return (
		<div className='min-w-7xl flex flex-col items-center min-h-screen bg-slate-300 py-10 relative'>
			{loading ? (
				<ArrowPathIcon className='w-10 h-10 animate-spin' />
			) : (
				<>
					<motion.div
						onClick={goBack}
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
						}}
						className='absolute sm:left-10 left-5 top-10 w-8 h-8 cursor-pointer'>
						<ChevronLeftIcon color='black' className='hover:scale-110 transition-all duration-300 ease-in-out' />
					</motion.div>
					{movieDetail && (
						<div className='flex flex-col lg:flex-row items-center justify-between px-2 lg:w-10/12 w-full lg:mx-auto'>
							<motion.img
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
								}}
								src={movieDetail.Poster}
								className='h-full object-cover shadow-xl mb-10 lg:mb-0 shadow-gray-500 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out'
							/>
							<div className='flex flex-col items-center text-center'>
								<motion.code
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.5,
										ease: "easeInOut",
										delay: 0.2,
									}}
									className='font-semibold text-2xl'>
									{movieDetail.Title}
								</motion.code>
								<motion.div
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.5,
										ease: "easeInOut",
										delay: 0.5,
									}}
									className='px-5 my-5 w-full lg:w-3/4'>
									<code className='font-medium text-slate-800 lg:text-lg'>{movieDetail.Plot}</code>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										ease: "easeInOut",
										delay: 0.7,
									}}
									className='px-5 my-5 w-full lg:w-3/4 flex flex-col font-medium text-slate-800 text-lg italic'>
									<code>
										<b>Genre: </b>
										{movieDetail.Genre}
									</code>
									<code>
										<b>Actors: </b>
										{movieDetail.Actors}
									</code>
									<code>
										<b>Director: </b>
										{movieDetail.Director}
									</code>
									<code>
										<b>IMDB Rating: </b>
										{movieDetail.imdbRating}
									</code>
								</motion.div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default DetailPage;
