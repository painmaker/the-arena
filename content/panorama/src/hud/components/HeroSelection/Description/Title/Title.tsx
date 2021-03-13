import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { resetFocusedHero } from "../../../../actions/heroSelectionActions";
import { HeroSelectionActionTypes } from "../../../../types/heroSelectionTypes";

const mapDispatchToProps = (dispatch: Dispatch<HeroSelectionActionTypes>) => ({
  resetFocusedHero: () => dispatch(resetFocusedHero()),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Title = (props: Props) => {
  return (
    <Panel className={"heroSelectionDescriptionTitleContainer"}>
      <Label className={"heroSelectionDescriptionTitleLabel"} text={"HERO DESCRIPTION"} />
      <Button
        className="heroSelectionDescriptionTitleCloseBtn"
        onactivate={() => {
          props.resetFocusedHero();
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );
};

export default connector(Title);
