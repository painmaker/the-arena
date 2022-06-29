import React, { useContext, useMemo, useState } from 'react'
import { AbilityEntityIndexContext } from '../../../../context/AbilityEntityIndexContext'
import { SelectedEntityIndexContext } from '../../../../context/SelectedEntityIndexContext'
import Styles from './styles.module.css'
import Autocast from './Autocast/Autocast'
import CastPointOverlay from './CastPointOverlay/CastPointOverlay'
import Cooldown from './Cooldown/Cooldown'
import Keybind from './Keybind/Keybind'
import LockoutIcon from './LockoutIcon/LockoutIcon'
import ManaCost from './ManaCost/ManaCost'
import Shine from './Shine/Shine'
import Image from './Image/Image'
import { HUD_THINK_FAST } from '../../../../App'
import useInterval from '../../../../hooks/useInterval'

const onLeftClick = (selectedEntityIndex: EntityIndex, abilityEntityIndex: AbilityEntityIndex) => {
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
}

const onRightClick = (abilityEntityIndex: AbilityEntityIndex) => {
	if (Game.IsInAbilityLearnMode()) {
		return
	}
	if (Abilities.IsAutocast(abilityEntityIndex)) {
		Game.PrepareUnitOrders({
			OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
			AbilityIndex: abilityEntityIndex,
		})
	}
}

const onMouseOut = (panel: Panel) => {
	$.DispatchEvent('DOTAHideAbilityTooltip', panel)
}

const onMouseOver = (panel: Panel, selectedEntityIndex: EntityIndex, abilityEntityIndex: AbilityEntityIndex) => {
	$.DispatchEvent('DOTAShowAbilityTooltipForEntityIndex', panel, Abilities.GetAbilityName(abilityEntityIndex), selectedEntityIndex)
}

const getBackgroundImage = (isTrainable: boolean, isPassive: boolean) => {
	if (isTrainable) {
		return 'url("s2r://panorama/images/ability_gold_background_dark_png.vtex")'
	}
	if (isPassive) {
		return 'url("s2r://panorama/images/hud/passive_ability_border_png.vtex")'
	}
	return 'url("s2r://panorama/images/hud/active_ability_border_png.vtex")'
}

const getForegroundColor = (isActive: boolean, isToggled: boolean, isAutoCastEnabled: boolean) => {
	if (isActive) {
		return 'rgba(255, 255, 255, 0.5)'
	}
	if (isToggled || isAutoCastEnabled) {
		return 'rgba(255, 165, 150, 0.5)'
	}
	return 'black'
}

const Ability = () => {
	$.Msg('REACT-RENDER: Ability rendered')
	const { abilityEntityIndex } = useContext(AbilityEntityIndexContext)
	const { selectedEntityIndex } = useContext(SelectedEntityIndexContext)

	const [isPassive, setIsPassive] = useState(Abilities.IsPassive(abilityEntityIndex))
	const [isAutoCastEnabled, setIsAutoCastEnabled] = useState(Abilities.GetAutoCastState(abilityEntityIndex))
	const [isToggled, setIsToggled] = useState(Abilities.GetToggleState(abilityEntityIndex))
	const [isActive, setIsActive] = useState(Abilities.GetLocalPlayerActiveAbility() === abilityEntityIndex)
	const [isTrainable, setIsTrainable] = useState(false)

	const backgroundStyle = useMemo(
		() => ({
			border: isTrainable ? '1px solid rgba(0, 0, 0, 0.8)' : '0px solid rgba(0, 0, 0, 0.0)',
			backgroundImage: getBackgroundImage(isTrainable, isPassive),
		}),
		[isTrainable, isPassive],
	)

	const foregroundStyle = useMemo(
		() => ({
			margin: isPassive && !isTrainable ? '2px' : '4px',
			padding: isActive || isToggled || isAutoCastEnabled ? '1.5px' : '0px',
			backgroundColor: getForegroundColor(isActive, isToggled, isAutoCastEnabled),
		}),
		[isPassive, isTrainable, isActive, isToggled, isAutoCastEnabled],
	)

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

	return (
		<Panel
			onactivate={() => onLeftClick(selectedEntityIndex, abilityEntityIndex)}
			oncontextmenu={() => onRightClick(abilityEntityIndex)}
			onmouseover={panel => onMouseOver(panel, selectedEntityIndex, abilityEntityIndex)}
			onmouseout={panel => onMouseOut(panel)}
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
	)
}

export default Ability
