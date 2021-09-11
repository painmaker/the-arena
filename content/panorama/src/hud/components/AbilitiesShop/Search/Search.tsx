import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { ShopActionTypes } from "../../../types/shopTypes";
import { Styles } from "./Styles";

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  // setShopSearchValue: (searchValue: string) => dispatch(setShopSearchValue(searchValue)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

/**
 * TextEntry can't set text through redux-state, the value of the component doesn't update correctly
 */
const Search = (props: Props) => {

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Icon()} />
      <TextEntry
        id="abilitiesShopSearchFieldId"
        style={Styles.SearchField()}
        maxchars={50}
        placeholder={'Search...'}
        ontextentrychange={(event) => $.Msg(event)}
      />
      <Button
        onmouseout={() => setIsHovering(false)}
        onmouseover={() => setIsHovering(true)}
        style={Styles.ClearBtn(isHovering)}
        onactivate={() => ($("#abilitiesShopSearchFieldId") as TextEntry).text = ''}
      />
    </Panel>
  );

};

export default connector(Search);
