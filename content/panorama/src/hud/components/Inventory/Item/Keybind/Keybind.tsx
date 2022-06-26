import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	item: ItemEntityIndex
}

const Keybind = (props: Props) => {
	// $.Msg("REACT-RENDER: Inventory - Keybind rendered");

	const { item } = props

	const [keybind, setKeybind] = useState(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item))

	useInterval(() => {
		setKeybind(Abilities.IsPassive(item) ? '' : Abilities.GetKeybind(item))
	}, HUD_THINK_FAST)

	if (keybind === '') {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<Label className={Styles.label} text={keybind} />
		</Panel>
	)
}

export default React.memo(Keybind)
