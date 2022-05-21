import React, { useContext, useState } from 'react'
import ItemOptions from './ItemOptions/ItemOptions'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../App'
import { useInterval } from '../../hooks/useInterval'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'
import lodash from 'lodash';

const FIRST_ROW_SLOTS = [0, 1, 2]
const SECOND_ROW_SLOTS = [3, 4, 5]
interface IRowItem {
  slot: number,
  item: ItemEntityIndex
}


const Inventory = () => {

  // $.Msg('REACT-RENDER: Inventory rendered')

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [firstRowItems, setFirstRowItems] = useState<IRowItem[]>([])
  const [secondRowItems, setSecondRowItems] = useState<IRowItem[]>([])
  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedEntityIndex))

  useInterval(() => {
    setHasInventory(Entities.IsInventoryEnabled(selectedEntityIndex))
    const newFirstRow = Array.from(FIRST_ROW_SLOTS).map(slot => ({ slot: slot, item: Entities.GetItemInSlot(selectedEntityIndex, slot) }));
    const newSecondRow = Array.from(SECOND_ROW_SLOTS).map(slot => ({ slot: slot, item: Entities.GetItemInSlot(selectedEntityIndex, slot) }));
    if (!lodash.isEqual(firstRowItems, newFirstRow)) {
      setFirstRowItems(newFirstRow)
    }
    if (!lodash.isEqual(secondRowItems, newSecondRow)) {
      setSecondRowItems(newSecondRow)
    }
  }, HUD_THINK_FAST)

  return (
    <React.Fragment>
      <ItemOptions />
      <Panel
        hittest={false}
        className={Styles.container}
        style={{ visibility: hasInventory ? 'visible' : 'collapse' }}
      >
        <Panel className={Styles.firstRow}>
          {firstRowItems.map(rowItem => {
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
        <Panel className={Styles.secondRow}>
          {secondRowItems.map(rowItem => {
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
    </React.Fragment>
  )
}

export default React.memo(Inventory)
