import React, { useContext, useEffect, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../../App'
import { AbilityEntityIndexContext } from '../../../../../context/AbilityEntityIndexContext'
import useInterval from '../../../../../hooks/useInterval'
import Styles from './styles.module.css'

const cpFix = 0.1

const CastPointOverlay = () => {
	$.Msg('REACT-RENDER: CastPointOveraly rendered')

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
		const newCastPoint = Math.max(cpFix, Abilities.GetCastPoint(abilityEntityIndex) - cpFix)
		if (endTime !== undefined) {
			const gameTimeDifference = Math.min(endTime, endTime - Game.GetGameTime())
			const newDegree = 360 - Math.floor((gameTimeDifference / newCastPoint) * 360)
			setDegree(Number.isFinite(newDegree) && !Number.isNaN(newDegree) ? newDegree : 0)
		} else {
			setDegree(0)
		}
		setIsInAbilityPhase(Abilities.IsInAbilityPhase(abilityEntityIndex))
		setCastPoint(newCastPoint)
	}, HUD_THINK_FAST)

	if (degree === 0) {
		return null
	}

	return <Panel className={Styles.container} style={{ clip: `radial(50% 50%, 360deg, ${-degree}deg)` }} />
}

export default CastPointOverlay
