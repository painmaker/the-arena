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
	return Array.from(Array(abilityCount - 1).keys())
		.map(abilityNumber => Entities.GetAbility(selectedEntityIndex, abilityNumber))
		.filter(index => index !== -1)
		.filter(index => Abilities.IsDisplayedAbility(index))
		.sort()
}

const AbilityBar = () => {
	// $.Msg("REACT-RENDER: AbilityBar rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [abilities, setAbilities] = useState<AbilityEntityIndex[]>(() =>
		getAbilities(Entities.GetAbilityCount(selectedEntityIndex), selectedEntityIndex),
	)
	const [abilityPoints, setAbilityPoints] = useState(0)

	useInterval(() => {
		setAbilityPoints(Entities.GetAbilityPoints(selectedEntityIndex))
		const abilityCount = Entities.GetAbilityCount(selectedEntityIndex)
		const newAbilities = getAbilities(abilityCount, selectedEntityIndex)
		setAbilities(oldAbilities => (isEqual(oldAbilities, newAbilities) ? oldAbilities : newAbilities))
	}, HUD_THINK_FAST)

	useEffect(() => {
		if (abilityPoints <= 0) {
			Game.EndAbilityLearnMode()
		}
	}, [abilityPoints])

	if (abilities.length === 0) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			{abilities.map(ability => (
				<AbilityBarItem key={ability} abilityEntityIndex={ability} />
			))}
		</Panel>
	)
}

export default AbilityBar
