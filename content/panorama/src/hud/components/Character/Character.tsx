import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import HeroModel from "./HeroModel/HeroModel";
import Attack from "./Attack/Attack";
import Defense from "./Defense/Defense";
import CloseBtn from "./CloseBtn/CloseBtn";
import { Timer } from "react-timeout";

export const REFRESH_RATE = 250;

const mapStateToProps = (state: RootState) => ({
  visible: state.characterReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const Character = (props: Props) => {

  $.Msg("REACT-RENDER: Character rendered");

  const { visible, setTimeout, clearTimeout } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    let timer = -1 as Timer;
    if (visible === false) {
      timer = setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => clearTimeout(timer);
  }, [visible, setTimeout, clearTimeout]);

  return (
    <React.Fragment>
      {renderComponent && (
        <React.Fragment>
          <Panel className={"characterPanelContainer"} style={visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}>
            <Panel className={'characterTitleContainer'}>
              <Label className={'characterTitleLabel'} text={'CHARACTER'} />
              <CloseBtn />
            </Panel>
            <Panel style={{ width: '100%', height: '100%', flowChildren: 'right' }}>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
                <HeroModel />
              </Panel>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
                <Attack />
                <Defense />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </React.Fragment>
  );

};

export default connector(withReactTimeout(Character));
