import React from 'react'
import classes from './Navbar.module.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<NavLink to='/'>
					<img src={logo} alt='' />
				</NavLink>
			</div>
			<div className={classes.links}>
				<NavLink
					exact
					to='/'
					className={classes.link}
					activeStyle={{ color: '#e50914' }}
				>
					Home
				</NavLink>

				<NavLink
					exact
					to='/add-movie'
					className={classes.link}
					activeStyle={{ color: '#e50914' }}
				>
					Add Movie
				</NavLink>
			</div>
		</nav>
	)
}

export default Navbar
