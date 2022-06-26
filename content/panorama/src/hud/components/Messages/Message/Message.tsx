import React, { useContext, useState } from 'react'
import {
	IMessage,
	IAbilityMessageData,
	MessageType,
	IItemMessageData,
	IModifierMessageData,
	SetMessagesContext,
	IHealthMessageData,
	IManaMessageData,
} from '../Messages'
import Styles from './styles.module.css'
import AbilityMessage from './AbilityMessage/AbilityMessage'
import ItemMessage from './ItemMessage/ItemMessage'
import ModifierMessage from './ModifierMessage/ModifierMessage'
import { useTimeout } from '../../../hooks/useTimeout'
import HealthMessage from './HealthMessage/HealthMessage'
import ManaMessage from './ManaMessage/ManaMessage'

type Props = {
	message: IMessage
}

const Message = (props: Props) => {
	const { message } = props
	const { id, type, data } = message

	const setMessages = useContext(SetMessagesContext)

	const [opacity, setOpacity] = useState('1.0')

	useTimeout(() => {
		setMessages(prevState => prevState.filter(msg => msg.id !== id))
	}, 5.6)

	useTimeout(() => {
		setOpacity('0.0')
	}, 5.0)

	return (
		<Panel className={Styles.container} style={{ opacity }}>
			{type === MessageType.ABILITY && <AbilityMessage data={data as IAbilityMessageData} />}
			{type === MessageType.ITEM && <ItemMessage data={data as IItemMessageData} />}
			{type === MessageType.MODIFIER && <ModifierMessage data={data as IModifierMessageData} />}
			{type === MessageType.HEALTH && <HealthMessage data={data as IHealthMessageData} />}
			{type === MessageType.MANA && <ManaMessage data={data as IManaMessageData} />}
		</Panel>
	)
}

export default React.memo(Message)
