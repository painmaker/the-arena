import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

const LockoutIcon = () => {
	$.Msg('REACT-RENDER: LockoutIcon rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isCastable, setIsCastable] = useState(
		Abilities.GetCooldownTimeRemaining(abilityEntityIndex) === 0 && Entities.IsSilenced(selectedEntityIndex),
	)

	useInterval(() => {
		setIsCastable(Abilities.GetCooldownTimeRemaining(abilityEntityIndex) === 0 && Entities.IsSilenced(selectedEntityIndex))
	}, HUD_THINK_FAST)

	if (!isCastable) {
		return null
	}

	return (
		<Panel className={Styles.container} style={{ backgroundColor: isCastable ? 'rgba(0, 0, 0, 0.9)' : 'none' }}>
			<Panel className={Styles.icon} />
		</Panel>
	)
}

export default LockoutIcon
