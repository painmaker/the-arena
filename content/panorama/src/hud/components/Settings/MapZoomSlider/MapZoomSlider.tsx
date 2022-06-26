import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Styles from './styles.module.css'

type Props = {
	mapZoom: number
	setMapZoom: Dispatch<SetStateAction<number>>
}

function MapZoomSlider(props: Props) {
	// $.Msg("REACT-RENDER: Settings - MapZoomSlider rendered");

	const { mapZoom, setMapZoom } = props

	useEffect(() => {
		// Hack to initalize the slider caret correctly
		const panel = $('#map_zoom_slider') as any
		panel.value = props.mapZoom
	}, [])

	return (
		<>
			<Label className={Styles.textLabel} text='Minimap Zoom:' />
			<Panel className={Styles.sliderContainer}>
				<Slider
					id='map_zoom_slider'
					className='HorizontalSlider'
					direction='horizontal'
					value={mapZoom}
					min={3}
					max={10}
					onvaluechanged={e => setMapZoom(Math.round(e.value))}
				/>
			</Panel>
			<Label className={Styles.numberLabel} text={mapZoom} />
		</>
	)
}

export default React.memo(MapZoomSlider)
