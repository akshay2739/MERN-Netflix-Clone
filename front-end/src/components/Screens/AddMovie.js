import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form } from 'react-bootstrap'
import Button from '../UI/Button'
import Loader from '../UI/Loader'
import classes from './CSS/AddMovie.module.css'
import { addMovie } from '../../actions/movieAction'
import { ADD_MOVIE_RESET } from '../../constants/movieConstants'

const AddMovie = ({ history }) => {
	const dispatch = useDispatch()

	const { loading, movie, error } = useSelector((state) => state.movieCreate)

	useEffect(() => {
		dispatch({ type: ADD_MOVIE_RESET })

		if (movie) {
			history.push(`/movie/${movie.movieId}`)
		}
	}, [movie, history, dispatch])

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [adultCert, setAdultCert] = useState(false)
	const [year, setYear] = useState('')
	const [rating, setRating] = useState('')
	const [numberOfReviews, setNumberOfReviews] = useState('')
	const [genres, setGenres] = useState([])
	const [image, setImage] = useState('')
	const [poster, setPoster] = useState('')
	const [uploadingImage, setUploadingImage] = useState(false)
	const [uploadingPoster, setUploadingPoster] = useState(false)
	const [validated, setValidated] = useState(false)

	const titleChangeHandler = (e) => {
		setTitle(e.target.value)
	}

	const descriptionChangeHandler = (e) => {
		setDescription(e.target.value)
	}

	const adultCertChangeHandler = (e) => {
		setAdultCert(e.target.checked)
	}

	const yearChangeHandler = (e) => {
		setYear(e.target.value)
	}

	const ratingChangeHandler = (e) => {
		setRating(e.target.value)
	}

	const numberOfReviewsChangeHandler = (e) => {
		setNumberOfReviews(e.target.value)
	}

	const genresChangeHandler = (e) => {
		let options = e.target.options
		let selectedOptions = []

		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				selectedOptions.push(options[i].value)
			}
		}
		setGenres(selectedOptions)
	}

	const imageChangeHandler = async (e) => {
		const file = e.target.files[0]
		const formdata = new FormData()
		formdata.append('image', file)

		try {
			const config = {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			}

			if (e.target.id === 'poster') {
				setUploadingPoster(true)
				const { data } = await axios.post('/upload', formdata, config)
				setUploadingPoster(false)
				setPoster(data)
			} else {
				setUploadingImage(true)
				const { data } = await axios.post('/upload', formdata, config)
				setUploadingImage(false)
				setImage(data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.stopPropagation()
		} else {
			const movie = {
				title,
				description,
				rating,
				year,
				adultCert,
				numberOfReviews,
				genres,
				backdropImage: image,
				image: poster,
			}
			dispatch(addMovie(movie))
		}

		setValidated(true)
	}

	return loading ? (
		<Loader />
	) : error ? (
		<p>Error</p>
	) : (
		<div className={classes.formWrapper}>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group controlId='title'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						required
						type='text'
						onChange={titleChangeHandler}
						value={title}
					/>
					<Form.Control.Feedback
						type='invalid'
						style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
					>
						Please add a valid Tite.
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId='description'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as='textarea'
						required
						name=''
						id=''
						cols='30'
						rows='10'
						onChange={descriptionChangeHandler}
						value={description}
					/>
					<Form.Control.Feedback
						type='invalid'
						style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
					>
						Please add a valid Description
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group as={Col} controlId='adultCert'>
					<Form.Check
						onChange={adultCertChangeHandler}
						defaultChecked={adultCert}
						label='Adult'
					/>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId='year'>
						<Form.Label>Release Year</Form.Label>
						<Form.Control
							required
							type='text'
							onChange={yearChangeHandler}
							value={year}
						/>
						<Form.Control.Feedback
							type='invalid'
							style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
						>
							Please add a valid Year.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} controlId='rating'>
						<Form.Label>Rating</Form.Label>
						<Form.Control
							required
							type='text'
							onChange={ratingChangeHandler}
							value={rating}
						/>
						<Form.Control.Feedback
							type='invalid'
							style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
						>
							Please add a valid rating.
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId='numberOfReviews'>
						<Form.Label>No. of Reviews</Form.Label>
						<Form.Control
							required
							type='text'
							onChange={numberOfReviewsChangeHandler}
							value={numberOfReviews}
						/>
						<Form.Control.Feedback
							type='invalid'
							style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
						>
							Please add a valid number.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} controlId='genres'>
						<Form.Label>Genres</Form.Label>
						<Form.Control
							as='select'
							required
							multiple
							onChange={genresChangeHandler}
							value={genres}
						>
							<option value='Action'>Action</option>
							<option value='Science Fiction'>Science Fiction</option>
							<option value='Drama'>Drama</option>
							<option value='Comedy'>Comedy</option>
							<option value='Fantasy'>Fantasy</option>
							<option value='Adventure'>Adventure</option>
						</Form.Control>
						<Form.Control.Feedback
							type='invalid'
							style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
						>
							Please select at lease one.
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Form.Group>
					<Form.Label>Image</Form.Label>
					<Form.Control
						required
						type='file'
						name=''
						id='image'
						onChange={imageChangeHandler}
						// value={image}
					/>
					<p>{uploadingImage ? 'Uploading...' : ''}</p>
					<Form.Control.Feedback
						type='invalid'
						style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
					>
						Please add a file.
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group>
					<Form.Label>Poster</Form.Label>
					<Form.Control
						required
						type='file'
						name=''
						id='poster'
						onChange={imageChangeHandler}
						// value={image}
					/>
					<p>{uploadingPoster ? 'Uploading...' : ''}</p>
					<Form.Control.Feedback
						type='invalid'
						style={{ color: '#e50914', fontSize: 15, fontWeight: 600 }}
					>
						Please add a file.
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group>
					<Button className='button' title='Submit' type='submit' />
				</Form.Group>
			</Form>
		</div>
	)
}

export default AddMovie
