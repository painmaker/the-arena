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
  visible: state.characterPanelReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {};

const Character = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(true);

  useEffect(() => {
    let timer = -1 as Timer;
    if (props.visible === false) {
      timer = props.setTimeout(() => {
        setRenderComponent(false);
      }, 1000);
    } else {
      setRenderComponent(true);
    }
    return () => props.clearTimeout(timer);
  }, [props.visible]);

  return (
    <React.Fragment>
      { renderComponent && (
        <React.Fragment>
          <CloseBtn />
          <Panel className={"characterPanelContainer"} style={props.visible ? { transform: 'translateX(-510px)', opacity: '1.0' } : {}}>
            <Label className={'characterPanelMainTitleLabel'} text={'CHARACTER'} />
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