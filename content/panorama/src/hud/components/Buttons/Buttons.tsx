import React from 'react'
import Styles from './styles.module.css'
import { WINDOW } from '../../data/windows'
import SettingsButton from './SettingsButton/SettingsButton'

const Buttons = () => {
	// $.Msg("REACT-RENDER: ButtonGroup rendered");

	return (
		<Panel hittest={false} className={Styles.container}>
			<SettingsButton id='settings_btn' imgSrc='s2r://panorama/images/settings_btn_white_png.vtex' propsWindow={WINDOW.SETTINGS} />
			<SettingsButton id='item_shopping_btn' imgSrc='s2r://panorama/images/shop_btn_white_png.vtex' propsWindow={WINDOW.ITEMS_SHOP} />
			<SettingsButton id='character_btn' imgSrc='s2r://panorama/images/character_btn_white_png.vtex' propsWindow={WINDOW.CHARACTER_DETAILS} />
			<SettingsButton
				id='abilities_shop_btn'
				imgSrc='s2r://panorama/images/book_open_page_variant_outline_png.vtex'
				propsWindow={WINDOW.ABILITIES_SHOP}
			/>
		</Panel>
	)
}

export default React.memo(Buttons)
