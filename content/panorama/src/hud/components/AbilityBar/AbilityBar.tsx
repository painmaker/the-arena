import React, { useContext, useEffect, useState } from 'react'
import AbilityBarItem from './AbilityBarItem/AbilityBarItem'
import { HUD_THINK_FAST } from '../../App'
import useInterval from '../../hooks/useInterval'
import Styles from './styles.module.css'
import { isEqual } from '../../utils/isEqual'
import { SelectedEntityIndexContext } from '../../context/SelectedEntityIndexContext'

const getAbilities = (abilityCount: number, selectedEntityIndex: EntityIndex): AbilityEntityIndex[] => {
	if (abilityCount <= 0) {
		return []
	}
	return Array.from(Array(abilityCount).keys())
		.map(abilityNumber => Entities.GetAbility(selectedEntityIndex, abilityNumber))
		.filter(abilityEntityIndex => abilityEntityIndex !== -1)
		.filter(abilityEntityIndex => Abilities.IsDisplayedAbility(abilityEntityIndex))
		.sort()
}

const AbilityBar = () => {
	$.Msg('REACT-RENDER: AbilityBar rendered')

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [abilityEntityIndexes, setAbilityEntityIndexes] = useState<AbilityEntityIndex[]>(() =>
		getAbilities(Entities.GetAbilityCount(selectedEntityIndex), selectedEntityIndex),
	)
	const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedEntityIndex))

	useInterval(() => {
		const abilityCount = Entities.GetAbilityCount(selectedEntityIndex)
		const newAbilities = getAbilities(abilityCount, selectedEntityIndex)
		setAbilityPoints(Entities.GetAbilityPoints(selectedEntityIndex))
		setAbilityEntityIndexes(oldAbilities => (isEqual(oldAbilities, newAbilities) ? oldAbilities : newAbilities))
	}, HUD_THINK_FAST)

	useEffect(() => {
		if (abilityPoints <= 0) {
			Game.EndAbilityLearnMode()
		}
	}, [abilityPoints])

	if (abilityEntityIndexes.length === 0) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			{abilityEntityIndexes.map(abilityEntityIndex => (
				<AbilityBarItem key={abilityEntityIndex} abilityEntityIndex={abilityEntityIndex} />
			))}
		</Panel>
	)
}

export default AbilityBar
