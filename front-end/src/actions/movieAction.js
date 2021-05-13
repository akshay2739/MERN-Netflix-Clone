import axios from 'axios'
import {
	ADD_MOVIE_FAILURE,
	ADD_MOVIE_REQUEST,
	ADD_MOVIE_SUCCESS,
	GET_ALL_MOVIES_FAILURE,
	GET_ALL_MOVIES_REQUEST,
	GET_ALL_MOVIES_SUCCESS,
	GET_MOVIE_DETAILS_FAILURE,
	GET_MOVIE_DETAILS_REQUEST,
	GET_MOVIE_DETAILS_SUCCESS,
} from '../constants/movieConstants'

export const getAllMovies = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_MOVIES_REQUEST,
		})

		const { data } = await axios.get(`/movies`)

		dispatch({
			type: GET_ALL_MOVIES_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_MOVIES_FAILURE,
			payload: error,
		})
	}
}

export const getMovieById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_MOVIES_REQUEST,
		})

		const { data } = await axios.get(`/movie/${id}`)

		dispatch({
			type: GET_MOVIE_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_MOVIE_DETAILS_FAILURE,
			payload: error,
		})
	}
}

export const getMoviesByGenres = (genre) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_MOVIE_DETAILS_REQUEST,
		})

		const { data } = await axios.get(`/movie/genre/${genre}`)

		dispatch({
			type: GET_ALL_MOVIES_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_ALL_MOVIES_FAILURE,
			payload: error,
		})
	}
}

export const addMovie = (movie) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADD_MOVIE_REQUEST,
		})

		const { data } = await axios.post(`/add-movie`, movie)

		dispatch({
			type: ADD_MOVIE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADD_MOVIE_FAILURE,
			payload: error,
		})
	}
}
