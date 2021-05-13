const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const {
	getAllMovies,
	getMovieById,
	getMoviesByGenres,
	addMovie,
	uploadRouter,
} = require('./Controller/MovieController')

dotenv.config()

const app = express()
if (process.env.NODE_ENV != 'production') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.get('/movies', getAllMovies)

app.get('/movie/:id', getMovieById)

app.get('/movie/genre/:genre', getMoviesByGenres)

app.post('/add-movie', addMovie)

app.use('/upload', uploadRouter)

console.log(process.env.NODE_ENV)

__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	console.log(process.env.NODE_ENV)
	app.use(express.static(path.join(__dirname, '/front-end/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
	)
}

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

app.listen(process.env.PORT, console.log('Server is running'))
