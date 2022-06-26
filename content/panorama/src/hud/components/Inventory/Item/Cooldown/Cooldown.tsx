import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	item: ItemEntityIndex
}

function Cooldown(props: Props) {
	// $.Msg("REACT-RENDER: Inventory - Cooldown rendered");

	const { item } = props

	const [degree, setDegree] = useState(0)
	const [remainingCooldown, setRemainingCooldown] = useState(Abilities.GetCooldownTimeRemaining(item))

	useInterval(() => {
		const total = Abilities.GetCooldownLength(item)
		const remaining = Abilities.GetCooldownTimeRemaining(item)
		const degree = Math.floor((remainingCooldown / total) * -360)
		setDegree(Number.isFinite(degree) && !Number.isNaN(degree) ? degree : 0)
		setRemainingCooldown(remaining)
	}, HUD_THINK_FAST)

	return (
		<>
			<Panel className={Styles.container} style={{ clip: `radial(50% 50%, 0deg, ${degree}deg)` }} />
			{remainingCooldown > 0 && (
				<Label className={Styles.label} text={remainingCooldown > 1.0 ? Math.round(remainingCooldown) : remainingCooldown.toFixed(1)} />
			)}
		</>
	)
}

export default React.memo(Cooldown)
