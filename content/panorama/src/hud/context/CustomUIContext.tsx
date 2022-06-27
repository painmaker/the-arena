import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import ToggleCustomUI from '../components/ToggleCustomUI/ToggleCustomUI'

interface ICustomUIContext {
	useCustomUI: boolean
	setUseCustomUI: Dispatch<SetStateAction<boolean>>
}

const initialState = {
	useCustomUI: true,
	setUseCustomUI: () => ({}),
}

const CustomUIContext = React.createContext<ICustomUIContext>(initialState)

type Props = {
	children: JSX.Element | JSX.Element[]
}

const CustomUIProvider = (props: Props) => {
	// $.Msg("REACT-RENDER: CustomUIProvider rendered");

	const { children } = props

	const [useCustomUI, setUseCustomUI] = useState(true)

	useEffect(() => {
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, !useCustomUI)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT, !useCustomUI)
	}, [useCustomUI])

	const contextValues = useMemo(
		() => ({
			useCustomUI,
			setUseCustomUI,
		}),
		[useCustomUI, setUseCustomUI],
	)

	return (
		<CustomUIContext.Provider value={contextValues}>
			<>
				<ToggleCustomUI />
				{useCustomUI && (
					<>
						{/* eslint-disable-next-line react/jsx-no-useless-fragment */}
						{children}
					</>
				)}
			</>
		</CustomUIContext.Provider>
	)
}

export default CustomUIProvider
