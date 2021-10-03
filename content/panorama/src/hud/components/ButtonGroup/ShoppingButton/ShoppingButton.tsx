import React, { Dispatch, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setShopVisible } from "../../../actions/shopActions";
import { RootState } from "../../../reducers/rootReducer";
import { ShopActionTypes } from "../../../types/shopTypes";
import { Styles } from "../Styles";

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

  // $.Msg("REACT-RENDER: ButtonGroup - ShoppingButton rendered");

  const { visible, setShopVisible } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button>
      <Image
        style={Styles.EntryHover(visible, isHovering)}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          setShopVisible(!visible);
          Game.EmitSound("ui_topmenu_select");
        }}
        src="s2r://panorama/images/shop_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(connector(ShoppingButton));
