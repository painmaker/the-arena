import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setShopVisible } from "../../../actions/shopActions";
import { RootState } from "../../../reducers/rootReducer";
import { ShopActionTypes } from "../../../types/shopTypes";
import ParentStyles from './../styles.module.css';

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

  return (
    <Button
      id={'item_shopping_btn'}
      className={ParentStyles.btn}
      onactivate={() => {
        $('#item_shopping_btn').RemoveClass('btnClicked');
        $('#item_shopping_btn').AddClass('btnClicked');
        setShopVisible(!visible);
        Game.EmitSound("ui_topmenu_select");
      }}
    >
      <Image
        style={{ washColor: visible ? 'orange' : 'white' }}
        src="s2r://panorama/images/shop_btn_white_png.vtex"
      />
    </Button>
  );

};

export default React.memo(connector(ShoppingButton));
