import React, { useCallback, useContext, useState } from 'react'
import Cooldown from './Cooldown/Cooldown'
import Autocast from './Autocast/Autocast'
import LockoutIcon from './LockoutIcon/LockoutIcon'
import Skillpoints from './Skillpoints/Skillpoints'
import ManaCost from './ManaCost/ManaCost'
import Keybind from './Keybind/Keybind'
import Image from './Image/Image'
import LevelUpButton from './LevelUpButton/LevelUpButton'
import CastPointOverlay from './CastPointOverlay/CastPointOverlay'
import { HUD_THINK_FAST } from '../../../App'
import { useInterval } from '../../../hooks/useInterval'
import Styles from './styles.module.css'
import Shine from './Shine/Shine'
import SelectedEntityIndexContext from '../../../context/SelectedEntityIndexContext'
import AbilityEntityIndexContext from '../../../context/AbilityEntityIndexContext'

type Props = {
	abilityEntityIndex: AbilityEntityIndex
}

const AbilityBarItem = (props: Props) => {
	// $.Msg("REACT-RENDER: AbilityBar - AbilityBarItem rendered");

	const { abilityEntityIndex } = props

	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isPassive, setIsPassive] = useState(Abilities.IsPassive(abilityEntityIndex))
	const [isAutoCastEnabled, setIsAutoCastEnabled] = useState(Abilities.GetAutoCastState(abilityEntityIndex))
	const [isToggled, setIsToggled] = useState(Abilities.GetToggleState(abilityEntityIndex))
	const [isActive, setIsActive] = useState(Abilities.GetLocalPlayerActiveAbility() === abilityEntityIndex)
	const [isTrainable, setIsTrainable] = useState(false)

	useInterval(() => {
		const isUpgradeable = Abilities.CanAbilityBeUpgraded(abilityEntityIndex) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED
		const isControllable = Entities.IsControllableByPlayer(selectedEntityIndex, Players.GetLocalPlayer())
		const hasAbilityPoints = Entities.GetAbilityPoints(selectedEntityIndex) > 0
		const isInLearningMode = Game.IsInAbilityLearnMode()
		setIsTrainable(isInLearningMode && isUpgradeable && isControllable && hasAbilityPoints)
		setIsPassive(Abilities.IsPassive(abilityEntityIndex))
		setIsAutoCastEnabled(Abilities.GetAutoCastState(abilityEntityIndex))
		setIsToggled(Abilities.GetToggleState(abilityEntityIndex))
		setIsActive(Abilities.GetLocalPlayerActiveAbility() === abilityEntityIndex)
	}, HUD_THINK_FAST)

	const onLeftClick = useCallback(() => {
		if (GameUI.IsAltDown()) {
			GameEvents.SendCustomGameEventToAllClients('on_ability_alerted', {
				broadcaster: Players.GetLocalPlayer(),
				selectedEntityIndex,
				ability: abilityEntityIndex,
			})
			return
		}
		if (Game.IsInAbilityLearnMode()) {
			Abilities.AttemptToUpgrade(abilityEntityIndex)
			return
		}
		if (Entities.IsStunned(selectedEntityIndex) || Entities.IsCommandRestricted(selectedEntityIndex)) {
			Game.EmitSound('General.CastFail_Custom')
			return
		}
		if (Entities.IsSilenced(selectedEntityIndex)) {
			Game.EmitSound('General.CastFail_Silenced')
			return
		}
		Abilities.ExecuteAbility(abilityEntityIndex, selectedEntityIndex, false)
	}, [abilityEntityIndex, selectedEntityIndex])

	const onRightClick = useCallback(() => {
		if (Game.IsInAbilityLearnMode()) {
			return
		}
		if (Abilities.IsAutocast(abilityEntityIndex)) {
			Game.PrepareUnitOrders({
				OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
				AbilityIndex: abilityEntityIndex,
			})
		}
	}, [abilityEntityIndex])

	const getContainerBackgroundImage = useCallback(() => {
		if (isTrainable) {
			return 'url("s2r://panorama/images/ability_gold_background_dark_png.vtex")'
		}
		if (isPassive) {
			return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")'
		}
		return 'url("s2r://panorama/images/hud/active_ability_border_png.vtex")'
	}, [isTrainable, isPassive])

	const onMouseOut = useCallback(() => {
		$.DispatchEvent('DOTAHideAbilityTooltip', $(`#ability_${abilityEntityIndex}`))
	}, [abilityEntityIndex])

	const onMouseOver = useCallback(() => {
		$.DispatchEvent(
			'DOTAShowAbilityTooltipForEntityIndex',
			$(`#ability_${abilityEntityIndex}`),
			Abilities.GetAbilityName(abilityEntityIndex),
			selectedEntityIndex,
		)
	}, [abilityEntityIndex, selectedEntityIndex])

	const backgroundStyle = {
		border: isTrainable ? '1px solid rgba(0, 0, 0, 0.8)' : '0px solid rgba(0, 0, 0, 0.0)',
		backgroundImage: getContainerBackgroundImage(),
	}

	const foregroundStyle = {
		margin: isPassive && !isTrainable ? '2px' : '4px',
		padding: isActive || isToggled || isAutoCastEnabled ? '1.5px' : '0px',
		backgroundColor: isActive ? 'rgba(255, 255, 255, 0.5)' : isToggled || isAutoCastEnabled ? 'rgba(255, 165, 150, 0.5)' : 'black',
	}

	return (
		<Panel className={Styles.container} id={`ability_${abilityEntityIndex}`}>
			<AbilityEntityIndexContext.Provider value={{ abilityEntityIndex }}>
				<LevelUpButton />
				<Panel
					onactivate={() => onLeftClick()}
					oncontextmenu={() => onRightClick()}
					onmouseover={() => onMouseOver()}
					onmouseout={() => onMouseOut()}
					className={Styles.background}
					style={backgroundStyle}
				>
					<Keybind />
					<ManaCost />
					<Panel className={Styles.foreground} style={foregroundStyle}>
						<Shine />
						<Image />
						<Cooldown />
						<Autocast />
						<LockoutIcon />
						<CastPointOverlay />
					</Panel>
				</Panel>
				<Skillpoints />
			</AbilityEntityIndexContext.Provider>
		</Panel>
	)
}

export default React.memo(AbilityBarItem)
