export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: 'fit-children',
    flowChildren: 'right',
    paddingTop: '5px',
    paddingBottom: '5px',
  }),

  LeftLabel: (): Partial<VCSSStyleDeclaration> => ({
    width: "35%",
    color: "orange",
  }),

  RightLabel: (): Partial<VCSSStyleDeclaration> => ({
    width: "57%",
    fontSize: "16px",
    paddingTop: "0.5px",
    paddingLeft: "-2px",
    color: "orange",
  }),

  ToggleBtnContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "8%",
    paddingLeft: "-2px",
  }),

}