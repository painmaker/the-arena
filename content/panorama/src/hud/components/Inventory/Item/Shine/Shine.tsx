import React, { useContext, useEffect, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import SelectedEntityIndexContext from '../../../../context/SelectedEntityIndexContext'
import { useInterval } from '../../../../hooks/useInterval'
import usePrevious from '../../../../hooks/usePrevious'

type Props = {
	item: ItemEntityIndex
}

function Shine(props: Props) {
	// $.Msg("REACT-RENDER: Inventory - Shine rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const { item } = props

	const [isMuted, setIsMuted] = useState(Entities.IsMuted(selectedEntityIndex))
	const wasMuted = usePrevious(isMuted)
	const [isOnCooldown, setIsOnCooldown] = useState(!Abilities.IsCooldownReady(item))
	const wasOnCooldown = usePrevious(isOnCooldown)

	useInterval(() => {
		setIsMuted(Entities.IsMuted(selectedEntityIndex))
		setIsOnCooldown(!Abilities.IsCooldownReady(item))
	}, HUD_THINK_FAST)

	useEffect(() => {
		const showSweep =
			(isOnCooldown === false && wasOnCooldown === true && isMuted === false) ||
			(isMuted === false && wasMuted === true && isOnCooldown === false)
		$(`#inventory_item_shine_panel_${item}`)?.SetHasClass('offCooldownShine', showSweep)
	}, [isMuted, wasMuted, isOnCooldown, wasOnCooldown])

	return <Panel key={item} id={`inventory_item_shine_panel_${item}`} />
}

export default React.memo(Shine)
