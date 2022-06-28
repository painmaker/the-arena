import React, { useState } from 'react'
import useGameEvent from '../../hooks/useGameEvent'
import GameTime from './GameTime/GameTime'
import Styles from './styles.module.css'

const Minimap = () => {
	// $.Msg("REACT-RENDER: Minimap rendered");

	const [mapZoom, setMapZoom] = useState(5)
	const [zoneName, setZoneName] = useState('#ZoneName')

	useGameEvent(
		'set_zone_name',
		event => {
			setZoneName(event.zoneName)
		},
		[setZoneName],
	)

	useGameEvent(
		'set_map_zoom',
		event => {
			setMapZoom(event.mapZoom)
		},
		[setMapZoom],
	)

	return (
		<Panel className={Styles.container} hittest={false}>
			<Panel className={Styles.topFlare} />
			<Panel className={Styles.flowRight}>
				<Panel className={Styles.minimapContainer}>
					<Label className={Styles.zoneName} text={zoneName} />
					<GameTime />
					<DOTAHUDOverlayMap
						id='minimap'
						className={Styles.minimap}
						mapscale={mapZoom}
						maptexture='materials/overviews/the_arena_tga_5f0a2a04.vtex'
					/>
				</Panel>
				<Panel className={Styles.rightFlare} />
			</Panel>
		</Panel>
	)
}

export default Minimap
