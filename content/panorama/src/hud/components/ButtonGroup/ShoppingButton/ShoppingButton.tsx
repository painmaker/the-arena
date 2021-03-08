import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setShopVisible } from "../../../actions/shopActions";
import { RootState } from "../../../reducers/rootReducer";
import { ShopActionTypes } from "../../../types/shopTypes";

const mapStateToProps = (state: RootState) => ({
  visible: state.shopReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const ShoppingButton = (props: Props) => {
  return (
    <Panel hittest={false}>
      <Button>
        <Image
          style={{ washColor: props.visible ? 'orange' : 'white' }}
          onactivate={() => {
            props.setShopVisible(!props.visible);
            Game.EmitSound("ui_topmenu_select");
          }}
          src="s2r://panorama/images/shop_btn_white_png.vtex"
        />
      </Button>
    </Panel>
  );
};

export default connector(ShoppingButton);
