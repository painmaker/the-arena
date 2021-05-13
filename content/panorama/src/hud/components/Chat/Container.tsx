import React, { useEffect, useState } from "react";
import { useNetTableValues } from "react-panorama";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { getHudElement } from "../../utils/HudElements";

type Props = ReactTimeoutProps & {
  children?: React.ReactNode,
}

const Container = (props: Props) => {

  const [isChatActive, setIsChatActive] = useState(false);

  const heroes = useNetTableValues('HeroSelectionHeroes').heroes;
  const hasPickedHero = Object.values(heroes).find(hero => hero.playerID === Players.GetLocalPlayer())?.picked === 1;

  useEffect(() => {
    const id = props.setInterval(() => {
      const isActive = getHudElement('HudChat')?.BHasClass('Active');
      setIsChatActive(isActive !== undefined ? isActive : false);
    }, 50);
    return () => props.clearInterval(id);
  }, []);

  return (
    <Panel
      style={{
        width: hasPickedHero ? '465px' : '565px',
        height: '290px',
        flowChildren: 'down',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        marginBottom: hasPickedHero ? '414px' : '264px',
        marginLeft: hasPickedHero ? '10px' : '75px',
        padding: '10px',
        backgroundColor: isChatActive ? 'rgba(0, 0, 0, 0.7)' : 'none',
        borderRadius: '0px 0px 5px 5px',
        transform: 'scaleY(-1)',
        overflow: 'clip',
        zIndex: 10,
      }}>
      {props.children}
    </Panel>
  );

}

export default withReactTimeout(Container);