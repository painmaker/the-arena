import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { useInterval } from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	unit: EntityIndex
	buff: BuffID
}

const Stacks = (props: Props) => {
	// $.Msg("REACT-RENDER: Stacks rendered");

	const { unit, buff } = props

	const [stacks, setStacks] = useState(Buffs.GetStackCount(unit, buff))

	useInterval(() => {
		setStacks(Buffs.GetStackCount(unit, buff))
	}, HUD_THINK_FAST)

	if (stacks === 0) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={stacks} />
		</Panel>
	)
}

export default React.memo(Stacks)
