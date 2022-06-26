import React from 'react'
import Styles from './styles.module.css'

type Props = {
	modifier: BuffID
	selectedEntityIndex: EntityIndex
}

function FilledBackground(props: Props) {
	// $.Msg("REACT-RENDER: Modifiers - FilledBackground rendered");

	const { modifier, selectedEntityIndex } = props

	return (
		<Panel
			className={Styles.border}
			style={{
				washColor: Buffs.IsDebuff(selectedEntityIndex, modifier) ? 'rgba(245, 50, 20, 0.95)' : '#8bdd4f',
			}}
		/>
	)
}

export default FilledBackground
