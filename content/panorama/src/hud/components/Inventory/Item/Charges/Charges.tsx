import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	item: ItemEntityIndex
}

const Charges = (props: Props) => {
	// $.Msg("REACT-RENDER: Inventory - Charges rendered");

	const { item } = props

	const [shouldDisplayCharges, setShouldDisplayCharges] = useState(Items.ShouldDisplayCharges(item))
	const [charges, setCharges] = useState(Items.GetCurrentCharges(item))

	useInterval(() => {
		setShouldDisplayCharges(Items.ShouldDisplayCharges(item))
		setCharges(Items.GetCurrentCharges(item))
	}, HUD_THINK_FAST)

	if (!shouldDisplayCharges) {
		return null
	}

	return <Label className={Styles.container} text={charges} />
}

export default React.memo(Charges)
