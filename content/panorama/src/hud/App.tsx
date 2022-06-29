import React, { useEffect } from 'react'
import './global.css'
import Styles from './styles.module.css'
import FloatingContainers from './components/FloatingContainers/FloatingContainers'
import Minimap from './components/Minimap/Minimap'
import Settings from './components/Settings/Settings'
import Buttons from './components/Buttons/Buttons'
import SelectedEntity from './components/SelectedEntity/SelectedEntity'
import AbilityBar from './components/AbilityBar/AbilityBar'
import Modifiers from './components/Modifiers/Modifiers'
import Inventory from './components/Inventory/Inventory'
import Mana from './components/Mana/Mana'
import Health from './components/Health/Health'
import Heroes from './components/Heroes/Heroes'
import Messages from './components/Messages/Messages'
import AbilitiesShop from './components/AbilitiesShop/AbilitiesShop'
import CharacterDetails from './components/CharacterDetails/CharacterDetails'
import ItemsShop from './components/ItemsShop/ItemsShop'
import { WINDOW } from './data/windows'
import useRegisterForUnhandledEvent from './hooks/useRegisterForUnhandledEvent'
import Loading from './components/Loading/Loading'
import TestContainer from './components/Test/Test'
import { SelectedEntityProvider } from './context/SelectedEntityIndexContext'
import { RenderContextProvider } from './context/RenderContext'

export const HUD_THINK_FAST = 1 / 144
export const HUD_THINK_MEDIUM = 1 / 144 // 0.1
export const HUD_THINK_SLOW = 1 / 144 // 1.0

const App = () => {
	$.Msg('REACT-RENDER: App rendered')

	// const heroes = useNetTableValues('HeroSelectionHeroes').heroes
	// const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1

	useRegisterForUnhandledEvent(
		'Cancelled',
		() => {
			GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE })
			Game.EmitSound('ui_topmenu_select')
		},
		[],
	)

	useEffect(() => {
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, false)
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ELEMENT_COUNT, false)
	}, [])

	return (
		<>
			<Minimap />
			<FloatingContainers />
			{/* <Heroes /> */}
			{/* <Messages /> */}
			{/* <Settings /> */}
			<RenderContextProvider>
				<SelectedEntityProvider>
					<Panel style={{ flowChildren: 'right', backgroundColor: 'none' }}>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
						<Panel style={{ flowChildren: 'down' }}>
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
							<TestContainer />
						</Panel>
					</Panel>
					<AbilityBar />
				</SelectedEntityProvider>
				{/* <AbilitiesShop /> */}
				{/* <CharacterDetails /> */}
				{/* <ItemsShop /> */}
				{/* <Panel className={Styles.rightCornerContainer}> */}
				{/* <SelectedEntity /> */}
				{/* <Buttons /> */}
				{/* </Panel> */}
				{/* <Health /> */}
				{/* <Mana /> */}
				{/* <Inventory /> */}
				{/* <Modifiers /> */}
				{/* <Panel className={Styles.bottomCenterBackground} /> */}
				{/* <Panel className={Styles.bottomCenterLeftFlare} /> */}
				{/* <Panel className={Styles.bottomCenterRightFlare} /> */}
			</RenderContextProvider>
		</>
	)
}

export default App
