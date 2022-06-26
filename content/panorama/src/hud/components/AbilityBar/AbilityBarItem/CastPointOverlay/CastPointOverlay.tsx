import React, { useContext, useEffect, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import AbilityEntityIndexContext from '../../../../context/AbilityEntityIndexContext'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const cpFix = 0.1

function CastPointOverlay() {
	// $.Msg("REACT-RENDER: AbilityBarItem - CastPointOveraly rendered");

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)

	const [castPoint, setCastPoint] = useState(Math.max(cpFix, Abilities.GetCastPoint(abilityEntityIndex) - cpFix))
	const [isInAbilityPhase, setIsInAbilityPhase] = useState(Abilities.IsInAbilityPhase(abilityEntityIndex))
	const [endTime, setEndTime] = useState<number | undefined>(undefined)

	const [degree, setDegree] = useState(0)

	useEffect(() => {
		if (isInAbilityPhase) {
			setEndTime(Game.GetGameTime() + castPoint)
		} else {
			setEndTime(undefined)
		}
	}, [isInAbilityPhase, castPoint])

	useInterval(() => {
		const castPoint = Math.max(cpFix, Abilities.GetCastPoint(abilityEntityIndex) - cpFix)
		if (endTime !== undefined) {
			const gameTimeDifference = Math.min(endTime, endTime - Game.GetGameTime())
			const degree = 360 - Math.floor((gameTimeDifference / castPoint) * 360)
			setDegree(Number.isFinite(degree) && !Number.isNaN(degree) ? degree : 0)
		} else {
			setDegree(0)
		}
		setIsInAbilityPhase(Abilities.IsInAbilityPhase(abilityEntityIndex))
		setCastPoint(castPoint)
	}, HUD_THINK_FAST)

	if (degree === 0) {
		return null
	}

	return <Panel className={Styles.container} style={{ clip: `radial(50% 50%, 360deg, ${-degree}deg)` }} />
}

export default React.memo(CastPointOverlay)
