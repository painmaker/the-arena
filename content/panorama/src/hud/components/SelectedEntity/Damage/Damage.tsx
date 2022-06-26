import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import ParentStyles from '../styles.module.css'

type Props = {
	selectedEntityIndex: EntityIndex
}

function Damage(props: Props) {
	// $.Msg("REACT-RENDER: Character - Damage rendered");

	const { selectedEntityIndex } = props

	const [minDamage, setMinDamage] = useState(Entities.GetDamageMin(selectedEntityIndex))
	const [maxDamage, setMaxDamage] = useState(Entities.GetDamageMax(selectedEntityIndex))
	const [bonusDamage, setBonusDamage] = useState(Entities.GetDamageBonus(selectedEntityIndex))

	useInterval(() => {
		setMinDamage(Entities.GetDamageMin(selectedEntityIndex))
		setMaxDamage(Entities.GetDamageMax(selectedEntityIndex))
		setBonusDamage(Entities.GetDamageBonus(selectedEntityIndex))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel className={ParentStyles.entry}>
			<Panel className={ParentStyles.imageContainer}>
				<Image src='file://{images}/icon_damage.png' className={ParentStyles.image} />
			</Panel>
			<Panel className={ParentStyles.labelContainer}>
				{bonusDamage !== 0 && (
					<Label
						className={ParentStyles.label}
						style={{ color: bonusDamage > 0 ? 'rgba(0, 128, 0, 0.85)' : 'rgba(175, 0, 0, 0.85)' }}
						text={(bonusDamage > 0 ? '+' : '') + bonusDamage.toFixed(0)}
					/>
				)}
				<Label className={ParentStyles.label} text={`${minDamage.toFixed(0)} - ${maxDamage.toFixed(0)}`} />
			</Panel>
		</Panel>
	)
}

export default React.memo(Damage)
