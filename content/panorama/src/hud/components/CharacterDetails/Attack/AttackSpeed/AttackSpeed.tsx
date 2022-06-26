import React, { useState } from 'react'
import { Styles as ParentStyles } from '../Styles'
import { HUD_THINK_MEDIUM } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'

type Props = {
	selectedUnit: EntityIndex
}

function AttackSpeed(props: Props) {
	// $.Msg("REACT-RENDER: Character - AttackSpeed rendered");

	const { selectedUnit } = props

	const [attackSpeed, setAttackSpeed] = useState(Entities.GetAttackSpeed(selectedUnit))
	const [secondsPerAttack, setSecondsPerAttack] = useState(Entities.GetSecondsPerAttack(selectedUnit))

	useInterval(() => {
		setAttackSpeed(Entities.GetAttackSpeed(selectedUnit))
		setSecondsPerAttack(Entities.GetSecondsPerAttack(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Attack Speed:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={`${(attackSpeed * 100).toFixed(0)} (${secondsPerAttack.toFixed(2)}s)`} style={ParentStyles.ColumnLabel()} />
			</Panel>
		</Panel>
	)
}

export default React.memo(AttackSpeed)
