import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import withReactTimeout, { ReactTimeoutProps } from "../../hoc/ReactTimeout";
import { Timer } from "react-timeout";
import Title from "./Title/Title";
import Gold from "./Gold/Gold";
import Search from "./Search/Search";
import Consumables from "./Consumables/Consumables";
import Armor from "./Armor/Armor";
import Weapons from "./Weapons/Weapons";
import Artifacts from "./Artifacts/Artifacts";
import { useGameEvent } from "react-panorama";
import { setShopVisible } from "../../actions/shopActions";
import { ShopActionTypes } from "../../types/shopTypes";
import { useSelectedUnit } from "../../hooks/useSelectedUnit";

const mapStateToProps = (state: RootState) => ({
  visible: state.shopReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  setShopVisible: (visible: boolean) => dispatch(setShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & ReactTimeoutProps & {
  // ownProps
};

const Shop = (props: Props) => {

  $.Msg("REACT-RENDER: Shop rendered");

  const selectedUnit = useSelectedUnit();
  const [renderComponent, setRenderComponent] = useState(false);

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
      {renderComponent && (
        <React.Fragment>
          <Panel
            className={"shopContainer"}
            style={props.visible ? { transform: 'translateX(-10px)', opacity: '1.0' } : {}}
          >
            <Title selectedUnit={selectedUnit} />
            <Panel className={'shopTopBarContainer'}>
              <Search />
              <Gold selectedUnit={selectedUnit} />
            </Panel>
            <Panel className={'shopItemsContainer'}>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
                <Consumables selectedUnit={selectedUnit} />
                <Artifacts selectedUnit={selectedUnit} />
              </Panel>
              <Panel style={{ width: '50%', height: '100%', flowChildren: 'down' }}>
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

export default connector(withReactTimeout(Shop));
