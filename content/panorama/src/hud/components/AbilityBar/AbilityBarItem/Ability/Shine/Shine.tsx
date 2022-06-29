import React, { useContext, useEffect, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../../context/SelectedEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import usePrevious from '../../../../../hooks/usePrevious'

const Shine = () => {
	$.Msg('REACT-RENDER: Shine rendered')

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isSilenced, setIsSilenced] = useState(Entities.IsSilenced(selectedEntityIndex))
	const wasSilenced = usePrevious(isSilenced)
	const [isOnCooldown, setIsOnCooldown] = useState(!Abilities.IsCooldownReady(abilityEntityIndex))
	const wasOnCooldown = usePrevious(isOnCooldown)

	useInterval(() => {
		setIsSilenced(Entities.IsSilenced(selectedEntityIndex))
		setIsOnCooldown(!Abilities.IsCooldownReady(abilityEntityIndex))
	}, HUD_THINK_FAST)

	useEffect(() => {
		const showSweep =
			(isOnCooldown === false && wasOnCooldown === true && isSilenced === false) ||
			(isSilenced === false && wasSilenced === true && isOnCooldown === false)
		$(`#ability_bar_item_shine_panel_${abilityEntityIndex}`)?.SetHasClass('offCooldownShine', showSweep)
	}, [isSilenced, wasSilenced, isOnCooldown, wasOnCooldown])

	return <Panel id={`ability_bar_item_shine_panel_${abilityEntityIndex}`} />
}

export default React.memo(Shine)
