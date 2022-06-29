import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

const Keybind = () => {
	$.Msg('REACT-RENDER: Keybind rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [keybind, setKeybind] = useState<string>('')

	useInterval(() => {
		const isUpgradeable = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED
		const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())
		const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0
		const isInLearningMode = Game.IsInAbilityLearnMode()
		const isTrainable = isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints
		const isPassive = Abilities.IsPassive(abilityEntityIndex)
		const hasKeybind = isControllable && (!isPassive || isTrainable)
		setKeybind(hasKeybind ? Abilities.GetKeybind(abilityEntityIndex) : '')
	}, HUD_THINK_FAST)

	if (keybind === '') {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={keybind} />
		</Panel>
	)
}

export default Keybind
