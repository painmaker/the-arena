import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../App'
import useInterval from '../../hooks/useInterval'
import Styles from './styles.module.css'

const SubComponent1 = () => {
	const [count, setCount] = useState(0)

	useInterval(() => {
		setCount(prevCount => prevCount - 1)
	}, HUD_THINK_FAST)

	if (count % 2 === 0) {
		return null
	}

	return <Label className={Styles.label} text={`count: ${count}`} />
}

const Test = () => {
	const [count, setCount] = useState(0)

	useInterval(() => {
		setCount(prevCount => prevCount + 1)
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={`count: ${count}`} />
			<SubComponent1 />
		</Panel>
	)
}

export default React.memo(Test)
