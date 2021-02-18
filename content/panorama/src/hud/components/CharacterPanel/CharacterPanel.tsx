import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import ModelPanel from "./ModelPanel/ModelPanel";
import AttackPanel from "./AttackPanel/AttackPanel";
import DefensePanel from "./DefensePanel/DefensePanel";
import CloseBtn from "./CloseBtn/CloseBtn";

export const REFRESH_RATE = 250;

const mapStateToProps = (state: RootState) => ({
  visible: state.characterPanelReducer.visible,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {};

const CharacterPanel = (props: Props) => {

  const [renderComponent, setRenderComponent] = useState(true);

  useEffect(() => {
    let timer = -1;
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
    <Panel hittest={false} style={{ width: "100%", height: "100%" }} >
      { renderComponent && (
        <React.Fragment>
          <CloseBtn />
          <Panel
            style={props.visible ? { transform: 'translateX(-510px)', opacity: '1.0' } : {}}
            className={"characterPanelContainer"}
          >
            <Label className={'characterPanelMainTitleLabel'} text={'CHARACTER'} />
            <Panel style={{ width: '100%', height: '100%', flowChildren: 'right' }}>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
                <ModelPanel />
              </Panel>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
                <AttackPanel />
                <DefensePanel />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </Panel>
  );

};

export default connector(withReactTimeout(CharacterPanel));
