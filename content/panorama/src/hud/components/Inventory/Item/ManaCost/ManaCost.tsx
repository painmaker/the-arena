import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	item: ItemEntityIndex
}

const ManaCost = (props: Props) => {
	// $.Msg("REACT-RENDER: Inventory - ManaCost rendered");

	const { item } = props

	const [manaCost, setManaCost] = useState(Abilities.GetManaCost(item))

	useInterval(() => {
		setManaCost(Abilities.GetManaCost(item))
	}, HUD_THINK_FAST)

	return <Label className={Styles.label} text={manaCost > 0 ? manaCost.toFixed(0) : ''} />
}

export default React.memo(ManaCost)
