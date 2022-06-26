import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import { Styles as ParentStyles } from '../Styles'

type Props = {
	selectedUnit: EntityIndex
}

function ManaRegen(props: Props) {
	// $.Msg("REACT-RENDER: Character - ManaRegen rendered");

	const { selectedUnit } = props

	const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedUnit))

	useInterval(() => {
		setManaRegen(Entities.GetManaThinkRegen(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Mana Regeneration:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={manaRegen.toFixed(2)} style={ParentStyles.ColumnLabel()} />
			</Panel>
		</Panel>
	)
}

export default React.memo(ManaRegen)
