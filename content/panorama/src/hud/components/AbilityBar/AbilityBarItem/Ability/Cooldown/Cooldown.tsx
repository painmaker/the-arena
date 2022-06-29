import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

const Cooldown = () => {
	$.Msg('REACT-RENDER: Cooldown rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)

	const [degree, setDegree] = useState(0)
	const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState(0)

	useInterval(() => {
		const newTotalCooldown = Abilities.GetCooldown(abilityEntityIndex)
		const newCooldownTimeRemaining = Abilities.GetCooldownTimeRemaining(abilityEntityIndex)
		const newDegree = Math.floor((newCooldownTimeRemaining / newTotalCooldown) * -360)
		setDegree(Number.isFinite(newDegree) && !Number.isNaN(newDegree) ? newDegree : 0)
		setCooldownTimeRemaining(newCooldownTimeRemaining)
	}, HUD_THINK_FAST)

	if (cooldownTimeRemaining === 0) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<Panel className={Styles.background} style={{ clip: `radial(50% 50%, 0deg, ${degree}deg)` }} />
			<Label className={Styles.label} text={Math.ceil(cooldownTimeRemaining)} />
		</Panel>
	)
}

export default Cooldown
