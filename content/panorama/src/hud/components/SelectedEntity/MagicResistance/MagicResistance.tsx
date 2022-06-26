import React, { useState } from 'react'
import { HUD_THINK_MEDIUM } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import ParentStyles from '../styles.module.css'

type Props = {
	selectedEntityIndex: EntityIndex
}

function MagicResistance(props: Props) {
	// $.Msg("REACT-RENDER: Character - MagicalResistance rendered");

	const { selectedEntityIndex } = props

	const [magicResistance, setMagicResistance] = useState(Entities.GetMagicalArmorValue(selectedEntityIndex))

	useInterval(() => {
		setMagicResistance(Entities.GetMagicalArmorValue(selectedEntityIndex))
	}, HUD_THINK_MEDIUM)

	return (
		<Panel className={ParentStyles.entry}>
			<Panel className={ParentStyles.imageContainer}>
				<Image src='file://{images}/icon_magic_resist.png' className={ParentStyles.image} />
			</Panel>
			<Panel className={ParentStyles.labelContainer}>
				<Label className={ParentStyles.label} text={`${(magicResistance * 100).toFixed(1)} % `} />
			</Panel>
		</Panel>
	)
}

export default React.memo(MagicResistance)
