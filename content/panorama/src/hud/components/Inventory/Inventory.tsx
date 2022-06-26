import React, { useContext, useState } from 'react'
import Item from './Item/Item'
import Styles from './styles.module.css'
import { HUD_THINK_FAST } from '../../App'
import { useInterval } from '../../hooks/useInterval'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'

const SLOTS = [0, 1, 2, 3, 4, 5]

const Inventory = () => {

  // $.Msg('REACT-RENDER: Inventory rendered')

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const [hasInventory, setHasInventory] = useState(Entities.IsInventoryEnabled(selectedEntityIndex))

  useInterval(() => {
    setHasInventory(Entities.IsInventoryEnabled(selectedEntityIndex))
  }, HUD_THINK_FAST);

  if (!hasInventory) {
    return null;
  }

  return (
    <Panel hittest={false} className={Styles.container}  >
      <Panel className={Styles.items}>
        {SLOTS.map(slot => <Item key={slot} slot={slot}/>)}
      </Panel>
    </Panel>
  )
}

export default React.memo(Inventory)
