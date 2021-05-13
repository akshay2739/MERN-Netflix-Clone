const axios = require('axios')
const Movie = require('../Model/Movie')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		console.log('Connnected ' + conn.connection.host)
	} catch (error) {
		console.log(error)
	}
}

connectDB()

const fetchMovies = async (page) => {
	try {
		const { data } = await axios.get(
			'https://api.themoviedb.org/3/discover/movie',
			{
				params: { api_key: process.env.TMDB_API_KEY, page: page },
			}
		)
		const movieDetails = data.results
		movieDetails.map(async (movie) => {
			const { data: temp } = await axios.get(
				'https://api.themoviedb.org/3/genre/movie/list',
				{
					params: {
						api_key: process.env.TMDB_API_KEY,
						language: 'en-US',
					},
				}
			)

			const movieGenres = movie.genre_ids

			for (let i = 0; i < movieGenres.length; i++) {
				let gener = temp.genres.filter((gener) => gener.id === movieGenres[i])
				movieGenres[i] = gener[0].name
			}
			// console.log(movie)
			const MovieModel = {
				movieId: movie.id,
				title: movie.original_title,
				description: movie.overview,
				rating: movie.vote_average,
				numberOfReviews: movie.vote_count,
				year: movie.release_date,
				adultCert: movie.adult,
				genres: movie.genre_ids,
				backdropImage: `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
				image: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
			}
			try {
				const result = await Movie.create(MovieModel)
				console.log(result)
			} catch (error) {
				console.log(error)
			}
		})
	} catch (error) {
		console.log(error)
	}
}

for (let i = 1; i < 11; i++) {
	fetchMovies(i)
}
