import React, { useCallback, useContext, useMemo, useState } from 'react'
import { HUD_THINK_FAST } from '../../App'
import Styles from './styles.module.css'
import useInterval from '../../hooks/useInterval'
import SelectedEntityIndexContext from '../../context/SelectedEntityIndexContext'

const Mana = () => {
	// $.Msg("REACT-RENDER: ManaBar rendered");

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [mana, setMana] = useState(Entities.GetMana(selectedEntityIndex))
	const [maxMana, setMaxMana] = useState(Entities.GetMaxMana(selectedEntityIndex))
	const [manaRegen, setManaRegen] = useState(Entities.GetManaThinkRegen(selectedEntityIndex))

	const width = useMemo(() => {
		if (!mana || !maxMana) {
			return 0
		}
		return (mana / maxMana) * 100
	}, [mana, maxMana])

	useInterval(() => {
		setMana(Entities.GetMana(selectedEntityIndex))
		setMaxMana(Entities.GetMaxMana(selectedEntityIndex))
		setManaRegen(Entities.GetManaThinkRegen(selectedEntityIndex))
	}, HUD_THINK_FAST)

	const onClick = useCallback(() => {
		if (GameUI.IsAltDown()) {
			GameEvents.SendCustomGameEventToAllClients('on_mana_alerted', {
				broadcaster: Players.GetLocalPlayer(),
				selectedEntityIndex,
			})
		}
	}, [selectedEntityIndex])

	return (
		<Panel hittest={false} className={Styles.container} style={{ visibility: maxMana > 0 ? 'visible' : 'collapse' }}>
			<ProgressBar min={0} max={maxMana} value={mana} className='manaProgressBar' onactivate={() => onClick()}>
				<DOTAScenePanel className={Styles.scene} style={{ width: `${width}%` }} map='scenes/hud/healthbarburner' />
			</ProgressBar>
			<Label className={Styles.manaLabel} text={`${mana}/${maxMana}`} />
			<Label className={Styles.regenLabel} text={`+ ${manaRegen.toFixed(1)}`} />
		</Panel>
	)
}

export default React.memo(Mana)
