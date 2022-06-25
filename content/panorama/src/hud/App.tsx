import React, { useEffect, useState } from 'react'
import './global.css'
import Styles from './styles.module.css'
import { UseCustomUIContext } from './context/UseCustomUIContext'
import ToggleCustomUI from './components/ToggleCustomUI/ToggleCustomUI'
import { useInterval } from './hooks/useInterval'
import FloatingContainers from './components/FloatingContainers/FloatingContainers'
import Minimap from './components/Minimap/Minimap'
import Settings from './components/Settings/Settings'
import SelectedEntityIndexContext from './context/SelectedEntityIndexContext'
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

export const HUD_THINK_FAST = 1 / 144
export const HUD_THINK_MEDIUM = 0.1
export const HUD_THINK_SLOW = 1.0

const excludedUnits = ['shopkeeper_abilities']

const getGameUnitSelected = () => {
	const queryUnit = Players.GetQueryUnit(Players.GetLocalPlayer())
	if (queryUnit !== -1) {
		return queryUnit
	}
	const portraitUnit = Players.GetLocalPlayerPortraitUnit()
	if (portraitUnit !== -1) {
		return portraitUnit
	}
	return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())
}

const App = () => {

    $.Msg("REACT-RENDER: App rendered");
	
  // const heroes = useNetTableValues('HeroSelectionHeroes').heroes
	// const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1

	const [useCustomUI, setUseCustomUI] = useState(true)
	const [selectedEntityIndex, setSelectedEntityIndex] = useState(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()))

	useInterval(() => {
		const unitToSelect = getGameUnitSelected()
		if (!excludedUnits.includes(Entities.GetUnitName(unitToSelect))) {
			setSelectedEntityIndex(unitToSelect)
		}
	}, HUD_THINK_FAST)

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

	useRegisterForUnhandledEvent('Cancelled', () => {
    GameEvents.SendEventClientSide('set_window', { window: WINDOW.NONE })
    Game.EmitSound('ui_topmenu_select')
  }, [])

	return (
    <Panel className={Styles.container} hittest={false}>
      <UseCustomUIContext.Provider value={{ useCustomUI, setUseCustomUI }}>
        <ToggleCustomUI />
        {useCustomUI && (
          <React.Fragment>
            <Minimap />
            <FloatingContainers />
            <Settings />
            <Heroes /> 
            <Messages />
            <SelectedEntityIndexContext.Provider value={{ selectedEntityIndex }}>
              <AbilitiesShop selectedUnit={selectedEntityIndex} />
              <CharacterDetails selectedUnit={selectedEntityIndex} />
              <ItemsShop selectedUnit={selectedEntityIndex} />
              <Panel className={Styles.rightCornerContainer}>
                <SelectedEntity />
                <Buttons />
              </Panel>
              <AbilityBar />
              <Modifiers />
              <Inventory />
              <Mana />
              <Health />
              <Panel className={Styles.bottomCenterBackground} />
              <Panel className={Styles.bottomCenterLeftFlare} />
              <Panel className={Styles.bottomCenterRightFlare} />
            </SelectedEntityIndexContext.Provider>
          </React.Fragment>
        )}
     </UseCustomUIContext.Provider>
    </Panel>
	)

}

export default App
