import React, { useContext, useState } from 'react'
import { HUD_THINK_FAST } from '../../../../App'
import AbilityEntityIndexContext from '../../../../context/AbilityEntityIndexContext'
import { useInterval } from '../../../../hooks/useInterval'
import Styles from './styles.module.css'

const Autocast = () => {
	// $.Msg("REACT-RENDER: AbilityBarItem - Autocast rendered");

	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)

	const [show, setShow] = useState(false)

	useInterval(() => {
		setShow(Abilities.GetAutoCastState(abilityEntityIndex) || Abilities.GetToggleState(abilityEntityIndex))
	}, HUD_THINK_FAST)

	if (!show) {
		return null
	}

	return (
		<Panel className={Styles.container}>
			<DOTAScenePanel map='scenes/hud/autocasting' className={Styles.scene} />
		</Panel>
	)
}

export default React.memo(Autocast)
