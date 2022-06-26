import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	selectedUnit: EntityIndex
	text: string
}

const AbilitiesPoints = (props: Props) => {
	// $.Msg("REACT-RENDER: AbilitiesShop - AbilitiesPoints rendered");

	const { selectedUnit, text } = props

	const [abilityPoints, setAbilityPoints] = useState(Entities.GetAbilityPoints(selectedUnit))

	useInterval(() => {
		setAbilityPoints(Entities.GetAbilityPoints(selectedUnit))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel className={Styles.container}>
			<Panel className={Styles.labelContainer}>
				<Label text={text} className={Styles.textLabel} />
				<Label
					text={abilityPoints}
					className={Styles.numberLabel}
					style={{
						color: abilityPoints !== 0 ? 'orange' : 'rgba(200, 200, 200, 0.75)',
					}}
				/>
			</Panel>
		</Panel>
	)
}

export default React.memo(AbilitiesPoints)
