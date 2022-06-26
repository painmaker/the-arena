import React, { useState } from 'react'
import { Styles as ParentStyles } from '../Styles'
import { HUD_THINK_MEDIUM } from '../../../../App'
import useInterval from '../../../../hooks/useInterval'

type Props = {
	selectedUnit: EntityIndex
}

const AttackRange = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - AttackRange rendered");

	const { selectedUnit } = props

	const [attackRange, setAttackRange] = useState(Entities.GetAttackRange(selectedUnit))

	useInterval(() => {
		setAttackRange(Entities.GetAttackRange(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Attack Range:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={attackRange.toFixed(0)} style={ParentStyles.ColumnLabel()} />
			</Panel>
		</Panel>
	)
}

export default React.memo(AttackRange)
