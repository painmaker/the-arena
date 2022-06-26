import React, { Dispatch, SetStateAction } from 'react'
import Item from './Item/Item'
import Styles from './styles.module.css'

type Props = {
	title: string
	items: ItemsShopItem[]
	selectedUnit: EntityIndex
	searchValue: string
	setActiveItem: Dispatch<SetStateAction<ItemsShopItem | undefined>>
	height: string
}

function Items(props: Props) {
	// $.Msg("REACT-RENDER: ItemsShop - Items rendered");

	const { title, items, selectedUnit, searchValue, height, setActiveItem } = props

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.title} text={title} />
			<Panel className={Styles.itemsContainer} style={{ height }}>
				{items.map(item => (
					<Item key={item.itemname} item={item} selectedUnit={selectedUnit} searchValue={searchValue} setActiveItem={setActiveItem} />
				))}
			</Panel>
		</Panel>
	)
}

export default React.memo(Items)
