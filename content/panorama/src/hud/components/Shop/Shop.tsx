import React, { Dispatch, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import Title from "./Title/Title";
import Gold from "./Gold/Gold";
import Search from "./Search/Search";
import Consumables from "./Consumables/Consumables";
import Armor from "./Armor/Armor";
import Weapons from "./Weapons/Weapons";
import Artifacts from "./Artifacts/Artifacts";
import { setShopVisible } from "../../actions/shopActions";
import { ShopActionTypes } from "../../types/shopTypes";
import { HUD_THINK_SLOW } from "../../App";
import { useTimeout } from "../../hooks/useTimeout";
import { useRegisterForUnhandledEvent } from "react-panorama";
import Styles from './shop.module.css';

const mapStateToProps = (state: RootState) => ({
  visible: state.shopReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  selectedUnit: EntityIndex,
};

const Shop = (props: Props) => {

  // $.Msg("REACT-RENDER: Shop rendered");

  const { selectedUnit, visible, setShopVisible } = props;

  const [renderComponent, setRenderComponent] = useState(false);

  useTimeout(() => {
    setRenderComponent(visible);
  }, visible === false ? HUD_THINK_SLOW : 0);

  useRegisterForUnhandledEvent('Cancelled', () => {
    if (visible) {
      Game.EmitSound("ui_topmenu_select");
    }
    setShopVisible(false);
  }, [visible, setShopVisible]);

  return (
    <React.Fragment>
      {renderComponent && (
        <React.Fragment>
          <Panel
            className={Styles.container}
            style={visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
          >
            <Title selectedUnit={selectedUnit} />
            <Panel className={Styles.topBarContainer}>
              <Search />
              <Gold selectedUnit={selectedUnit} />
            </Panel>
            <Panel className={Styles.itemsContainer}>
              <Panel className={Styles.itemsColumn}>
                <Consumables selectedUnit={selectedUnit} />
                <Artifacts selectedUnit={selectedUnit} />
              </Panel>
              <Panel className={Styles.itemsColumn}>
                <Armor selectedUnit={selectedUnit} />
                <Weapons selectedUnit={selectedUnit} />
              </Panel>
            </Panel>
          </Panel>
        </React.Fragment>
      )}
    </React.Fragment>
  );

};

export default connector(Shop);
