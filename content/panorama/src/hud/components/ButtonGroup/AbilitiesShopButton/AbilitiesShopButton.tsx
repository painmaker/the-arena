import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setAbilitiesShopVisible } from "../../../actions/abilitiesShopActions";
import { RootState } from "../../../reducers/rootReducer";
import { AbilitiesShopTypes } from "../../../types/abilitiesShopTypes";
import { Styles } from "../Styles";

const mapStateToProps = (state: RootState) => ({
  visible: state.abilitiesShopReducer.visible,
});

const mapDispatchToProps = (dispatch: Dispatch<AbilitiesShopTypes>) => ({
  setAbilitiesShopVisible: (visible: boolean) => dispatch(setAbilitiesShopVisible(visible)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

const AbilitiesShopButton = (props: Props) => {

  // $.Msg("REACT-RENDER: ButtonGroup - AbilitiesShopButton rendered");

  const { visible, setAbilitiesShopVisible } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button>
      <Image
        style={Styles.EntryHover(visible, isHovering)}
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        onactivate={() => {
          setAbilitiesShopVisible(!visible);
          Game.EmitSound("ui_topmenu_select");
        }}
        src="s2r://panorama/images/book_open_page_variant_outline_png.vtex"
      />
    </Button>
  );

};

export default React.memo(connector(AbilitiesShopButton));
