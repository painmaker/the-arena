import React, { useState } from 'react'
import { useTimeout } from '../../hooks/useTimeout'
import Styles from './styles.module.css'

type Props = {
	children: React.ReactNode
}

const LOADING_TIME = 1.0

function Loading(props: Props) {
	// $.Msg("REACT-RENDER: Loading rendered");

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
	return <>{props.children}</>
}

export default React.memo(Loading)
