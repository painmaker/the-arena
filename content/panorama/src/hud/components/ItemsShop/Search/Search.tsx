import React, { useContext, useEffect } from "react";
import { ItemsShopContext } from "../ItemsShop";
import Styles from './styles.module.css';

const Search = () => {

  // $.Msg("REACT-RENDER: ItemsShop - Search rendered");

  const { searchValue, setSearchValue } = useContext(ItemsShopContext);

  useEffect(() => {
    return () => setSearchValue('');
  }, [setSearchValue])

  return (
    <Panel className={Styles.container}>
      <Panel className={Styles.icon} />
      <TextEntry
        id="shopSearchFieldId"
        className={Styles.searchField}
        maxchars={50}
        placeholder={'Search...'}
        text={searchValue}
        ontextentrychange={(event) => setSearchValue(event.text.toLocaleLowerCase().trim())}
      />
      <Button
        className={Styles.clearBtn}
        onactivate={() => ($("#shopSearchFieldId") as TextEntry).text = ''}
      />
    </Panel>
  );

};

export default React.memo(Search);
