export const Styles = {

  Container: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    verticalAlign: "bottom",
    flowChildren: "right",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "15px",
  }),

  Image: (): Partial<VCSSStyleDeclaration> => ({
    width: '64px',
    height: '64px',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px 0px 0px 5px',
    backgroundColor: 'black',
  }),

  LabelContainer: (): Partial<VCSSStyleDeclaration> => ({
    width: "100%",
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '0px 5px 5px 0px',
  }),

  Label: (): Partial<VCSSStyleDeclaration> => ({
    verticalAlign: 'center',
    horizontalAlign: 'center',
  }),

}