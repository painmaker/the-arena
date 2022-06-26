import React from 'react'
import { toColor } from '../../../utils/Color'
import Styles from './styles.module.css'

interface Props {
	playerId: PlayerID
}

function Playername(props: Props) {
	// $.Msg("REACT-RENDER: Heroes - Playername rendered");

	const { playerId } = props

	return <Label text={Players.GetPlayerName(playerId)} className={Styles.label} style={{ color: toColor(playerId) }} />
}

export default React.memo(Playername)
