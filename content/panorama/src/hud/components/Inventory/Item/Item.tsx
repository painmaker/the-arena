import React, { Dispatch, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import Keybind from './Keybind/Keybind'
import Cooldown from './Cooldown/Cooldown'
import Image from './Image/Image'
import Charges from './Charges/Charges'
import ManaCost from './ManaCost/ManaCost'
import { ItemOptionsActionTypes } from '../../../interfaces/itemOptionsTypes'
import {
  setItemOptionsItem,
  setItemOptionsPositionX,
  setItemOptionsVisible,
} from '../../../actions/itemOptionsActions'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../../reducers/rootReducer'
import Styles from './styles.module.css'
import Shine from './Shine/Shine'
import SelectedEntityIndexContext from '../../../context/SelectedEntityIndexContext'

const mapStateToProps = (state: RootState) => ({
  itemOptionsVisible: state.itemOptionsReducer.visible,
  itemOptionsItem: state.itemOptionsReducer.item,
})

const mapDispatchToProps = (dispatch: Dispatch<ItemOptionsActionTypes>) => ({
  setItemOptionsItem: (item: ItemEntityIndex) => dispatch(setItemOptionsItem(item)),
  setItemOptionsPositionX: (posX: number) => dispatch(setItemOptionsPositionX(posX)),
  setItemOptionsVisible: (visible: boolean) => dispatch(setItemOptionsVisible(visible)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  item: ItemEntityIndex
  slot: number
}

const Item = (props: Props) => {

  // $.Msg("REACT-RENDER: Inventory - Item rendered");

  const { selectedEntityIndex } = useContext(SelectedEntityIndexContext);

  const {
    item,
    slot,
    itemOptionsVisible,
    itemOptionsItem,
    setItemOptionsItem,
    setItemOptionsPositionX,
    setItemOptionsVisible,
  } = props

  const [isDragged, setIsDragged] = useState(false)
  const [isDropTarget, setIsDropTarget] = useState(false)

  const onDragStart = useCallback((thisPanel: Panel, draggedPanel: any) => {

    $.DispatchEvent('DOTAHideAbilityTooltip', thisPanel)

    if (item === -1) {
      return
    }

    if (!Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())) {
      GameUI.SendCustomHUDError('Item Not Owned By You', 'General.InvalidTarget_Invulnerable')
      return
    }

    setIsDragged(true)

    draggedPanel.displayPanel = $.CreatePanel('DOTAItemImage', $.GetContextPanel(), 'inventoryItemDraggedItem')
    draggedPanel.displayPanel.itemname = Abilities.GetAbilityName(item)
    draggedPanel.displayPanel.contextEntityIndex = item
    draggedPanel.displayPanel.Data().item = item
    draggedPanel.displayPanel.Data().dragCompleted = false
    draggedPanel.offsetX = 0
    draggedPanel.offsetY = 0

  }, [item, selectedEntityIndex])

  const onDragEnd = useCallback((thisPanel: Panel, draggedPanel: any) => {
    if (!draggedPanel.Data().dragCompleted) {
      Game.DropItemAtCursor(selectedEntityIndex, item)
    }
    draggedPanel.DeleteAsync(0)
    setIsDragged(false)
  }, [item, selectedEntityIndex])

  const onDragLeave = useCallback((thisPanel: Panel, draggedPanel: any) => {
    const draggedItem = draggedPanel.Data().item
    if (item === -1 || draggedItem === null || draggedItem === item) {
      return
    }
    setIsDropTarget(false);
  }, [item])

  const OnDragEnter = useCallback((thisPanel: Panel, draggedPanel: any) => {
    const draggedItem = draggedPanel.Data().item
    if (item === -1 || draggedItem === null || draggedItem === item) {
      return
    }
    setIsDropTarget(true)
  }, [item])

  const onDragDrop = useCallback((thisPanel: Panel, draggedPanel: any) => {
    const draggedItem = draggedPanel.Data().item
    if (draggedItem === null) {
      return
    }
    draggedPanel.Data().dragCompleted = true
    if (draggedItem === item) {
      return
    }
    setItemOptionsVisible(false)
    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
      TargetIndex: slot,
      AbilityIndex: draggedItem,
    })
  }, [item, slot, setItemOptionsVisible])

  const onItemLeftClicked = useCallback(() => {
    if (item == -1) {
      return
    }
    if (GameUI.IsAltDown()) {
      GameEvents.SendCustomGameEventToAllClients('on_item_alerted', {
        broadcaster: Players.GetLocalPlayer(),
        selectedEntityIndex,
        item,
      })
      return
    }
    if (!Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())) {
      return
    }
    if (Items.CanBeExecuted(item)) {
      Abilities.ExecuteAbility(item, selectedEntityIndex, false)
    }
  }, [item, selectedEntityIndex])

  const onItemRightClicked = useCallback(() => {
    const panel = $('#inventory_item_' + slot)
    $.DispatchEvent('DOTAHideAbilityTooltip', panel)
    if (item === -1) {
      GameUI.SendCustomHUDError('No Item In Slot', 'General.InvalidTarget_Invulnerable')
      return
    }

    const playerId = Entities.GetPlayerOwnerID(selectedEntityIndex)
    const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, playerId)

    if (isControllable) {
      if (itemOptionsVisible && itemOptionsItem === item) {
        setItemOptionsVisible(false)
      } else {
        setItemOptionsVisible(true)
        setItemOptionsItem(item)
        const position = panel.style.position
        if (position) {
          const positionsArray = (position.match(/[+-]?\d+(\.\d+)?/g) || []).map(n => parseFloat(n))
          const posX = positionsArray[0]
          setItemOptionsPositionX(posX)
        }
      }
      Game.EmitSound('ui_topmenu_select')
    } else {
      GameUI.SendCustomHUDError('Item Not Owned By You', 'General.InvalidTarget_Invulnerable')
    }
  }, [item, selectedEntityIndex, slot, itemOptionsVisible, itemOptionsItem, setItemOptionsVisible, setItemOptionsItem, setItemOptionsPositionX])

  const onMouseOver = useCallback(() => {
    if (item === -1) {
      return
    }
    $.DispatchEvent('DOTAShowAbilityTooltipForEntityIndex', $('#inventory_item_' + slot), Abilities.GetAbilityName(item), selectedEntityIndex)
  }, [item, selectedEntityIndex, slot])

  const onMouseOut = useCallback(() => {
    $.DispatchEvent('DOTAHideAbilityTooltip', $('#inventory_item_' + slot))
  }, [slot])

  useLayoutEffect(() => {
    const panel = $('#inventory_item_' + slot)
    if (panel) {
      $.RegisterEventHandler('DragEnter', panel, OnDragEnter)
      $.RegisterEventHandler('DragDrop', panel, onDragDrop)
      $.RegisterEventHandler('DragLeave', panel, onDragLeave)
      $.RegisterEventHandler('DragStart', panel, onDragStart)
      $.RegisterEventHandler('DragEnd', panel, onDragEnd)
      panel.SetAcceptsFocus(false)
    }
  }, [slot])

  return (
    <Panel
      id={'inventory_item_' + slot}
      onmouseover={onMouseOver}
      onmouseout={onMouseOut}
      onactivate={onItemLeftClicked}
      oncontextmenu={onItemRightClicked}
      draggable={true}
      className={Styles.container}
      style={{
        saturation: isDragged || isDropTarget ? '0.5' : '1.0',
        washColor: isDragged || isDropTarget ? '#808080' : 'none',
      }}
    >
      {item !== -1 && (
        <React.Fragment>
          <Shine item={item} />
          <Cooldown item={item} />
          {Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer()) && (
            <Keybind item={item} />
          )}
          <Charges item={item} />
          <Image item={item} />
          <ManaCost item={item} />
        </React.Fragment>
      )}
    </Panel>
  )
}

export default connector(Item);
