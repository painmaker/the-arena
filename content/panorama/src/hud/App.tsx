import React from 'react'
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
import SelectedEntityProvider from './components/SelectedEntityProvider/SelectedEntityProvider'
import CustomUIProvider from './components/CustomUIProvider/CustomUIProvider'

export const HUD_THINK_FAST = 1 / 144
export const HUD_THINK_MEDIUM = 1 / 144 // 0.1
export const HUD_THINK_SLOW = 1 / 144 // 1.0

function App() {
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

	return (
		<Loading>
			<CustomUIProvider>
				<Minimap />
				<FloatingContainers />
				<Settings />
				<Heroes />
				<Messages />
				<SelectedEntityProvider>
					<AbilitiesShop />
					<CharacterDetails />
					<ItemsShop />
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
				</SelectedEntityProvider>
			</CustomUIProvider>
		</Loading>
	)
}

export default App
