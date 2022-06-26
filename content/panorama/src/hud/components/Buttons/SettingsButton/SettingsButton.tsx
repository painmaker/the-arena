import React, { useCallback, useState } from 'react'
import Styles from './styles.module.css'
import { WINDOW } from '../../../data/windows'
import useGameEvent from '../../../hooks/useGameEvent'

type ButtonProps = {
	id: string
	imgSrc: string
	propsWindow: WINDOW
}

const SettingsButton = (props: ButtonProps) => {
	const { id, imgSrc, propsWindow } = props

	const [eventWindow, setEventWindow] = useState(WINDOW.NONE)

	useGameEvent(
		'set_window',
		event => {
			setEventWindow(event.window)
		},
		[],
	)

	const onClick = useCallback(
		(id: string, window: WINDOW) => {
			$(`#${id}`).RemoveClass('btnClicked')
			$(`#${id}`).AddClass('btnClicked')
			GameEvents.SendEventClientSide('set_window', { window: eventWindow === window ? WINDOW.NONE : window })
			Game.EmitSound('ui_topmenu_select')
		},
		[eventWindow],
	)

	return (
		<Button id={id} className={Styles.btn} onactivate={() => onClick(id, propsWindow)}>
			<Image style={{ washColor: propsWindow === eventWindow ? 'orange' : 'white' }} src={imgSrc} />
		</Button>
	)
}

export default SettingsButton
