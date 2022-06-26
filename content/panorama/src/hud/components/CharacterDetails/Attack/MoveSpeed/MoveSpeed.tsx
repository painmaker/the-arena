import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import { Styles as ParentStyles } from '../Styles'

type Props = {
	selectedUnit: EntityIndex
}

function MoveSpeed(props: Props) {
	// $.Msg("REACT-RENDER: Character - MoveSpeed rendered");

	const { selectedUnit } = props

	const [baseMoveSpeed, setBaseMoveSpeed] = useState(Entities.GetBaseMoveSpeed(selectedUnit))
	const [totalMoveSpeed, setTotalMoveSpeed] = useState(Entities.GetMoveSpeedModifier(selectedUnit, Entities.GetBaseMoveSpeed(selectedUnit)))

	useInterval(() => {
		const baseMoveSpeed = Entities.GetBaseMoveSpeed(selectedUnit)
		setBaseMoveSpeed(baseMoveSpeed)
		setTotalMoveSpeed(Entities.GetMoveSpeedModifier(selectedUnit, baseMoveSpeed))
	}, HUD_THINK_MEDIUM)

	const increasedMoveSpeed = totalMoveSpeed - baseMoveSpeed

	return (
		<Panel style={ParentStyles.Row()}>
			<Panel style={ParentStyles.LeftColumn()}>
				<Label text='Movement Speed:' style={ParentStyles.ColumnLabel()} />
			</Panel>
			<Panel style={ParentStyles.RightColumn()}>
				<Label text={baseMoveSpeed.toFixed(0)} style={ParentStyles.ColumnLabel()} />
				{increasedMoveSpeed !== 0 && (
					<Label
						text={(increasedMoveSpeed > 0 ? ' + ' : ' - ') + Math.abs(increasedMoveSpeed).toFixed(0)}
						style={{
							...ParentStyles.ColumnLabel(),
							color: increasedMoveSpeed > 0 ? 'green' : 'red',
						}}
					/>
				)}
			</Panel>
		</Panel>
	)
}

export default React.memo(MoveSpeed)
