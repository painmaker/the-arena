export const Styles = {

  AbilityImage: (hasSearchedValue: boolean, isSearched: boolean, isRequiredLevel: boolean): Partial<VCSSStyleDeclaration> => ({
    width: '36px',
    height: '36px',
    margin: '3px',
    washColor: (hasSearchedValue && !isSearched) || !isRequiredLevel ? 'grey' : 'none',
    border: hasSearchedValue && isSearched ? '1px solid orange' : '0px solid black',
    padding: '1px',
  }),

}