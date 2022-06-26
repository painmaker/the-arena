import React, { Dispatch, SetStateAction } from 'react'

interface IUseCustomUIContext {
	useCustomUI: boolean
	setUseCustomUI: Dispatch<SetStateAction<boolean>>
}

const initialState = {
	useCustomUI: true,
	setUseCustomUI: () => ({}),
}

export const UseCustomUIContext = React.createContext<IUseCustomUIContext>(initialState)
