import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies, getMoviesByGenres } from '../../actions/movieAction'
import MovieCard from '../Movie/MovieCard'
import Loader from '../UI/Loader'
import classes from './CSS/MovieList.module.css'

const MoviesList = () => {
	const dispatch = useDispatch()

	const moviesList = useSelector((state) => state.moviesList)
	const { loading, movies, error } = moviesList

	useEffect(() => {
		document.title = 'Netflix | Movies'
		window.scrollTo(0, 0)
		dispatch(getAllMovies())
	}, [dispatch])

	const selectChangeHandler = (e) => {
		e.preventDefault()
		dispatch(getMoviesByGenres(e.target.value))
	}

	return (
		<>
			<div className={classes.optionContainer}>
				<p>Select Genre : </p>
				<select onChange={selectChangeHandler}>
					<option value='All'>All</option>
					<option value='Thriller'>Thriller</option>
					<option value='Horror'>Horror</option>
					<option value='Comedy'>Comedy</option>
					<option value='Adventure'>Adventure</option>
					<option value='Action'>Action</option>
					<option value='Fantasy'>Fantasy</option>
				</select>
			</div>

			<div className={classes['movie-list-container']}>
				{loading ? (
					<Loader />
				) : error ? (
					<p>{error}</p>
				) : (
					movies.map((movie) => <MovieCard movie={movie} key={movie.movieId} />)
				)}
			</div>
		</>
	)
}

export default MoviesList
