import React, { useState, useEffect } from 'react'
import { formatTime } from '../../../../utils'
import Styles from './styles.module.css'
import { HUD_THINK_SLOW } from '../../../App'
import useInterval from '../../../hooks/useInterval'

const formatGameTime = (dotaTime: number) => {
	const hours = formatTime(Math.floor(dotaTime / 3600))
	const minutes = formatTime(Math.floor((dotaTime % 3600) / 60))
	const seconds = formatTime(Math.floor((dotaTime % 3600) % 60))
	if (hours === '00') {
		return `${minutes}:${seconds}`
	}
	return `${hours}:${minutes}:${seconds}`
}

const getFormattedGameTime = () => formatGameTime(Math.floor(Game.GetDOTATime(false, false)))

const GameTime = () => {
	// $.Msg('REACT-RENDER: GameTime rendered')

	const [gameTime, setGameTime] = useState(() => getFormattedGameTime())

	useInterval(() => {
		setGameTime(getFormattedGameTime())
	}, HUD_THINK_SLOW)

	useEffect(() => {
		$.Msg(`gameTime: ${gameTime}`)
	}, [gameTime])

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={gameTime} />
		</Panel>
	)
}

export default React.memo(GameTime)
