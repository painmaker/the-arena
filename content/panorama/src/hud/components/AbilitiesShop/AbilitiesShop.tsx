import React, { useContext, useEffect, useState } from 'react'
import Title from './Title/Title'
import Search from './Search/Search'
import RegularAbilities from './RegularAbilities/RegularAbilities'
import UltimateAbilities from './UltimateAbilities/UltimateAbilities'
import AbilitiesPoints from './AbilitiesPoints/AbilitiesPoints'
import { HUD_THINK_SLOW } from '../../App'
import { useTimeout } from '../../hooks/useTimeout'
import { WINDOW } from '../../data/windows'
import Styles from './styles.module.css'
import useGameEvent from '../../hooks/useGameEvent'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'

const AbilitiesShop = () => {
	// $.Msg("REACT-RENDER: AbilitiesShop rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [searchValue, setSearchValue] = useState('')
	const [regularAbilities, setRegularAbilities] = useState<ShopAbility[]>([])
	const [ultimateAbilities, setUltimateAbilities] = useState<ShopAbility[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [renderComponent, setRenderComponent] = useState(false)

	useTimeout(
		() => {
			setRenderComponent(isOpen)
		},
		!isOpen ? HUD_THINK_SLOW : 0,
	)

	useEffect(() => {
		if (isOpen) {
			setRegularAbilities([])
			setUltimateAbilities([])
			GameEvents.SendCustomGameEventToServer('fetch_shop_abilities', { entindex: selectedEntityIndex })
		}
	}, [selectedEntityIndex, isOpen])

	useEffect(() => {
		setSearchValue('')
	}, [selectedEntityIndex])

	useGameEvent(
		'set_window',
		event => {
			setIsOpen(event.window === WINDOW.ABILITIES_SHOP)
		},
		[],
	)

	useGameEvent(
		'fetch_shop_abilities_ok',
		event => {
			setRegularAbilities(Object.values(event.regularAbilities))
			setUltimateAbilities(Object.values(event.ultimateAbilities))
		},
		[],
	)

	useGameEvent(
		'fetch_shop_abilities_error',
		event => {
			GameUI.SendCustomHUDError(event.errorMsg, 'General.Item_CantPickUp')
		},
		[],
	)

	useGameEvent(
		'purchase_ability_error',
		event => {
			GameUI.SendCustomHUDError(event.errorMsg, 'General.Item_CantPickUp')
		},
		[],
	)

	useGameEvent(
		'purchase_ability_ok',
		event => {
			Game.EmitSound('General.Buy')
		},
		[],
	)

	useGameEvent(
		'dota_player_update_query_unit',
		event => {
			const unit = Players.GetQueryUnit(Players.GetLocalPlayer())
			if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
				GameEvents.SendEventClientSide('set_window', { window: WINDOW.ABILITIES_SHOP })
			}
		},
		[],
	)

	useGameEvent(
		'dota_player_update_selected_unit',
		event => {
			const unit = Players.GetLocalPlayerPortraitUnit()
			if (Entities.GetUnitName(unit) === 'shopkeeper_abilities') {
				GameEvents.SendEventClientSide('set_window', { window: WINDOW.ABILITIES_SHOP })
			}
		},
		[],
	)

	return (
		<>
			{renderComponent && (
				<Panel
					onactivate={() => false}
					className={Styles.container}
					style={{
						transform: isOpen ? 'translateX(-10px)' : 'translateX(490px)',
						opacity: isOpen ? '1.0' : '0.0',
					}}
				>
					<Title selectedUnit={selectedEntityIndex} />
					<Panel className={Styles.topBarContainer}>
						<Search searchValue={searchValue} setSearchValue={setSearchValue} />
						<AbilitiesPoints selectedUnit={selectedEntityIndex} text='Ability Points:' />
					</Panel>
					<Panel className={Styles.abilitiesContainer}>
						<RegularAbilities selectedUnit={selectedEntityIndex} regularAbilities={regularAbilities} searchValue={searchValue} />
						<UltimateAbilities selectedUnit={selectedEntityIndex} ultimateAbilities={ultimateAbilities} searchValue={searchValue} />
					</Panel>
				</Panel>
			)}
		</>
	)
}

export default React.memo(AbilitiesShop)
