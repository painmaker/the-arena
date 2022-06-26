import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import useGameEvent from '../../../../hooks/useGameEvent'
import { useInterval } from '../../../../hooks/useInterval'
import { escapeString } from '../../../../utils/EscapeString'
import Styles from './styles.module.css'

type Props = {
	item: ItemsShopItem
	selectedUnit: EntityIndex
	searchValue: string
	setActiveItem: Dispatch<SetStateAction<ItemsShopItem | undefined>>
}

function Item(props: Props) {
	// $.Msg("REACT-RENDER: ItemsShop - Item rendered");

	const { item, selectedUnit, searchValue, setActiveItem } = props

	const [playerGold, setPlayerGold] = useState(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)))
	const [isShopInRange, setIsShopInRange] = useState(Entities.IsInRangeOfShop(selectedUnit, 0, false))

	const hasEnoughCold = item.cost <= playerGold

	const onRightClick = useCallback(() => {
		if (!isShopInRange) {
			GameUI.SendCustomHUDError('No Shop In Range', 'General.Item_CantPickUp')
			return
		}
		if (!hasEnoughCold) {
			GameUI.SendCustomHUDError('Not Enough Gold', 'General.Item_CantPickUp')
			return
		}
		GameEvents.SendCustomGameEventToServer('attempt_item_purchase', {
			itemname: item.itemname,
			cost: item.cost,
		})
	}, [isShopInRange, hasEnoughCold, item])

	const onLeftClick = useCallback(() => {
		if (GameUI.IsAltDown()) {
			// Send msg
		} else {
			setActiveItem(item)
		}
	}, [item])

	useInterval(() => {
		setPlayerGold(Players.GetGold(Entities.GetPlayerOwnerID(selectedUnit)))
		setIsShopInRange(Entities.IsInRangeOfShop(selectedUnit, 0, false))
	}, HUD_THINK_FAST)

	useGameEvent(
		'attempt_item_purchase_success',
		() => {
			Game.EmitSound('General.CourierGivesItem')
			Game.EmitSound('Item.PickUpShop')
		},
		[],
	)

	useGameEvent(
		'attempt_item_purchase_error',
		() => {
			GameUI.SendCustomHUDError('Unable To Purchase Item', 'General.Item_CantPickUp')
		},
		[],
	)

	let isSearched = false
	Object.values(item.tags).forEach(tag => {
		if (tag.match(escapeString(searchValue))) {
			isSearched = true
		}
	})

	return (
		<Button
			className={Styles.container}
			style={{
				border: hasEnoughCold ? '1px solid rgba(200, 175, 0, 0.5)' : '1px solid black',
				washColor: searchValue.length > 0 && !isSearched ? 'rgba(0, 0, 0, 0.9)' : 'none',
			}}
			onactivate={onLeftClick}
			oncontextmenu={onRightClick}
		>
			<DOTAItemImage className={Styles.image} itemname={item.itemname} />
		</Button>
	)
}

export default React.memo(Item)
