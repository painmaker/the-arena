import React from 'react'
import { WINDOW } from '../../../data/windows'
import Styles from './styles.module.css'

const Title = () => {
	// $.Msg("REACT-RENDER: Settings - Title rendered");

	return (
		<Panel className={Styles.container}>
			<Label
				className={Styles.label}
				text={`SETTINGS - ${$.Localize(`#${Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))}`).toUpperCase()}`}
			/>
			<Button
				className={Styles.closeBtn}
				onactivate={() => {
					GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE })
					Game.EmitSound('ui_topmenu_select')
				}}
			>
				<Image src='s2r://panorama/images/close_btn_white_png.vtex' />
			</Button>
		</Panel>
	)
}

export default React.memo(Title)
