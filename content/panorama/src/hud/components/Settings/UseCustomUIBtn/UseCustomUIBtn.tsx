import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setUseCustomUI } from "../../../actions/settingsAction";
import { RootState } from "../../../reducers/rootReducer";
import { SettingsActionTypes } from "../../../types/settingsTypes";

const mapStateToProps = (state: RootState) => ({
  useCustomUI: state.settingsReducer.useCustomUI,
});

const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
  setUseCustomUI: (visible: boolean) => dispatch(setUseCustomUI(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const UseCustomUIBtn = (props: Props) => {
  return (
    <Panel className={'settingsItem'}>
      <Label className={'useCustomUIBtnLeftLabel'} text={"Use Custom UI:"} />
      <Panel className={'useCustomUIBtnPanel'}>
        <ToggleButton
          selected={props.useCustomUI}
          onactivate={() => props.setUseCustomUI(!props.useCustomUI)}
        />
      </Panel>
      <Label className={'useCustomUIBtnRightLabel'} text={props.useCustomUI ? "Yes" : "No"} />
    </Panel>
  );
}

export default connector(UseCustomUIBtn);