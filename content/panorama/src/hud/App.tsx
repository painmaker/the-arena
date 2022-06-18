import React, { useEffect, useState } from 'react'
import './global.css'
import Styles from './app.module.css'
import { UseCustomUIContext } from './context/UseCustomUIContext'
import ToggleCustomUI from './components/ToggleCustomUI/ToggleCustomUI'

export const HUD_THINK_FAST = 0.03
export const HUD_THINK_MEDIUM = 0.1
export const HUD_THINK_SLOW = 1.0

// const excludedUnits = ['shopkeeper_abilities']

// const getGameUnitSelected = () => {
// 	const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer())
// 	if (queryUnit !== -1) {
// 		return queryUnit
// 	}
// 	const portraitUnit = Players.GetLocalPlayerPortraitUnit()
// 	if (portraitUnit !== -1) {
// 		return portraitUnit
// 	}
// 	return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
// }

const App = () => {
	
  // const heroes = useNetTableValues('HeroSelectionHeroes').heroes
	// const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1

	const [useCustomUI, setUseCustomUI] = useState(true)
	// const [selectedEntityIndex, setSelectedEntityIndex] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))

	// useInterval(() => {
	// 	const unitToSelect = getGameUnitSelected()
	// 	if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
	// 		setSelectedEntityIndex(unitToSelect)
	// 	}
	// }, HUD_THINK_FAST)

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

	// useRegisterForUnhandledEvent(
	// 	'Cancelled',
	// 	() => {
	// 		GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE })
	// 		Game.EmitSound('ui_topmenu_select')
	// 	},
	// 	[],
	// )

	return (
		<React.Fragment>
			<UseCustomUIContext.Provider value={{ useCustomUI, setUseCustomUI }}>
				<Panel id={'root'} className={Styles.container} hittest={false}>
          <ToggleCustomUI />
					{useCustomUI && (
						<React.Fragment>
              <Label text={'Test'} />
              {/*
							<Heroes />
							<Minimap />
							<FloatingContainers />
							<Messages />
							<Settings />
							<SelectedEntityIndexContext.Provider value={{ selectedEntityIndex }}>
								<AbilitiesShop selectedUnit={selectedEntityIndex} />
								<CharacterDetails selectedUnit={selectedEntityIndex} />
								<ItemsShop selectedUnit={selectedEntityIndex} />
								<AbilityBar />
								<Modifiers />
								<Mana />
								<Health />
								<Inventory />
								<ItemOptions />
								<Panel className={Styles.rightCornerContainer}>
									<Character />
									<Buttons />
								</Panel>
								<Panel className={Styles.bottomCenterBackground} />
								<Panel className={Styles.bottomCenterLeftFlare} />
								<Panel className={Styles.bottomCenterRightFlare} />
							</SelectedEntityIndexContext.Provider>
              */}
						</React.Fragment>
					)}
				</Panel>
			</UseCustomUIContext.Provider>
		</React.Fragment>
	)
}

export default App
