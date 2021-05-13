import { Route, BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Layout/Navbar'
import AddMovie from './components/Screens/AddMovie'
import MovieDetails from './components/Screens/MovieDetails'
import MoviesList from './components/Screens/MoviesList'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={MoviesList} />
					<Route path='/movie/:id' component={MovieDetails} />
					<Route path='/add-movie' component={AddMovie} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
