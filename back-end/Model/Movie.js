const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
	movieId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
		required: true,
	},
	adultCert: {
		type: Boolean,
		required: true,
	},
	numberOfReviews: {
		type: String,
		required: true,
	},
	genres: {
		type: [String],
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	backdropImage: {
		type: String,
		required: true,
	},
})

const Movie = mongoose.model('movies', MovieSchema)

module.exports = Movie
