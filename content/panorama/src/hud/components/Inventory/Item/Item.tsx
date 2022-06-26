import React, { useCallback, useContext, useEffect, useState } from 'react'
import Keybind from './Keybind/Keybind'
import Cooldown from './Cooldown/Cooldown'
import Image from './Image/Image'
import Charges from './Charges/Charges'
import ManaCost from './ManaCost/ManaCost'

import Styles from './styles.module.css'
import Shine from './Shine/Shine'
import SelectedEntityIndexContext from '../../../context/SelectedEntityIndexContext'
import { useInterval } from '../../../hooks/useInterval'
import { HUD_THINK_FAST } from '../../../App'

type Props = {
	slot: number
}

const Item = (props: Props) => {
	// $.Msg("REACT-RENDER: Inventory - Item rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const { slot } = props

	const [isDragged, setIsDragged] = useState(false)
	const [isDropTarget, setIsDropTarget] = useState(false)
	const [item, setItem] = useState(Entities.GetItemInSlot(selectedEntityIndex, slot))

	useInterval(() => {
		setItem(Entities.GetItemInSlot(selectedEntityIndex, slot))
	}, HUD_THINK_FAST)

	const onDragStart = useCallback(
		(thisPanel: Panel, draggedPanel: any) => {
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
		},
		[item, selectedEntityIndex],
	)

	const onDragEnd = useCallback(
		(thisPanel: Panel, draggedPanel: any) => {
			if (!draggedPanel.Data().dragCompleted) {
				Game.DropItemAtCursor(selectedEntityIndex, item)
			}
			draggedPanel.DeleteAsync(0)
			setIsDragged(false)
		},
		[item, selectedEntityIndex],
	)

	const onDragLeave = useCallback(
		(thisPanel: Panel, draggedPanel: any) => {
			const draggedItem = draggedPanel.Data().item
			if (item === -1 || draggedItem === null || draggedItem === item) {
				return
			}
			setIsDropTarget(false)
		},
		[item],
	)

	const OnDragEnter = useCallback(
		(thisPanel: Panel, draggedPanel: any) => {
			const draggedItem = draggedPanel.Data().item
			if (item === -1 || draggedItem === null || draggedItem === item) {
				return
			}
			setIsDropTarget(true)
		},
		[item],
	)

	const onDragDrop = useCallback(
		(thisPanel: Panel, draggedPanel: any) => {
			const draggedItem = draggedPanel.Data().item
			if (draggedItem === null) {
				return
			}
			draggedPanel.Data().dragCompleted = true
			if (draggedItem === item) {
				return
			}
			Game.PrepareUnitOrders({
				OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
				TargetIndex: slot,
				AbilityIndex: draggedItem,
			})
		},
		[item, slot],
	)

	const onItemLeftClicked = useCallback(() => {
		if (item === -1) {
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
		const panel = $(`#inventory_item_${slot}`)
		$.DispatchEvent('DOTAHideAbilityTooltip', panel)

		if (item === -1) {
			GameUI.SendCustomHUDError('No Item In Slot', 'General.InvalidTarget_Invulnerable')
			return
		}

		const playerId = Entities.GetPlayerOwnerID(selectedEntityIndex)
		const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, playerId)

		if (isControllable) {
			// Do stuff
			Game.EmitSound('ui_topmenu_select')
		} else {
			GameUI.SendCustomHUDError('Item Not Owned By You', 'General.InvalidTarget_Invulnerable')
		}
	}, [item, selectedEntityIndex, slot])

	const onMouseOver = useCallback(() => {
		if (item === -1) {
			return
		}
		$.DispatchEvent('DOTAShowAbilityTooltipForEntityIndex', $(`#inventory_item_${slot}`), Abilities.GetAbilityName(item), selectedEntityIndex)
	}, [item, selectedEntityIndex, slot])

	const onMouseOut = useCallback(() => {
		$.DispatchEvent('DOTAHideAbilityTooltip', $(`#inventory_item_${slot}`))
	}, [slot])

	useEffect(() => {
		const panel = $(`#inventory_item_${slot}`)
		if (panel) {
			$.RegisterEventHandler('DragEnter', panel, OnDragEnter)
			$.RegisterEventHandler('DragDrop', panel, onDragDrop)
			$.RegisterEventHandler('DragLeave', panel, onDragLeave)
			$.RegisterEventHandler('DragStart', panel, onDragStart)
			$.RegisterEventHandler('DragEnd', panel, onDragEnd)
		}
	}, [slot])

	return (
		<Panel
			id={`inventory_item_${slot}`}
			onmouseover={onMouseOver}
			onmouseout={onMouseOut}
			onactivate={onItemLeftClicked}
			oncontextmenu={onItemRightClicked}
			draggable
			className={Styles.container}
			style={{
				saturation: isDragged || isDropTarget ? '0.5' : '1.0',
				washColor: isDragged || isDropTarget ? '#808080' : 'none',
			}}
		>
			{item !== -1 && (
				<>
					<Shine item={item} />
					<Cooldown item={item} />
					{Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer()) && <Keybind item={item} />}
					<Charges item={item} />
					<Image item={item} />
					<ManaCost item={item} />
				</>
			)}
		</Panel>
	)
}

export default Item
