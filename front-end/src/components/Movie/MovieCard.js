import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './CSS/MovieCard.module.css'

const MovieCard = (props) => {
	return (
		<NavLink to={`/movie/${props.movie.movieId}`} className={classes.MovieCard}>
			<img src={props.movie.backdropImage} alt={props.movie.title} />
			<div className={classes.titleOverlay}>
				<p className={classes.title}>{props.movie.title}</p>
				<div className={classes.movieDetails}>
					<p className={classes.adultCert}>
						{props.movie.adultCert ? 'A' : 'U/A'}
					</p>
					<p>{props.movie.rating} / 10</p>
				</div>
			</div>
		</NavLink>
	)
}

export default MovieCard
