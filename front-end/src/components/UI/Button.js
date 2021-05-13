import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {
	return (
		<button {...props} className={`${classes[props.className]}`}>
			{props.title}
		</button>
	)
}

export default Button
