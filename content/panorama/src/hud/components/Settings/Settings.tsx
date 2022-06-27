import React, { useEffect, useState } from 'react'
import CameraZoomSlider from './CameraZoomSlider/CameraZoomSlider'
import LockCameraBtn from './LockCameraBtn/LockCameraBtn'
import MapZoomSlider from './MapZoomSlider/MapZoomSlider'
import Divider from './Divider/Divider'
import Title from './Title/Title'
import useTimeout from '../../hooks/useTimeout'
import Styles from './styles.module.css'
import { WINDOW } from '../../data/windows'
import { HUD_THINK_SLOW } from '../../App'
import useGameEvent from '../../hooks/useGameEvent'

const Settings = () => {
	// $.Msg("REACT-RENDER: Settings rendered");

	const [mapZoom, setMapZoom] = useState(5)
	const [cameraZoom, setCameraZoom] = useState(1600)
	const [isLocked, setIsLocked] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const [renderComponent, setRenderComponent] = useState(false)

	useTimeout(
		() => {
			setRenderComponent(isOpen)
		},
		!isOpen ? HUD_THINK_SLOW : 0,
	)

	useGameEvent(
		'set_window',
		event => {
			setIsOpen(event.window === WINDOW.SETTINGS)
		},
		[],
	)

	useEffect(() => {
		GameEvents.SendEventClientSide('set_map_zoom', { mapZoom })
	}, [mapZoom])

	useEffect(() => {
		GameUI.SetCameraDistance(cameraZoom)
	}, [cameraZoom])

	useEffect(() => {
		GameEvents.SendEventClientSide('set_is_camera_locked', { isLocked })
		if (isLocked) {
			GameUI.SetCameraTarget(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))
		} else {
			GameUI.SetCameraTarget(-1 as EntityIndex)
		}
	}, [isLocked])

	if (!renderComponent) {
		return null
	}

	const style = {
		transform: isOpen ? 'translateX(-10px)' : 'translateX(490px)',
		opacity: isOpen ? '1.0' : '0.0',
	}

	return (
		<Panel onactivate={() => false} className={Styles.container} style={style}>
			<Title />
			<Divider />
			<Panel className={Styles.entry}>
				<CameraZoomSlider cameraZoom={cameraZoom} setCameraZoom={setCameraZoom} />
			</Panel>
			<Divider />
			<Panel className={Styles.entry}>
				<MapZoomSlider mapZoom={mapZoom} setMapZoom={setMapZoom} />
			</Panel>
			<Divider />
			<Panel className={Styles.entry}>
				<LockCameraBtn isLocked={isLocked} setIsLocked={setIsLocked} />
			</Panel>
			<Divider />
		</Panel>
	)
}

export default Settings
