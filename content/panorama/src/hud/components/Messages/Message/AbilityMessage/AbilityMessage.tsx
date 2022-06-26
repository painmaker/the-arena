import React from 'react'
import { toColor } from '../../../../utils/Color'
import Styles from './styles.module.css'
import ParentStyles from '../styles.module.css'
import { IAbilityMessageData } from '../../Messages'

type Props = {
	data: IAbilityMessageData
}

const getText = (ability: AbilityEntityIndex, unit: EntityIndex) => {
	const localizedAbilityName = $.Localize(`#DOTA_Tooltip_Ability_${Abilities.GetAbilityName(ability)}`)
	const cooldown = Abilities.GetCooldownTimeRemaining(ability)
	const abilityLevel = Abilities.GetLevel(ability)
	const manaCost = Abilities.GetManaCost(ability)
	const currentMana = Entities.GetMana(unit)
	const isEnemy = Entities.IsEnemy(unit)

	if (isEnemy) {
		return `${localizedAbilityName}: Beware`
	}
	if (abilityLevel === 0) {
		return `${localizedAbilityName}: Not Learned - ( Level ${abilityLevel} )`
	}
	if (cooldown > 0) {
		return `${localizedAbilityName}: On Cooldown - ( ${Math.ceil(cooldown).toFixed(0)} Seconds Remain )`
	}
	if (manaCost > currentMana) {
		return `${localizedAbilityName}: Not Enough Mana - ( Need ${manaCost - currentMana} More )`
	}
	return `${localizedAbilityName}: Ready - ( Level ${abilityLevel} )`
}

const AbilityMessage = (props: Props) => {
	const { data } = props
	const { unit, ability, broadcaster } = data

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
			<DOTAAbilityImage className={Styles.abilityImage} abilityname={Abilities.GetAbilityName(ability)} showtooltip={false} />
			<Label html className={ParentStyles.textLabel} text={getText(ability, unit)} />
		</Panel>
	)
}

export default React.memo(AbilityMessage)
