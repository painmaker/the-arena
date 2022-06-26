import React from 'react'
import { toColor } from '../../../../utils/Color'
import { IManaMessageData } from '../../Messages'
import Styles from './styles.module.css'
import ParentStyles from '../styles.module.css'

type Props = {
	data: IManaMessageData
}

const ManaMessage = (props: Props) => {
	const { data } = props
	const { unit, broadcaster } = data

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
					{!isUnitHero && <Label className={ParentStyles.unitLabel} text={$.Localize(`#${unitName}`)} />}
					{isUnitHero && <DOTAHeroImage heroimagestyle='icon' heroname={unitName} className={ParentStyles.heroImage} />}
					<Label
						text={isUnitHero ? unitOwnerPlayerName : `(${unitOwnerPlayerName})`}
						className={ParentStyles.playernameLabel}
						style={{ color: toColor(unitOwnerPlayerID) }}
					/>
				</>
			)}
			<Image className={ParentStyles.arrowImage} src='file://{images}/control_icons/chat_wheel_icon.png' />
			<Label html className={ParentStyles.textLabel} text='Has ' />
			<Label html className={Styles.manaLabel} text={`${((Entities.GetMana(unit) / Entities.GetMaxMana(unit)) * 100).toFixed(0)}% `} />
			<Label html className={ParentStyles.textLabel} text=' Mana' />
		</Panel>
	)
}

export default React.memo(ManaMessage)
