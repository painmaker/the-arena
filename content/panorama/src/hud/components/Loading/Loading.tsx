import React, { useState } from 'react'
import useTimeout from '../../hooks/useTimeout'
import Styles from './styles.module.css'

type Props = {
	children: JSX.Element | JSX.Element[]
}

const LOADING_TIME = 1.0

const Loading = (props: Props) => {
	// $.Msg("REACT-RENDER: Loading rendered");

	const { children } = props

	const [isLoading, setIsLoading] = useState(true)

	useTimeout(() => {
		setIsLoading(false)
	}, LOADING_TIME)

	if (isLoading) {
		return (
			<Panel className={Styles.container}>
				<Label className={Styles.label} text='LOADING...' />
			</Panel>
		)
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>
}

export default Loading
