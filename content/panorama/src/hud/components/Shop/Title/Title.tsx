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
  selectedUnit: EntityIndex,
};

const Title = (props: Props) => {

  $.Msg("REACT-RENDER: Shop - Title rendered");

  const { selectedUnit, setShopVisible } = props;

  return (
    <Panel className={"shopTitleContainer"}>
      <Label className={"shopTitleLabel"} text={"SHOP - " + $.Localize(Entities.GetUnitName(selectedUnit)).toUpperCase()} />
      <Button
        className="shopTitleCloseBtn"
        onactivate={() => {
          setShopVisible(false);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default connector(Title);
