import React, { useContext, useState } from 'react'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../App'
import { useInterval } from '../../hooks/useInterval'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'
import { isEqual } from '../../utils/isEqual'

const SLOTS = [0, 1, 2, 3, 4, 5]
interface IRowItem {
  slot: number,
  item: ItemEntityIndex
}

const Inventory = () => {

  // $.Msg('REACT-RENDER: Inventory rendered')

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [items, setItems] = useState<IRowItem[]>([])
  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedEntityIndex))

  useInterval(() => {
    setHasInventory(Entities.IsInventoryEnabled(selectedEntityIndex))
    const newItems = Array.from(SLOTS).map(slot => ({ slot: slot, item: Entities.GetItemInSlot(selectedEntityIndex, slot) }));
    if (!isEqual(items, newItems)) {
      setItems(newItems)
    }
  }, HUD_THINK_FAST);

  if (!hasInventory) {
    return null;
  }

  return (
    <Panel hittest={false} className={Styles.container}  >
      <Panel className={Styles.items}>
        {items.map(rowItem => {
          const { slot, item } = rowItem;
          return (
            <Item
              key={slot + "_" + item}
              slot={slot}
              item={item}
            />
          )
        })}
      </Panel>
    </Panel>
  )
}

export default React.memo(Inventory)
