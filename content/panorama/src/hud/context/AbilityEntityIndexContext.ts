import React from 'react'

interface IAbilityEntityIndexContext {
	abilityEntityIndex: AbilityEntityIndex
	setAbilityEntityIndex?: () => void
}

const initialState = {
	abilityEntityIndex: -1 as AbilityEntityIndex,
}

const AbilityEntityIndexContext = React.createContext<IAbilityEntityIndexContext>(initialState)

export default AbilityEntityIndexContext
