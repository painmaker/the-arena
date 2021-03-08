import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { setShopSearchValue } from "../../../actions/shopActions";
import { ShopActionTypes } from "../../../types/shopTypes";

const mapDispatchToProps = (dispatch: Dispatch<ShopActionTypes>) => ({
  setShopSearchValue: (searchValue: string) => dispatch(setShopSearchValue(searchValue)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  // ownProps
};

/**
 * TextEntry cannot set text through redux-state, it result in a faluty searchbar. Workaround provided. 
 */
const Search = (props: Props) => {
  return (
    <Panel className={'shopSearchContainer'}>
      <Panel className={'shopSearchIcon'} />
      <TextEntry
        id="shopSearchFieldId"
        className={'shopSearchField'}
        maxchars={50}
        placeholder={'Search...'}
        ontextentrychange={(event) => props.setShopSearchValue(event.text.toLocaleLowerCase().trim())}
      />
      <Button
        className={'shopSearchClearBtn'}
        onactivate={() => ($("#shopSearchFieldId") as TextEntry).text = ''}
      />
    </Panel>
  );
};

export default connector(Search);
