import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../../App'
import useInterval from '../../../../hooks/useInterval'
import { Styles as ParentStyles } from '../Styles'

type Props = {
	selectedUnit: EntityIndex
}

const Armor = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - Armor rendered");

	const { selectedUnit } = props

	const [armor, setArmor] = useState(Entities.GetPhysicalArmorValue(selectedUnit))
	const [bonusArmor, setBonusArmor] = useState(Entities.GetBonusPhysicalArmor(selectedUnit))

	useInterval(() => {
		setArmor(Entities.GetPhysicalArmorValue(selectedUnit))
		setBonusArmor(Entities.GetBonusPhysicalArmor(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Armor:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={(armor - bonusArmor).toFixed(1)} style={ParentStyles.ColumnLabel()} />
				{bonusArmor !== 0 && (
					<Label
						text={(bonusArmor > 0 ? ' + ' : ' - ') + Math.abs(bonusArmor).toFixed(0)}
						style={{
							...ParentStyles.ColumnLabel(),
							color: bonusArmor > 0 ? 'green' : 'red',
						}}
					/>
				)}
			</Panel>
		</Panel>
	)
}

export default React.memo(Armor)
