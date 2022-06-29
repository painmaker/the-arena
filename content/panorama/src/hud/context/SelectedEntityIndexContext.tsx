import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface ISelectedEntityIndexContext {
	selectedEntityIndex: EntityIndex
	setSelectedEntityIndex?: () => void
}

const initialState = {
	selectedEntityIndex: Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()),
}

export const SelectedEntityIndexContext = React.createContext<ISelectedEntityIndexContext>(initialState)

type Props = {
	children: JSX.Element | JSX.Element[]
}

const EXCLUDED_UNITS = ['shopkeeper_abilities']

const getSelectedEntityIndex = (): EntityIndex => {
	const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer())
	if (queryUnit !== -1) {
		return queryUnit
	}
	const portraitUnit = Players.GetLocalPlayerPortraitUnit()
	if (portraitUnit !== -1) {
		return portraitUnit
	}
	return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
}

export const SelectedEntityProvider = (props: Props) => {
	$.Msg('REACT-RENDER: SelectedEntityProvider rendered')

	const { children } = props

	const [selectedEntityIndex, setSelectedEntityIndex] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))

	const updateSelectedEntity = useCallback(() => {
		const newSelectedEntityIndex = getSelectedEntityIndex()
		const isExcluded = EXCLUDED_UNITS.includes(Entities.GetUnitName(newSelectedEntityIndex))
		setSelectedEntityIndex(oldSelectedEntityIndex => (isExcluded ? oldSelectedEntityIndex : newSelectedEntityIndex))
	}, [setSelectedEntityIndex])

	useEffect(() => {
		const gameEventListenerID = GameEvents.Subscribe('dota_player_update_query_unit', updateSelectedEntity)
		return () => {
			GameEvents.Unsubscribe(gameEventListenerID)
		}
	}, [updateSelectedEntity])

	useEffect(() => {
		const gameEventListenerID = GameEvents.Subscribe('dota_player_update_selected_unit', updateSelectedEntity)
		return () => {
			GameEvents.Unsubscribe(gameEventListenerID)
		}
	}, [updateSelectedEntity])

	const contextValue = useMemo(() => ({ selectedEntityIndex }), [selectedEntityIndex])

	return (
		<SelectedEntityIndexContext.Provider value={contextValue}>
			{selectedEntityIndex !== -1 && (
				<>
					{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
					{children}
				</>
			)}
		</SelectedEntityIndexContext.Provider>
	)
}
