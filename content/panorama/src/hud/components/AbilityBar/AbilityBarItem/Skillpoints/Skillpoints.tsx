import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { AbilityEntityIndexContext } from '../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const Skillpoints = () => {
	// $.Msg("REACT-RENDER: AbilityBarItem - Skillpoints rendered");

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(abilityEntityIndex))
	const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(abilityEntityIndex))
	const [isUpgradeable, setIsUpgradeable] = useState(false)

	useInterval(() => {
		setAbilityLevel(Abilities.GetLevel(abilityEntityIndex))
		setMaxAbilityLevel(Abilities.GetMaxLevel(abilityEntityIndex))
		setIsUpgradeable(
			Entities.GetAbilityPoints(selectedEntityIndex) > 0 &&
				Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
		)
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			{Array.from({ length: maxAbilityLevel }, (_, index) => index + 1).map(index => {
				return (
					<Panel key={`${abilityEntityIndex}_level_${index}`} className={Styles.column} style={{ width: `${100 / maxAbilityLevel}%` }}>
						<Panel
							className={Styles.skillpoint}
							style={{
								backgroundColor: abilityLevel >= index ? 'orange' : 'black',
								boxShadow:
									isUpgradeable && index === abilityLevel + 1
										? 'fill rgba(255, 174, 0, 0.6) 0px 0px 2px 1px'
										: 'fill rgba(0, 0, 0, 0.4) 0px 0px 2px 0.5px',
							}}
						/>
					</Panel>
				)
			})}
		</Panel>
	)
}

export default React.memo(Skillpoints)
