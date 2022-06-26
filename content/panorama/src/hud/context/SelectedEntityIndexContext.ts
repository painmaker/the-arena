import React from 'react'

interface ISelectedEntityIndexContext {
	selectedEntityIndex: EntityIndex
	setSelectedEntityIndex?: () => void
}

const initialState = {
	selectedEntityIndex: Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()),
}

const SelectedEntityIndexContext = React.createContext<ISelectedEntityIndexContext>(initialState)

export default SelectedEntityIndexContext
