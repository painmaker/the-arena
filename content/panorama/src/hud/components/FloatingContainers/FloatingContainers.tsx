import React, { useState } from 'react'
import { useInterval } from '../../hooks/useInterval'
import FloatingContainer from './FloatingContainer/FloatingContainer'
import { HUD_THINK_FAST } from '../../App'
import { isEqual } from '../../utils/isEqual'
import useNetTableValues from '../../hooks/useNetTableValues'

const MAX_DISTANCE = 4000

const FloatingContainers = () => {
	// $.Msg("REACT-RENDER: FloatingContainers rendered");

	const { units } = useNetTableValues('FloatingBarUnits')

	const [entityIndexes, setEntityIndexes] = useState<EntityIndex[]>([])

	useInterval(() => {
		const centerOrigin = Game.ScreenXYToWorld(Game.GetScreenWidth() / 2, Game.GetScreenHeight() / 2)
		const newEntityIndexes = Object.values(units)
			.filter(entity => Entities.IsSelectable(entity))
			.filter(entity => Game.Length2D(centerOrigin, Entities.GetAbsOrigin(entity)) < MAX_DISTANCE)
			.sort()
		setEntityIndexes(oldEntityIndexes => (isEqual(oldEntityIndexes, newEntityIndexes) ? oldEntityIndexes : newEntityIndexes))
	}, HUD_THINK_FAST)

	return (
		<>
			{entityIndexes.map(entityIndex => (
				<FloatingContainer key={entityIndex} entityIndex={entityIndex} />
			))}
		</>
	)
}

export default React.memo(FloatingContainers)
