import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

interface IAbilityEntityIndexContext {
	abilityEntityIndex: AbilityEntityIndex
	setAbilityEntityIndex: Dispatch<SetStateAction<AbilityEntityIndex>>
}

const initialState = {
	abilityEntityIndex: -1 as AbilityEntityIndex,
	setAbilityEntityIndex: () => ({}),
}

export const AbilityEntityIndexContext = React.createContext<IAbilityEntityIndexContext>(initialState)

type Props = {
	abilityEntityIndex: AbilityEntityIndex
	children: JSX.Element | JSX.Element[]
}

export const AbilityEntityIndexContextProvider = (props: Props) => {
	$.Msg('REACT-RENDER: AbilityEntityIndexContextProvider rendered')

	const { abilityEntityIndex: index, children } = props

	const [abilityEntityIndex, setAbilityEntityIndex] = useState(index)

	const contextValue = useMemo(() => ({ abilityEntityIndex, setAbilityEntityIndex }), [abilityEntityIndex, setAbilityEntityIndex])

	return (
		<AbilityEntityIndexContext.Provider value={contextValue}>
			<>
				{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
				{children}
			</>
		</AbilityEntityIndexContext.Provider>
	)
}
