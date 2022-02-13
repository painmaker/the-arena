import React, { useState } from 'react'
import ItemOptions from './ItemOptions/ItemOptions'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../App'
import { useInterval } from '../../hooks/useInterval'
import { TableUtils } from '../../utils/TableUtils'
import { ObjectUtils } from '../../utils/ObjectUtils'

const FIRST_ROW_SLOTS = [0, 1, 2]
const SECOND_ROW_SLOTS = [3, 4, 5]
interface IRowItem {
  slot: number,
  item: ItemEntityIndex
}

type Props = {
  selectedUnit: EntityIndex,
}

const Inventory = (props: Props) => {

  // $.Msg('REACT-RENDER: Inventory rendered')

  const { selectedUnit } = props;

  const [firstRowItems, setFirstRowItems] = useState<IRowItem[]>([])
  const [secondRowItems, setSecondRowItems] = useState<IRowItem[]>([])
  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedUnit))

  useInterval(() => {
    setHasInventory(Entities.IsInventoryEnabled(selectedUnit))
    const newFirstRow = Array.from(FIRST_ROW_SLOTS).map(slot => ({ slot: slot, item: Entities.GetItemInSlot(selectedUnit, slot) }));
    const newSecondRow = Array.from(SECOND_ROW_SLOTS).map(slot => ({ slot: slot, item: Entities.GetItemInSlot(selectedUnit, slot) }));
    if (!TableUtils.areTablesEqual(firstRowItems, newFirstRow, ObjectUtils.areObjectsEqual)) {
      setFirstRowItems(newFirstRow)
    }
    if (!TableUtils.areTablesEqual(secondRowItems, newSecondRow, ObjectUtils.areObjectsEqual)) {
      setSecondRowItems(newSecondRow)
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
        <Panel className={Styles.firstRow}>
          {firstRowItems.map(rowItem => {
            const { slot, item } = rowItem;
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
        <Panel className={Styles.secondRow}>
          {secondRowItems.map(rowItem => {
            const { slot, item } = rowItem;
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
      </Panel>
    </React.Fragment>
  )
}

export default React.memo(Inventory)
