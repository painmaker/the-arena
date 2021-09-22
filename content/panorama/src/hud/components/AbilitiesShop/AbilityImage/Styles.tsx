export const Styles = {

  AbilityImage: (isWashedOut: boolean): Partial<VCSSStyleDeclaration> => ({
    width: '36px',
    height: '36px',
    margin: '3px',
    washColor: isWashedOut ? 'grey' : 'none',
  }),

}