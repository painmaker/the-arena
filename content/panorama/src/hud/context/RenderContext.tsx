import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import ToggleCustomUI from '../components/ToggleCustomUI/ToggleCustomUI'

interface IRenderContext {
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
}

const initialState = {
	visible: true,
	setVisible: () => ({}),
}

export const RenderContext = React.createContext<IRenderContext>(initialState)

type Props = {
	children: JSX.Element | JSX.Element[]
}

export const RenderContextProvider = (props: Props) => {
	// $.Msg("REACT-RENDER: CustomUIProvider rendered");

	const { children } = props

	const [visible, setVisible] = useState(true)

	useEffect(() => {}, [visible])
	const contextValues = useMemo(
		() => ({
			visible,
			setVisible,
		}),
		[visible, setVisible],
	)

	return (
		<RenderContext.Provider value={contextValues}>
			<>
				<ToggleCustomUI />
				{visible && (
					<>
						{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
						{children}
					</>
				)}
			</>
		</RenderContext.Provider>
	)
}
