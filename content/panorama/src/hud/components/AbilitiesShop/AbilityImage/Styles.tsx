export const Styles = {

  AbilityImage: (
    hasSearchedValue: boolean,
    isSearched: boolean,
    isRequiredLevel: boolean,
    isHovering: boolean
  ): Partial<VCSSStyleDeclaration> => ({
    width: '36px',
    height: '36px',
    margin: '3px',
    transition: 'transform 0.05s ease-in-out 0.0s',
    washColor: (hasSearchedValue && !isSearched) || !isRequiredLevel ? 'grey' : 'none',
    border: hasSearchedValue && isSearched ? '1px solid orange' : '0px solid black',
    padding: isHovering ? '0px' : '1px',
  }),

}
