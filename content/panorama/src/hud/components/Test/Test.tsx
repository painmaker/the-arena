import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../App'
import { SelectedEntityIndexContext } from '../../context/SelectedEntityIndexContext'
import useInterval from '../../hooks/useInterval'
import Styles from './styles.module.css'

const Mana = ({ selectedEntityIndex }: { selectedEntityIndex: EntityIndex }) => {
	const [mana, setMana] = useState(Entities.GetMana(selectedEntityIndex))
	useInterval(() => {
		setMana(Entities.GetMana(selectedEntityIndex))
	}, HUD_THINK_FAST)
	return <Label className={Styles.label} text={`mana: ${mana}`} />
}

const Health = ({ selectedEntityIndex }: { selectedEntityIndex: EntityIndex }) => {
	const [health, setHealth] = useState(Entities.GetHealth(selectedEntityIndex))
	useInterval(() => {
		setHealth(Entities.GetHealth(selectedEntityIndex))
	}, HUD_THINK_FAST)
	return <Label className={Styles.label} text={`health: ${health}`} />
}

const TestContainer = () => {
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)
	return (
		<Panel className={Styles.container}>
			<Health selectedEntityIndex={selectedEntityIndex} />
			<Mana selectedEntityIndex={selectedEntityIndex} />
		</Panel>
	)
}

export default React.memo(TestContainer)
