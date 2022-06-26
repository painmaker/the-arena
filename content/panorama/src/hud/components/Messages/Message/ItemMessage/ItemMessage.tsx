import React from 'react'
import { toColor } from '../../../../utils/Color'
import Styles from './styles.module.css'
import ParentStyles from '../styles.module.css'
import { ItemMessageData } from '../../Messages'

type Props = {
	data: ItemMessageData
}

const getText = (item: ItemEntityIndex, unit: EntityIndex) => {
	const localizedItemName = $.Localize(`#DOTA_Tooltip_ability_${Abilities.GetAbilityName(item)}`)
	const cooldown = Abilities.GetCooldownTimeRemaining(item)
	const manaCost = Abilities.GetManaCost(item)
	const currentMana = Entities.GetMana(unit)
	const isEnemy = Entities.IsEnemy(unit)

	if (isEnemy) {
		return `${localizedItemName}: Beware`
	}
	if (cooldown > 0) {
		return `${localizedItemName}: On Cooldown - ( ${Math.ceil(cooldown).toFixed(0)} Seconds Remain )`
	}
	if (manaCost > currentMana) {
		return `${localizedItemName}: Not Enough Mana - ( Need ${manaCost - currentMana} More )`
	}
	return `${localizedItemName}: Ready`
}

function ItemMessage(props: Props) {
	const { data } = props
	const { unit, item, broadcaster } = data

	const unitOwnerPlayerID = Entities.GetPlayerOwnerID(unit)
	const unitOwnerPlayerName = Players.GetPlayerName(Entities.GetPlayerOwnerID(unit))
	const isUnitEnemy = Entities.IsEnemy(unit)
	const isUnitHero = Entities.IsHero(unit)
	const unitName = Entities.GetUnitName(unit)

	return (
		<Panel className={ParentStyles.messageContainer}>
			<DOTAHeroImage
				heroimagestyle='icon'
				heroname={Entities.GetUnitName(Players.GetPlayerHeroEntityIndex(broadcaster))}
				className={ParentStyles.heroImage}
			/>
			<Label text={Players.GetPlayerName(broadcaster)} className={ParentStyles.playernameLabel} style={{ color: toColor(broadcaster) }} />
			{unitOwnerPlayerID !== broadcaster && (
				<>
					<Image className={ParentStyles.arrowImage} src='file://{images}/control_icons/chat_wheel_icon.png' />
					<Label html className={ParentStyles.enemyOrAllyLabel} text={isUnitEnemy ? 'Enemy' : 'Ally'} />
					{isUnitHero && <DOTAHeroImage heroimagestyle='icon' heroname={unitName} className={ParentStyles.heroImage} />}
					{!isUnitHero && <Label className={ParentStyles.unitLabel} text={$.Localize(`#${unitName}`)} />}
					<Label
						text={isUnitHero ? unitOwnerPlayerName : `(${unitOwnerPlayerName})`}
						className={ParentStyles.playernameLabel}
						style={{ color: toColor(unitOwnerPlayerID) }}
					/>
				</>
			)}
			<Image className={ParentStyles.arrowImage} src='file://{images}/control_icons/chat_wheel_icon.png' />
			<DOTAItemImage className={Styles.itemImage} itemname={Abilities.GetAbilityName(item)} showtooltip={false} />
			<Label html className={ParentStyles.textLabel} text={getText(item, unit)} />
		</Panel>
	)
}

export default React.memo(ItemMessage)
