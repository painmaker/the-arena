import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

const ManaCost = () => {
	$.Msg('REACT-RENDER: ManaCost rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)

	const [manaCost, setManaCost] = useState(Abilities.GetManaCost(abilityEntityIndex))

	useInterval(() => {
		setManaCost(Abilities.GetManaCost(abilityEntityIndex))
	}, HUD_THINK_FAST)

	if (manaCost === 0) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={manaCost} />
		</Panel>
	)
}

export default ManaCost
