import React, { Dispatch, SetStateAction, useState } from "react";
import { Styles } from "./Styles";


type Props = {
  setSearchValue: Dispatch<SetStateAction<string>>
};

/**
 * TextEntry can't set text through redux-state, the value of the component doesn't update correctly
 */
const Search = (props: Props) => {

  $.Msg("REACT-RENDER: AbilitiesShop - Search rendered");

  const { setSearchValue } = props;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Panel style={Styles.Container()}>
      <Panel style={Styles.Icon()} />
      <TextEntry
        id="abilitiesShopSearchFieldId"
        style={Styles.SearchField()}
        maxchars={50}
        placeholder={'Search...'}
        ontextentrychange={(event) => setSearchValue(event.text.toLocaleLowerCase().trim())}
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

export default React.memo(Search);
