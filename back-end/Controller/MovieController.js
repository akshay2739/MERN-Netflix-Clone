const express = require('express')
const Movie = require('../Model/Movie')
const dotenv = require('dotenv')
dotenv.config()

// const  = require('express-async-handler')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const getAllMovies = async (req, res) => {
	try {
		const movieList = await Movie.find({}, null, { sort: { _id: 'desc' } })
		res.json(movieList)
	} catch (error) {
		console.log(error)
	}
}

const getMovieById = async (req, res) => {
	try {
		const movie = await Movie.findOne({
			movieId: req.params.id,
		})
		res.json(movie)
	} catch (error) {
		console.log(error)
	}
}

const getMoviesByGenres = async (req, res) => {
	try {
		let movies
		if (req.params.genre === 'All') {
			movies = await Movie.find()
		} else {
			movies = await Movie.find({ genres: req.params.genre })
		}
		res.json(movies)
	} catch (error) {
		console.log(error)
	}
}

const addMovie = async (req, res) => {
	try {
		const moviesCount = await Movie.countDocuments()
		const movieId = `custom${moviesCount}`

		const movie = {
			title: req.body.title,
			description: req.body.description,
			genres: req.body.genres,
			rating: req.body.rating,
			year: req.body.year,
			adultCert: req.body.adultCert,
			backdropImage: req.body.backdropImage,
			image: req.body.image,
			numberOfReviews: req.body.numberOfReviews,
			movieId,
		}
		const result = await Movie.create(movie)
		res.json(result)
	} catch (error) {
		console.log(error)
	}
}

const uploadRouter = express.Router()

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
})

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname })
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		},
	}),
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
	res.send(req.file.location)
})

module.exports = {
	getAllMovies,
	getMovieById,
	getMoviesByGenres,
	addMovie,
	uploadRouter,
}
