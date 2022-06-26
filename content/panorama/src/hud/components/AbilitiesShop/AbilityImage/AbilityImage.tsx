import React, { useEffect, useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	selectedUnit: EntityIndex
	shopAbility: ShopAbility
	searchValue: string
}

function AbilityImage(props: Props) {
	// $.Msg("REACT-RENDER: AbilitiesShop - AbilityImage rendered");

	const { selectedUnit, shopAbility, searchValue } = props
	const { name, aliases, requiredLevel } = shopAbility

	const [isRequiredLevel, setIsRequiredLevel] = useState(Entities.GetLevel(selectedUnit) >= requiredLevel)
	const [isSearched, setIsSearched] = useState(false)

	useInterval(() => {
		setIsRequiredLevel(Entities.GetLevel(selectedUnit) >= requiredLevel)
	}, HUD_THINK_MEDIUM)

	useEffect(() => {
		let isSearched = false
		Object.values(aliases).forEach(alias => {
			if (alias.match(searchValue)) {
				isSearched = true
			}
		})
		setIsSearched(isSearched)
	}, [aliases, searchValue])

	const hasSearchValue = searchValue.length > 0

	return (
		<Button
			id={`ability_shop_image_${name}`}
			className={Styles.abilityImage}
			style={{
				washColor: (hasSearchValue && !isSearched) || !isRequiredLevel ? 'grey' : 'none',
				border: hasSearchValue && isSearched ? '1px solid orange' : '0px solid black',
			}}
			oncontextmenu={() => {
				$(`#ability_shop_image_${name}`).RemoveClass('btnClicked')
				$(`#ability_shop_image_${name}`).AddClass('btnClicked')
				GameEvents.SendCustomGameEventToServer('purchase_ability', { entindex: selectedUnit, abilityname: name })
			}}
			onmouseout={() => $.DispatchEvent('DOTAHideAbilityTooltip', $(`#ability_shop_image_${name}`))}
			onmouseover={() => $.DispatchEvent('DOTAShowAbilityTooltipForEntityIndex', $(`#ability_shop_image_${name}`), name, selectedUnit)}
		>
			<DOTAAbilityImage abilityname={name} />
		</Button>
	)
}

export default React.memo(AbilityImage)
