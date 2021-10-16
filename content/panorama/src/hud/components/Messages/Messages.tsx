import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useGameEvent } from 'react-panorama';
import Message from './Message/Message';
import { Styles } from './Styles';

export enum MessageType {
  ABILITY = "ABILITY",
  ITEM = "ITEM",
  MODIFIER = "MODIFIER",
  HEALTH = "HEALTH",
}

export interface Message {
  id: number,
  type: MessageType,
  data: AbilityMessageData | ItemMessageData | ModifierMessageData | HealthMessageData
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
export interface HealthMessageData {
  broadcaster: PlayerID,
  unit: EntityIndex,
}

export const SetMessagesContext = React.createContext<Dispatch<SetStateAction<Message[]>>>(() => { });

const Messages = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const messageID = useRef(Number.MIN_SAFE_INTEGER);

  useGameEvent("on_ability_alerted", (event) => {
    if (Game.IsPlayerMuted(event.broadcaster)) {
      return;
    }
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
    });
  }, []);

  useGameEvent("on_item_alerted", (event) => {
    if (Game.IsPlayerMuted(event.broadcaster)) {
      return;
    }
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
    if (Game.IsPlayerMuted(event.broadcaster)) {
      return;
    }
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

  useGameEvent("on_health_alerted", (event) => {
    if (Game.IsPlayerMuted(event.broadcaster)) {
      return;
    }
    messageID.current = messageID.current + 1;
    setMessages(prevState => {
      return [...prevState, {
        id: messageID.current,
        type: MessageType.HEALTH,
        data: {
          broadcaster: event.broadcaster,
          unit: event.selectedUnit,
        }
      }]
    })
  }, []);

  return (
    <Panel style={Styles.Container()}>
      <SetMessagesContext.Provider value={setMessages}>
        {messages.sort((m1, m2) => m2.id - m1.id).map(message => {
          return (
            <Message
              key={message.id}
              message={message}
            />
          )
        })}
      </SetMessagesContext.Provider>
    </Panel>
  );

}

export default Messages;
