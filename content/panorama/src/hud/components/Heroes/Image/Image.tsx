import React, { useState } from 'react'
import { HUD_THINK_FAST } from '../../../App'
import useGameEvent from '../../../hooks/useGameEvent'
import { useInterval } from '../../../hooks/useInterval'
import Styles from './styles.module.css'

type Props = {
	heroEntityIndex: EntityIndex
}

const onHeroImageClicked = (heroEntityIndex: EntityIndex, isCameraLocked: boolean) => {
	const isAlive = Entities.IsAlive(heroEntityIndex)
	const issSelectable = Entities.IsSelectable(heroEntityIndex)
	const clickbehaviors = GameUI.GetClickBehaviors()

	if (!isAlive) {
		GameUI.SendCustomHUDError('Target Is Dead', 'General.InvalidTarget_Invulnerable')
		return
	}

	if (!issSelectable) {
		GameUI.SendCustomHUDError('Target Is Unselectable', 'General.InvalidTarget_Invulnerable')
		return
	}

	if (clickbehaviors === CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST) {
		if (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
			const order = {
				AbilityIndex: Abilities.GetLocalPlayerActiveAbility(),
				QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER,
				ShowEffects: true,
				OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET,
				TargetIndex: heroEntityIndex,
			}
			Game.PrepareUnitOrders(order)
		}
	} else {
		if (isCameraLocked) {
			GameUI.SendCustomHUDError('Camera Is Locked', 'General.InvalidTarget_Invulnerable')
			return
		}
		GameUI.SetCameraTargetPosition(Entities.GetAbsOrigin(heroEntityIndex), 0.3)
		Game.EmitSound('ui_topmenu_select')
	}
}

const ImageImpl = (props: Props) => {
	// $.Msg("REACT-RENDER: Heroes - HeroImage rendered");

	const { heroEntityIndex } = props

	const [isCameraLocked, setIsCameraLocked] = useState(true)
	const [washColor, setWashColor] = useState('none')
	const [isDisconnected, setIsDisconnected] = useState(false)

	useGameEvent(
		'set_is_camera_locked',
		event => {
			setIsCameraLocked(event.isLocked !== 0)
		},
		[],
	)

	useGameEvent(
		'entity_killed',
		event => {
			if (event.entindex_killed === heroEntityIndex && !isDisconnected) {
				setWashColor('grey')
			}
		},
		[],
	)

	useGameEvent(
		'npc_spawned',
		event => {
			if (event.entindex === heroEntityIndex && !isDisconnected) {
				setWashColor('none')
			}
		},
		[],
	)

	useInterval(() => {
		const playerInfo = Game.GetPlayerInfo(Entities.GetPlayerOwnerID(heroEntityIndex))
		if (playerInfo) {
			const hasDisconnectedConnectionState =
				playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED ||
				playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED ||
				playerInfo.player_connection_state === DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED
			setIsDisconnected(hasDisconnectedConnectionState)
			if (hasDisconnectedConnectionState) {
				setWashColor('grey')
			}
		}
	}, HUD_THINK_FAST)

	return (
		<Panel className={Styles.container}>
			{isDisconnected && <Image src='s2r://panorama/images/hud/reborn/icon_disconnect_png.vtex' className={Styles.disconnected} />}
			<DOTAHeroImage
				heroname={Entities.GetUnitName(heroEntityIndex)}
				heroimagestyle='landscape'
				onactivate={() => onHeroImageClicked(heroEntityIndex, isCameraLocked)}
				oncontextmenu={() => onHeroImageClicked(heroEntityIndex, isCameraLocked)}
				className={Styles.image}
				style={{ washColor }}
			/>
		</Panel>
	)
}

export default React.memo(ImageImpl)
