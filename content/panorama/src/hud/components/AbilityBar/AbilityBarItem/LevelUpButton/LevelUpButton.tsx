import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import AbilityEntityIndexContext from '../../../../context/AbilityEntityIndexContext'
import SelectedEntityIndexContext from '../../../../context/SelectedEntityIndexContext'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const LevelUpButton = () => {
	// $.Msg("REACT-RENDER: AbilityBarItem - LevelUpButton rendered");

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isAbilityUpgradeable, setIsAbilityUpgradeable] = useState(false)

	useInterval(() => {
		const isUpgradeable = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED
		const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())
		const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0
		const isMaxLevel = Abilities.GetLevel(abilityEntityIndex) === Abilities.GetMaxLevel(abilityEntityIndex)
		const isAbilityUpgradeable = isUpgradeable && isControllable && hasAbilityPoints && !isMaxLevel
		setIsAbilityUpgradeable(isAbilityUpgradeable)
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			{isAbilityUpgradeable && (
				<>
					<DOTAScenePanel map='scenes/hud/levelupburst' className={Styles.particleScene} />
					<Panel onactivate={() => Abilities.AttemptToUpgrade(abilityEntityIndex)} className={Styles.buttonBackground}>
						<Panel className={Styles.icon} />
					</Panel>
				</>
			)}
		</Panel>
	)
}

export default React.memo(LevelUpButton)
