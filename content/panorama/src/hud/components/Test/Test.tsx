import React, { useCallback, useState } from 'react'
import { HUD_THINK_FAST } from '../../App'
import useInterval from '../../hooks/useInterval'
import Styles from './styles.module.css'

const Mana = () => {
	// const [mana, setMana] = useState(Entities.GetMana(selectedEntityIndex))
	const [mana, setMana] = useState(0)
	useInterval(() => {
		// setMana(Entities.GetMana(selectedEntityIndex))
		setMana(0)
	}, HUD_THINK_FAST)
	return <Label className={Styles.label} text={`mana: ${mana}`} />
}

const Health = () => {
	// const [health, setHealth] = useState(Entities.GetHealth(selectedEntityIndex))
	const [health, setHealth] = useState(0)
	useInterval(() => {
		// setHealth(Entities.GetHealth(selectedEntityIndex))
		setHealth(0)
	}, HUD_THINK_FAST)
	return <Label className={Styles.label} text={`health: ${health}`} />
}

const TestContainer = () => {
	// const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)
	// const [level, setLevel] = useState(Entities.GetLevel(selectedEntityIndex))
	const [level, setLevel] = useState(0)
	const update = useCallback(() => {
		// setLevel(Entities.GetLevel(selectedEntityIndex))
		setLevel(0)
	}, [setLevel])
	useInterval(() => update(), HUD_THINK_FAST)
	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={`level: ${level}`} />
			<Health />
			<Mana />
		</Panel>
	)
}

export default TestContainer
