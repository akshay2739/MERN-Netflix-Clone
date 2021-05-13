import {
	ADD_MOVIE_FAILURE,
	ADD_MOVIE_REQUEST,
	ADD_MOVIE_RESET,
	ADD_MOVIE_SUCCESS,
	GET_ALL_MOVIES_FAILURE,
	GET_ALL_MOVIES_REQUEST,
	GET_ALL_MOVIES_SUCCESS,
	GET_MOVIE_DETAILS_FAILURE,
	GET_MOVIE_DETAILS_REQUEST,
	GET_MOVIE_DETAILS_SUCCESS,
} from '../constants/movieConstants'

export const movieReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_MOVIE_DETAILS_REQUEST:
			return {
				loading: true,
			}
		case GET_MOVIE_DETAILS_SUCCESS:
			return {
				loading: false,
				movie: action.payload,
			}
		case GET_MOVIE_DETAILS_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const movieListReducer = (state = { movies: [] }, action) => {
	switch (action.type) {
		case GET_ALL_MOVIES_REQUEST:
			return {
				...state,
				loading: true,
			}

		case GET_ALL_MOVIES_SUCCESS:
			return {
				loading: false,
				movies: action.payload,
			}

		case GET_ALL_MOVIES_FAILURE:
			return {
				loading: false,
				erroe: action.payload,
			}
		default:
			return state
	}
}

export const movieCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_MOVIE_REQUEST:
			return {
				...state,
				loading: true,
			}

		case ADD_MOVIE_SUCCESS:
			return {
				loading: false,
				movie: action.payload,
			}

		case ADD_MOVIE_FAILURE:
			return {
				loading: false,
				error: action.payload,
			}
		case ADD_MOVIE_RESET:
			return {}
		default:
			return state
	}
}
