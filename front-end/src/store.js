import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {
	movieCreateReducer,
	movieListReducer,
	movieReducer,
} from './reducers/movieReducer'

const reducer = combineReducers({
	moviesList: movieListReducer,
	movie: movieReducer,
	movieCreate: movieCreateReducer,
})

export const store = createStore(reducer, {}, applyMiddleware(thunk))
