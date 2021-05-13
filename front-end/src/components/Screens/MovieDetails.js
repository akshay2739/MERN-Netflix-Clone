import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieById } from '../../actions/movieAction'
import Button from '../UI/Button'
import Loader from '../UI/Loader'

import classes from './CSS/MovieDetails.module.css'

const MovieDetails = ({ history, match }) => {
	const dispatch = useDispatch()

	const movieDetails = useSelector((state) => state.movie)
	const { loading, movie, error } = movieDetails

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(getMovieById(match.params.id))
	}, [dispatch, match.params.id])

	let genres

	genres = movie && movie.genres.map((genre) => ' ' + genre).toString()

	if (movie) {
		document.title = `Netflix | ${movie.title}`
	}

	return loading ? (
		<Loader />
	) : error ? (
		<p>{error}</p>
	) : movie ? (
		<div className={classes.movieDetailsContainer}>
			<img src={movie.image} alt={movie.title} />
			<div className={classes.movieDetails}>
				<h1>{movie.title}</h1>
				<p className={classes.overview}>{movie.description}</p>

				<div className={classes.extraDetails}>
					<p className={classes.adultCert}>{movie.adultCert ? '18+' : '13+'}</p>
					<p>{movie.year.split('-')[0]}</p>
					<p>
						<span className={classes.label}>Rating :</span> {movie.rating}{' '}
					</p>
					<p>
						<span className={classes.label}>No. of Reviews :</span>{' '}
						{movie.numberOfReviews}{' '}
					</p>
				</div>

				<div>
					<p>
						<span className={classes.label}>Genres :</span> {genres}
					</p>
				</div>

				<div>
					<Button className='button' title='Watch Now' />
					<Button className='buttonOutline' title='Download' />
				</div>
			</div>
		</div>
	) : (
		<p>Loading</p>
	)
}

export default MovieDetails
