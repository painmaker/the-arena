import React, { useEffect, useState } from 'react';
import withReactTimeout, { ReactTimeoutProps } from '../../../hoc/ReactTimeout';
import { Message } from '../../../types/chatTypes';
import { toColor } from '../../../utils/Color';
import { getHudElement } from '../../../utils/HudElements';

type Props = ReactTimeoutProps & {
  message: Message,
}

const ChatMessage = (props: Props) => {

  const [opacity, setOpacity] = useState('1');
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const id = props.setInterval(() => {
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
    }, 100);
    return () => props.clearInterval(id);
  }, []);

  useEffect(() => {
    const opacityTimeoutID = props.setTimeout(() => {
      setOpacity('0');
    }, 10000);
    return () => props.clearTimeout(opacityTimeoutID);
  }, []);

  return (
    <Panel
      style={{
        transitionProperty: 'opacity',
        transitionDuration: isChatActive ? '0s' : '0.25s',
        transitionTimingFunction: 'ease-in-out',
        opacity: isChatActive ? '1.0' : opacity,
        width: '100%',
        paddingTop: '4px',
        flowChildren: 'right',
        transform: 'scaleY(-1)'
      }}
    >
      { props.message.heroname && (
        <DOTAHeroImage
          heroname={props.message.heroname}
          heroimagestyle={'icon'}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '2px',
            verticalAlign: 'top',
            horizontalAlign: 'center',
          }}
        />
      )}
      { props.message.playername && (
        <Label
          text={props.message.playername + ': '}
          style={{
            textShadow: '1px 1px 3px 3.0 black',
            fontSize: '18px',
            color: toColor(props.message.playerid),
            verticalAlign: 'top',
            fontFamily: 'Radiance, FZLanTingHei-R-GBK, TH Sarabun New, YDYGO 540, Gulim, MingLiU',
          }}
        />
      )}
      {props.message.playerid === -1 && (
        <Label
          className={'chatMessageSystemText'}
          text={'[SYSTEM]:'}
        />
      )}
      <Label className={'chatMessageText'} text={props.message.text} />
    </Panel>
  );

}

export default withReactTimeout(ChatMessage);
