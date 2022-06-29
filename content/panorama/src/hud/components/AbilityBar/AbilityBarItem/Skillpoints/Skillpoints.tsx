import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { AbilityEntityIndexContext } from '../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const Skillpoints = () => {
	$.Msg('REACT-RENDER: Skillpoints rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [abilityLevel, setAbilityLevel] = useState(Abilities.GetLevel(abilityEntityIndex))
	const [maxAbilityLevel, setMaxAbilityLevel] = useState(Abilities.GetMaxLevel(abilityEntityIndex))
	const [isUpgradeable, setIsUpgradeable] = useState(false)

	useInterval(() => {
		const canBeUpgraded = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED
		const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0
		setAbilityLevel(Abilities.GetLevel(abilityEntityIndex))
		setMaxAbilityLevel(Abilities.GetMaxLevel(abilityEntityIndex))
		setIsUpgradeable(hasAbilityPoints && canBeUpgraded)
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			{Array.from(Array(maxAbilityLevel).keys())
				.map(index => index + 1)
				.map(shiftedIndex => {
					const backgroundColor = abilityLevel >= shiftedIndex ? 'orange' : 'black'
					const boxShadow =
						isUpgradeable && shiftedIndex === abilityLevel + 1
							? 'fill rgba(255, 174, 0, 0.6) 0px 0px 2px 1px'
							: 'fill rgba(0, 0, 0, 0.4) 0px 0px 2px 0.5px'
					return (
						<Panel key={`${abilityEntityIndex}_level_${shiftedIndex}`} className={Styles.column} style={{ width: `${100 / maxAbilityLevel}%` }}>
							<Panel className={Styles.skillpoint} style={{ backgroundColor, boxShadow }} />
						</Panel>
					)
				})}
		</Panel>
	)
}

export default Skillpoints
