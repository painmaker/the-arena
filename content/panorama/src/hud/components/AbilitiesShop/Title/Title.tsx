import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setAbilitiesShopVisible } from "../../../actions/abilitiesShopActions";
import { AbilitiesShopTypes } from "../../../types/abilitiesShopTypes";
import { Styles } from "./Styles";

const mapDispatchToProps = (dispatch: Dispatch<AbilitiesShopTypes>) => ({
  setAbilitiesShopVisible: (visible: boolean) => dispatch(setAbilitiesShopVisible(visible)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  entindex: EntityIndex
};

const Title = (props: Props) => {

  const { entindex } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Panel style={Styles.Container()}>
      <Label
        style={Styles.Label()}
        text={"ABILITIES SHOP - " + $.Localize(Entities.GetUnitName(entindex)).toUpperCase()}
      />
      <Button
        onmouseover={() => setIsHovering(true)}
        onmouseout={() => setIsHovering(false)}
        style={Styles.CloseBtn(isHovering)}
        onactivate={() => {
          props.setAbilitiesShopVisible(false);
          Game.EmitSound("ui_topmenu_select");
        }}
      >
        <Image src="s2r://panorama/images/close_btn_white_png.vtex" />
      </Button>
    </Panel>
  );

};

export default connector(Title);
