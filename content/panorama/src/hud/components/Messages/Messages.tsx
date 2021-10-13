import React, { useRef, useState } from 'react';
import { useGameEvent } from 'react-panorama';
import Message from './Message/Message';
import { Styles } from './Styles';

export enum MessageType {
  ABILITY = "ABILITY",
  ITEM = "ITEM",
  MODIFIER = "MODIFIER",
}

export interface Message {
  id: number,
  type: MessageType,
  data: AbilityMessageData | ItemMessageData | ModifierMessageData
}

export interface AbilityMessageData {
  broadcaster: PlayerID,
  unit: EntityIndex,
  ability: AbilityEntityIndex,
}

export interface ItemMessageData {
  broadcaster: PlayerID,
  unit: EntityIndex,
  item: ItemEntityIndex,
}

export interface ModifierMessageData {
  broadcaster: PlayerID,
  unit: EntityIndex,
  modifier: BuffID,
}

type Props = {
  // ownProps
}

const Messages = (props: Props) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const messageID = useRef(Number.MIN_SAFE_INTEGER);

  useGameEvent("on_ability_alerted", (event) => {
    messageID.current = messageID.current + 1;
    setMessages(prevState => {
      return [...prevState, {
        id: messageID.current,
        type: MessageType.ABILITY,
        data: {
          broadcaster: event.broadcaster,
          unit: event.selectedUnit,
          ability: event.ability
        }
      }]
    })
  }, []);

  useGameEvent("on_item_alerted", (event) => {
    messageID.current = messageID.current + 1;
    setMessages(prevState => {
      return [...prevState, {
        id: messageID.current,
        type: MessageType.ITEM,
        data: {
          broadcaster: event.broadcaster,
          unit: event.selectedUnit,
          item: event.item
        }
      }]
    })
  }, []);

  useGameEvent("on_modifier_alerted", (event) => {
    messageID.current = messageID.current + 1;
    setMessages(prevState => {
      return [...prevState, {
        id: messageID.current,
        type: MessageType.MODIFIER,
        data: {
          broadcaster: event.broadcaster,
          unit: event.selectedUnit,
          modifier: event.modifier
        }
      }]
    })
  }, []);

  return (
    <Panel style={Styles.Container()}>
      {messages.sort((m1, m2) => m2.id - m1.id).map(message => {
        return (
          <Message
            key={message.id}
            message={message}
            setMessages={setMessages}
          />
        )
      })}
    </Panel>
  );

}

export default Messages;
