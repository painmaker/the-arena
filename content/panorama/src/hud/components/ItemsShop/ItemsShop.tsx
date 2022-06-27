import React, { useContext, useEffect, useState } from 'react'
import Title from './Title/Title'
import Gold from './Gold/Gold'
import Search from './Search/Search'
import { HUD_THINK_SLOW } from '../../App'
import useTimeout from '../../hooks/useTimeout'
import Styles from './styles.module.css'
import { WINDOW } from '../../data/windows'
import Items from './Items/Items'
import useGameEvent from '../../hooks/useGameEvent'
import { SelectedEntityIndexContext } from '../../context/SelectedEntityIndexContext'

const ItemsShop = () => {
	// $.Msg("REACT-RENDER: ItemsShop rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [searchValue, setSearchValue] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [renderComponent, setRenderComponent] = useState(false)

	const [activeItem, setActiveItem] = useState<ItemsShopItem | undefined>(undefined)
	const [consumables, setConsumables] = useState<ItemsShopItem[]>([])
	const [basics, setBasics] = useState<ItemsShopItem[]>([])

	useTimeout(
		() => {
			setRenderComponent(isOpen)
		},
		!isOpen ? HUD_THINK_SLOW : 0,
	)

	useGameEvent(
		'set_window',
		event => {
			setIsOpen(event.window === WINDOW.ITEMS_SHOP)
		},
		[],
	)

	useEffect(() => {
		if (isOpen) {
			GameEvents.SendCustomGameEventToServer('fetch_items_shop_item', {})
		}
	}, [isOpen])

	useGameEvent(
		'fetch_items_shop_item_success',
		event => {
			setConsumables(Object.values(event.consumables) as ItemsShopItem[])
			setBasics(Object.values(event.basics) as ItemsShopItem[])
		},
		[],
	)

	return (
		<>
			{renderComponent && (
				<Panel onactivate={() => false} className={Styles.container} style={isOpen ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}>
					<Title selectedUnit={selectedEntityIndex} />
					<Panel className={Styles.topBarContainer}>
						<Search setSearchValue={setSearchValue} />
						<Gold selectedUnit={selectedEntityIndex} />
					</Panel>
					<Panel className={Styles.itemsContainer}>
						<Panel className={Styles.itemsColumn}>
							<Items
								title='Consumables'
								items={consumables}
								selectedUnit={selectedEntityIndex}
								searchValue={searchValue}
								setActiveItem={setActiveItem}
								height='165px'
							/>
							<Items
								title='Basics'
								items={basics}
								selectedUnit={selectedEntityIndex}
								searchValue={searchValue}
								setActiveItem={setActiveItem}
								height='165px'
							/>
						</Panel>
						<Panel className={Styles.itemsColumn}>
							<Items
								title='Upgrades'
								items={[]}
								selectedUnit={selectedEntityIndex}
								searchValue={searchValue}
								setActiveItem={setActiveItem}
								height='362px'
							/>
						</Panel>
					</Panel>
					{/* <UpgradeTree activeItem={activeItem} /> */}
				</Panel>
			)}
		</>
	)
}

export default React.memo(ItemsShop)
