import React, { useCallback, useMemo, useState } from 'react'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'
import useGameEvent from '../../hooks/useGameEvent'

type Props = {
	children: JSX.Element | JSX.Element[]
}

const excludedUnits = ['shopkeeper_abilities']

const SelectedEntityProvider = (props: Props) => {
	$.Msg('REACT-RENDER: SelectedEntityProvider rendered')

	const { children } = props

	const [selectedEntityIndex, setSelectedEntityIndex] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))

	const getSelectedEntityIndex = useCallback(() => {
		const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer())
		if (queryUnit !== -1) {
			return queryUnit
		}
		const portraitUnit = Players.GetLocalPlayerPortraitUnit()
		if (portraitUnit !== -1) {
			return portraitUnit
		}
		return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
	}, [])

	useGameEvent(
		'dota_player_update_query_unit',
		() => {
			// $.Msg(`dota_player_update_query_unit event: ${JSON.stringify(event)}`)
			const newSelectedEntityIndex = getSelectedEntityIndex()
			const isExcluded = excludedUnits.includes(Entities.GetUnitName(newSelectedEntityIndex))
			setSelectedEntityIndex(oldSelectedEntityIndex => (isExcluded ? oldSelectedEntityIndex : newSelectedEntityIndex))
		},
		[],
	)

	useGameEvent(
		'dota_player_update_selected_unit',
		() => {
			// $.Msg(`dota_player_update_selected_unit event: ${JSON.stringify(event)}`)
			const newSelectedEntityIndex = getSelectedEntityIndex()
			const isExcluded = excludedUnits.includes(Entities.GetUnitName(newSelectedEntityIndex))
			setSelectedEntityIndex(oldSelectedEntityIndex => (isExcluded ? oldSelectedEntityIndex : newSelectedEntityIndex))
		},
		[],
	)

	const contextValue = useMemo(() => ({ selectedEntityIndex }), [selectedEntityIndex])

	return <SelectedEntityIndexContext.Provider value={contextValue}>{children}</SelectedEntityIndexContext.Provider>
}

export default SelectedEntityProvider
