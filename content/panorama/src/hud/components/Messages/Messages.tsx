import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import useGameEvent from '../../hooks/useGameEvent'
import Message from './Message/Message'
import Styles from './styles.module.css'

export enum MessageType {
	ABILITY = 'ABILITY',
	ITEM = 'ITEM',
	MODIFIER = 'MODIFIER',
	HEALTH = 'HEALTH',
	MANA = 'MANA',
}

export interface IMessage {
	id: number
	type: MessageType
	data: IAbilityMessageData | IItemMessageData | IModifierMessageData | IHealthMessageData | IManaMessageData
}

export interface IAbilityMessageData {
	broadcaster: PlayerID
	unit: EntityIndex
	ability: AbilityEntityIndex
}

export interface IItemMessageData {
	broadcaster: PlayerID
	unit: EntityIndex
	item: ItemEntityIndex
}

export interface IModifierMessageData {
	broadcaster: PlayerID
	unit: EntityIndex
	modifier: BuffID
}
export interface IHealthMessageData {
	broadcaster: PlayerID
	unit: EntityIndex
}
export interface IManaMessageData {
	broadcaster: PlayerID
	unit: EntityIndex
}

export const SetMessagesContext = React.createContext<Dispatch<SetStateAction<IMessage[]>>>(() => {})

const Messages = () => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const messageID = useRef(Number.MIN_SAFE_INTEGER)

	useGameEvent(
		'on_ability_alerted',
		event => {
			if (Game.IsPlayerMuted(event.broadcaster)) {
				return
			}
			messageID.current += 1
			setMessages(prevState => {
				return [
					...prevState,
					{
						id: messageID.current,
						type: MessageType.ABILITY,
						data: {
							broadcaster: event.broadcaster,
							unit: event.selectedEntityIndex,
							ability: event.ability,
						},
					},
				]
			})
			Game.EmitSound('ui_chat_msg_rec')
		},
		[],
	)

	useGameEvent(
		'on_item_alerted',
		event => {
			if (Game.IsPlayerMuted(event.broadcaster)) {
				return
			}
			messageID.current += 1
			setMessages(prevState => {
				return [
					...prevState,
					{
						id: messageID.current,
						type: MessageType.ITEM,
						data: {
							broadcaster: event.broadcaster,
							unit: event.selectedEntityIndex,
							item: event.item,
						},
					},
				]
			})
			Game.EmitSound('ui_chat_msg_rec')
		},
		[],
	)

	useGameEvent(
		'on_modifier_alerted',
		event => {
			if (Game.IsPlayerMuted(event.broadcaster)) {
				return
			}
			messageID.current += 1
			setMessages(prevState => {
				return [
					...prevState,
					{
						id: messageID.current,
						type: MessageType.MODIFIER,
						data: {
							broadcaster: event.broadcaster,
							unit: event.selectedEntityIndex,
							modifier: event.modifier,
						},
					},
				]
			})
			Game.EmitSound('ui_chat_msg_rec')
		},
		[],
	)

	useGameEvent(
		'on_health_alerted',
		event => {
			if (Game.IsPlayerMuted(event.broadcaster)) {
				return
			}
			messageID.current += 1
			setMessages(prevState => {
				return [
					...prevState,
					{
						id: messageID.current,
						type: MessageType.HEALTH,
						data: {
							broadcaster: event.broadcaster,
							unit: event.selectedEntityIndex,
						},
					},
				]
			})
			Game.EmitSound('ui_chat_msg_rec')
		},
		[],
	)

	useGameEvent(
		'on_mana_alerted',
		event => {
			if (Game.IsPlayerMuted(event.broadcaster)) {
				return
			}
			messageID.current += 1
			setMessages(prevState => {
				return [
					...prevState,
					{
						id: messageID.current,
						type: MessageType.MANA,
						data: {
							broadcaster: event.broadcaster,
							unit: event.selectedEntityIndex,
						},
					},
				]
			})
			Game.EmitSound('ui_chat_msg_rec')
		},
		[],
	)

	return (
		<Panel className={Styles.container} hittest={false}>
			<SetMessagesContext.Provider value={setMessages}>
				{messages
					.sort((m1, m2) => m2.id - m1.id)
					.map(message => {
						return <Message key={message.id} message={message} />
					})}
			</SetMessagesContext.Provider>
		</Panel>
	)
}

export default Messages
