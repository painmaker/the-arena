import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setShopVisible } from "../../../actions/shopActions";
import { ShopActionTypes } from "../../../types/shopTypes";

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setShopVisible(visible)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const Title = (props: Props) => {
  return (
    <Panel className={"shopTitleContainer"}>
      <Label className={"shopTitleLabel"} text={"SHOP"} />
      <Button
        className="shopTitleCloseBtn"
        onactivate={() => {
          props.setShopVisible(false);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );
};

export default connector(Title);
