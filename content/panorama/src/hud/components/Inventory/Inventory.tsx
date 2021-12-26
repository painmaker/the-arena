import React, { useState } from 'react'
import ItemOptions from './ItemOptions/ItemOptions'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../App'
import { useInterval } from '../../hooks/useInterval'
import { TableUtils } from '../../utils/TableUtils'

type Props = {
	selectedUnit: EntityIndex
}

const ITEM_SLOTS = [0, 1, 2, 3, 4, 5]

const Inventory = (props: Props) => {

	$.Msg('REACT-RENDER: Inventory rendered')

	const { selectedUnit } = props

	const [items, setItems] = useState<ItemEntityIndex[]>([])
	const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedUnit))

	useInterval(() => {
	  setHasInventory(Entities.IsInventoryEnabled(selectedUnit))
	  const newItems = Array.from(ITEM_SLOTS).map(slot => Entities.GetItemInSlot(selectedUnit, slot));
	  if (!TableUtils.areTablesEqual(items, newItems)) {
			setItems(newItems)
	  }
	}, HUD_THINK_FAST)

	return (
		<React.Fragment>
			<ItemOptions selectedUnit={selectedUnit} />
			<Panel
				hittest={false}
				className={Styles.container}
				style={{ visibility: hasInventory ? 'visible' : 'collapse' }}
			>
				{items.map((item, slot) => {
					return (
						<Item
              key={slot + "_" + item}
							slot={slot}
							item={item}
							selectedUnit={selectedUnit}
						/>
					)
				})}
			</Panel>
		</React.Fragment>
	)
}

export default React.memo(Inventory)
