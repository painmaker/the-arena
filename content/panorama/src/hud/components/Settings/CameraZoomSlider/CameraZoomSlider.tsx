import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Styles from './styles.module.css'

type Props = {
	cameraZoom: number
	setCameraZoom: Dispatch<SetStateAction<number>>
}

/**
 * Requires "Far Z Clip plane" in the "env_fog_controller" entity to be increased to 5000 or more.
 */
const CameraZoomSlider = (props: Props) => {
	// $.Msg("REACT-RENDER: Settings - CameraZoomSlider rendered");

	const { cameraZoom, setCameraZoom } = props

	useEffect(() => {
		// Hack to initalize the slider caret correctly
		const panel = $('#camera_zoom_slider') as any
		panel.value = cameraZoom || 1600
	}, [])

	return (
		<>
			<Label className={Styles.textLabel} text='Camera Zoom:' />
			<Panel className={Styles.sliderContainer}>
				<Slider
					id='camera_zoom_slider'
					className='HorizontalSlider'
					direction='horizontal'
					value={cameraZoom}
					min={800}
					max={2000}
					onvaluechanged={event => setCameraZoom(Math.round(event.value))}
				/>
			</Panel>
			<Label className={Styles.numberLabel} text={cameraZoom} />
		</>
	)
}

export default React.memo(CameraZoomSlider)
