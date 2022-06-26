import React, { useState } from 'react'
import { Styles } from './Styles'
import { HUD_THINK_MEDIUM } from '../../../App'
import useInterval from '../../../hooks/useInterval'

type Props = {
	selectedUnit: EntityIndex
}

const Level = (props: Props) => {
	// $.Msg("REACT-RENDER: Character - Level rendered");

	const { selectedUnit } = props

	const [level, setLevel] = useState(Entities.GetLevel(selectedUnit))
	const [degree, setDegree] = useState(0)

	useInterval(() => {
		if (Entities.IsHero(selectedUnit)) {
			const requiredXp = Entities.GetNeededXPToLevel(selectedUnit)
			const currentXp = Entities.GetCurrentXP(selectedUnit)
			const degree = Math.floor((currentXp / requiredXp) * 360)
			setDegree(Number.isFinite(degree) && !Number.isNaN(degree) ? degree : 0)
		}
		setLevel(Entities.GetLevel(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel style={Styles.Container()}>
			<Panel style={Styles.CircleContainer()}>
				<Panel style={Styles.CircleBackground()} />
				<Panel className='EmptyCircle' style={Styles.CircleForeground(degree)} />
				<Label style={Styles.CircleLevelLabel()} text={level} />
			</Panel>
			<Label style={Styles.LevelLabel()} text='level' />
		</Panel>
	)
}

export default React.memo(Level)
