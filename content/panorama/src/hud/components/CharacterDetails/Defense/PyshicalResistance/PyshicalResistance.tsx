import React, { useState } from 'react'
import { Styles as ParentStyles } from '../Styles'
import { HUD_THINK_MEDIUM } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'

type Props = {
	selectedUnit: EntityIndex
}

function PyshicalResistance(props: Props) {
	// $.Msg("REACT-RENDER: Character - PhysicalResistance rendered");

	const { selectedUnit } = props

	const [resistance, setResistance] = useState(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL))

	useInterval(() => {
		setResistance(Entities.GetArmorReductionForDamageType(selectedUnit, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Pyshical Resistance:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={`${(resistance * 100).toFixed(2)} %`} style={ParentStyles.ColumnLabel()} />
			</Panel>
		</Panel>
	)
}

export default React.memo(PyshicalResistance)
