import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { AbilityEntityIndexContext } from '../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const onClick = (abilityEntityIndex: AbilityEntityIndex) => {
	Abilities.AttemptToUpgrade(abilityEntityIndex)
}

const LevelUpButton = () => {
	$.Msg('REACT-RENDER: LevelUpButton rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isAbilityUpgradeable, setIsAbilityUpgradeable] = useState(false)

	useInterval(() => {
		const isUpgradeable = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED
		const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())
		const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0
		const isMaxLevel = Abilities.GetLevel(abilityEntityIndex) === Abilities.GetMaxLevel(abilityEntityIndex)
		setIsAbilityUpgradeable(isUpgradeable && isControllable && hasAbilityPoints && !isMaxLevel)
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			{isAbilityUpgradeable && (
				<>
					<DOTAScenePanel map='scenes/hud/levelupburst' className={Styles.particleScene} />
					<Panel onactivate={() => onClick(abilityEntityIndex)} className={Styles.buttonBackground}>
						<Image className={Styles.icon} />
					</Panel>
				</>
			)}
		</Panel>
	)
}

export default LevelUpButton
